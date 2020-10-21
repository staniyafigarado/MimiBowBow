import React from 'react';
import { Text, View, Dimensions, Image, Alert, FlatList, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from '../styles/styles';
import WooCommerce from '../utils/wooApi';
import AsyncStorage from '@react-native-community/async-storage'
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
            value: 0,
        };
    }
    componentDidMount = async () => {
        const totalAmount = await AsyncStorage.getItem('totalAmount')
        const userData = (JSON.parse(await AsyncStorage.getItem('userData')));
        this.setState({
            cartAmount: totalAmount,
            isLoading: false,
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
                customer_id: userData.id,
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
                        value: "2020-09-07"
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
                    <Icon name='cart' size={40} type='material-community' color='#343434' />
                </View>
                <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
                    <Text style={[styles.TitleText, { fontFamily: 'Montserrat-SemiBold', fontSize: 20 }]}>Payment</Text>
                    <Text style={[styles.TitleText, { fontFamily: 'Montserrat-SemiBold', fontSize: 20 }]}>₹ {this.state.cartAmount} </Text>

                </View>
                <View style={[styles.textInput, { marginLeft: width * .05, height: null, padding: width * .025 }]}>
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
                </View>

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
                <View style={{ alignItems: 'center', paddingBottom: height * .025 }}>
                    <TouchableOpacity
                        onPress={() => { this.orderPlacing() }}
                        style={{ width: width * .9, marginTop: width * .05, alignItems: 'center', justifyContent: 'center', backgroundColor: '#343434', height: height * 0.08, borderRadius: 3 }}>
                        <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}