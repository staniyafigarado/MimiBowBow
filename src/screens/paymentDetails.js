import React from 'react';
import { Text, View, Dimensions, Image, ToastAndroid } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Badge } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from '../styles/styles';
import WooCommerce from '../utils/wooApi';
import AsyncStorage from '@react-native-community/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import RadioButton from '../sharedComponents/CustomRadioButton';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

const { width, height } = Dimensions.get('window')

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            cartAmount: 0,
            value: 0, cartCount: 0, loginData: [],
            radioItems:
                [
                    {
                        label: 'Cash On Delivery',
                        size: 20,
                        color: '#0182C3',
                        selected: true
                    },

                    {
                        label: 'Razor Pay',
                        color: '#0182C3',
                        size: 20,
                        selected: false,
                    },

                    {
                        label: 'Paypal Payment',
                        size: 20,
                        color: '#0182C3',
                        selected: false
                    },
                ], selectedItem: ''
        };
    }
    componentDidMount = async () => {
        try {
            let data = await AsyncStorage.getItem('loginDetails');
            console.log('Data 100', data);
            if (data !== null) {
                this.setState({ loginData: JSON.parse(data) });
            }
        } catch (error) {
            console.log('Something went wrong', error);
        }
        const totalAmount = await AsyncStorage.getItem('totalAmount')
        const userData = (JSON.parse(await AsyncStorage.getItem('userData')));
        this.setState({
            cartAmount: totalAmount,
            isLoading: false,
        });
        this.state.radioItems.map((item) => {
            if (item.selected == true) {
                this.setState({ selectedItem: item.label });
            }
        });
        WooCommerce.get('payment_gateways').then(response => {
            this.setState({
                paymentData: response.data,
            });
        }).catch(error => {
            console.log(error + "123");
        });
        WooCommerce.get('customers/' + (userData.id)).then(response => {
            this.setState({
                dataSource: response.data,
                isLoading: false,
            });
        }).catch(error => {
            console.log(error + "123");
        });
        const existingCart = await AsyncStorage.getItem('cart');
        this.setState({
            cartCount: JSON.parse(existingCart).length
        });
    }

    changeActiveRadioButton(index) {
        this.state.radioItems.map((item) => {
            item.selected = false;
        });

        this.state.radioItems[index].selected = true;

        this.setState({ radioItems: this.state.radioItems }, () => {
            this.setState({ selectedItem: this.state.radioItems[index].label });
        });
    }

    updateOrder = async (orderId) => {

        const existingCart = await AsyncStorage.getItem('cart')
        const existingQnty = await AsyncStorage.getItem('itemQuantity')
        const datePicked = await AsyncStorage.getItem('datePicked')
        const arrayLength = JSON.parse(existingCart).length;
        this.setState({
            cartProductData: JSON.parse(existingCart),
            cartProductQnty: JSON.parse(existingQnty),
            datePicked: JSON.parse(datePicked),
        });


        // WooCommerce.put('orders/'+orderId, {
        //     billing: {
        //         first_name: this.state.dataSource.billing.first_name,
        //         last_name: this.state.dataSource.billing.last_name,
        //         address_1: this.state.dataSource.billing.address_1,
        //         address_2: this.state.dataSource.billing.address_2,
        //         city: this.state.dataSource.billing.city,
        //         state: this.state.dataSource.billing.state,
        //         postcode: this.state.dataSource.billing.postcode,
        //         country: this.state.dataSource.billing.country,
        //         email: this.state.dataSource.billing.email,
        //         phone: this.state.dataSource.billing.phone
        //     }
        // }).then(response => {
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error+"456");
        // });

        // WooCommerce.put('orders/'+orderId, {
        //     shipping: {
        //         first_name: this.state.dataSource.shipping.first_name,
        //         last_name: this.state.dataSource.shipping.last_name,
        //         address_1: this.state.dataSource.shipping.address_1,
        //         address_2: this.state.dataSource.shipping.address_2,
        //         city: this.state.dataSource.shipping.city,
        //         state: this.state.dataSource.shipping.state,
        //         postcode: this.state.dataSource.shipping.postcode,
        //         country: this.state.dataSource.shipping.country,
        //     }
        // }).then(response => {
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error+"456");
        // });

        // for(let i=0;i<arrayLength;i++){
        //     WooCommerce.put('orders/'+orderId, {
        //         line_items: [{
        //             product_id: this.state.cartProductData[i].id,
        //             quantity: this.state.cartProductQnty[i]
        //         }]
        //     }).then(response => {
        //         console.log(response.data);
        //     }).catch(error => {
        //         console.log(error+"456");
        //     })
        // }



        for (let i = 0; i < arrayLength; i++) {
            for (let j = 0; j < 1; j++) {
                if (this.state.datePicked[i] != null) {
                    WooCommerce.put('orders/' + orderId, {
                        line_items: [{
                            meta_data: [{
                                value: "2020-09-07"
                            }]
                        }]
                    }).then(response => {
                        console.log(response.data + "222");
                    }).catch(error => {
                        console.log(error + "456");
                    })
                }

            }
            console.log("Hi")
        }
        //this.props.navigation.navigate('OrderSuccess')
    }

    // getItemDefenition=()=>{
    //     return {
    //         product_id:'',
    //         quantity:'',
    //     }
    // }
    // Add_New_View_Function = () => {
    //     this.Array_Value_Index=this.state.items.push(this.getItemDefenition());
    //     this.setState({
    //       items:  this.state.items
    //     });
    // }
    handlePayment() {
        var value = this.state.cartAmount
        value = Number(value).toFixed(2);
        console.log(value)
        this.setState({ cartAmount: value });
        var options = {
            description: 'MimiBowBow',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_mEZUIlmpj11S15',
            amount: this.state.cartAmount,
            name: 'Mimi and Bow',
            // order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
            prefill: {
                email: this.state.loginData.user_email,
                contact: '9656039412',
                name: this.state.loginData.user_display_name
            },
            theme: { color: '#f5c711' }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            // alert(`Success: ${data.razorpay_payment_id}`);
            console.log(data)
            this.props.navigation.navigate("OrderSuccess")
        }).catch((error) => {
            // handle failure
            console.log(error)
            // alert(`Error: ${error.code} | ${error.description}`);
            ToastAndroid.show("Payment Cancelled", ToastAndroid.SHORT);
        });
    }

    orderPlacing = async () => {
        console.log("Hi")
        const couponAmount = await AsyncStorage.getItem('couponAmount')
        const existingCart = await AsyncStorage.getItem('cart')
        const existingQnty = await AsyncStorage.getItem('itemQuantity')
        const datePicked = await AsyncStorage.getItem('datePicked')
        const userData = (JSON.parse(await AsyncStorage.getItem('userData')));
        const arrayLength = JSON.parse(existingCart).length;
        this.setState({
            cartProductData: JSON.parse(existingCart),
            cartProductQnty: JSON.parse(existingQnty),
            datePicked: JSON.parse(datePicked),
        });
        for (let i = 0; i < arrayLength; i++) {
            WooCommerce.post('orders', {
                customer_id: this.state.loginData.user_id,
                payment_method: "cod",
                payment_method_title: "Cash on delivery",
                set_paid: true,
                discount_total: couponAmount,
                billing: {
                    first_name: this.state.dataSource.billing.first_name,
                    last_name: this.state.dataSource.billing.last_name,
                    address_1: this.state.dataSource.billing.address_1,
                    address_2: this.state.dataSource.billing.address_2,
                    city: this.state.dataSource.billing.city,
                    state: this.state.dataSource.billing.state,
                    postcode: this.state.dataSource.billing.postcode,
                    country: this.state.dataSource.billing.country,
                    email: this.state.dataSource.billing.email,
                    phone: this.state.dataSource.billing.phone
                },
                shipping: {
                    first_name: this.state.dataSource.shipping.first_name,
                    last_name: this.state.dataSource.shipping.last_name,
                    address_1: this.state.dataSource.shipping.address_1,
                    address_2: this.state.dataSource.shipping.address_2,
                    city: this.state.dataSource.shipping.city,
                    state: this.state.dataSource.shipping.state,
                    postcode: this.state.dataSource.shipping.postcode,
                    country: this.state.dataSource.shipping.country,
                },
                line_items: [{
                    product_id: this.state.cartProductData[i].id,
                    quantity: this.state.cartProductQnty[i],
                    meta_data: [{
                        value: "2021-09-07"
                    }]
                }]
            }).then(response => {
                console.log(response.data.id);
                this.updateOrder(response.data.id);
            }).catch(error => {
                console.log(error + "1");
            });
            this.props.navigation.navigate('OrderSuccess')
            //this.updateOrder(10841);
            console.log("MMMMMM")
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
                <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', margin: width * .05 }}>

                    <Icon name='menu' size={40} type='material-icons' color='#343434' />
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={{ width: height * .07, height: height * .07 }}
                    />
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17 }}>
                        Mimi and Bow Bow
					</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')}>
                        <Icon name='cart' size={40} type='material-community' color='#343434' />
                        {this.state.cartCount != 0 ?
                            /* {this.state.cartCount = 0 ? */
                            <Badge value={this.state.cartCount} status="error" containerStyle={{ position: 'absolute', top: -1, right: -1 }} />
                            : null
                        }
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: '#FFF', height: height * 1 }}>
                        <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', backgroundColor: '#FFF' }}>
                            <Text style={[styles.TitleText, { fontFamily: 'Montserrat-SemiBold', fontSize: 20, marginLeft: 10 }]}>Payment</Text>
                            <Text style={[styles.TitleText, { fontFamily: 'Montserrat-SemiBold', fontSize: 20 }]}>₹ {this.state.cartAmount} </Text>

                        </View>
                        <View style={{ width: width * 1 }}>
                            {
                                this.state.radioItems.map((item, key) =>
                                (
                                    <RadioButton key={key} button={item} onClick={this.changeActiveRadioButton.bind(this, key)} />
                                ))
                            }
                            <View>
                                {/* <Text style={styles.selectedText}>Selected Item: {this.state.selectedItem}</Text> */}
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', paddingBottom: height * .025, marginBottom: 50, backgroundColor: '#FFF' }}>
                            {
                                this.state.selectedItem == 'Razor Pay' ? (
                                    <TouchableOpacity
                                        onPress={() => { this.handlePayment() }}
                                        style={{ width: width * .9, marginTop: width * .05, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDC500', height: height * 0.08, borderRadius: 3, elevation: 3 }}>
                                        <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]}>CONTINUE</Text>
                                    </TouchableOpacity>
                                ) : null
                            }

                        </View>
                    </View>
                    {/* <View style={[styles.textInput, { height: null, padding: width * .025, width: '100%' }]}>
                        <RadioButton.Group onValueChange={value => this.setState({ value: this.state.value })}>
                            <FlatList
                                keyExtractor={(item, index) => index}
                                data={this.state.paymentData}
                                renderItem={({ item, index }) => (

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioButton value={index} />
                                        <Text style={[styles.textinputText, { fontSize: 15 }]}>{item.title}</Text>

                                    </View>


                                )}
                            />
                        </RadioButton.Group>
                    </View> */}
                    {/* <View style={{ height: '100%', flex: 1 }}>
                        <View style={{ alignItems: 'center', paddingBottom: height * .025, marginBottom: 50, backgroundColor: '#FFF' }}>
                            <TouchableOpacity
                                onPress={() => { this.handlePayment() }}
                                style={{ width: width * .9, marginTop: width * .05, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDC500', height: height * 0.08, borderRadius: 3, elevation: 3 }}>
                                <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]}>CONTINUE</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}

                    {/* <RadioButton.Group onValueChange={value => this.setState({value: this.state.value})}>
                    <View>
                        <Text>First</Text>
                        <RadioButton value="0" />
                    </View>
                    <View>
                        <Text>Second</Text>
                        <RadioButton value="0" />
                    </View>
                </RadioButton.Group> */}

                </ScrollView>
            </View>

        );
    }
}