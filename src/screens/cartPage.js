import React from 'react';
import { Text, View, Dimensions, Image, Alert, FlatList, TextInput } from 'react-native';
import SearchBar from 'react-native-search-bar';
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
            listView: 1,
            isLoading: true,
            gridView: true,
            productData: [],
            cartData: [],
            btnValue: 1,
            qnty: [],
            priceArray: [],
            totalAmount: 0,
            dummySum: 0,
            couponCode: '',
            couponAmount: 0,
            couponLimit: 0,
            dateIndex: 0, dataSource: [], loginData: '', productId: [], id: ''
        };
    }
    // async componentDidMount() {
    //     try {
    //         let data = await AsyncStorage.getItem('loginDetails');
    //         console.log('Data 100', data);
    //         if (data !== null) {
    //             this.setState({
    //                 loginData: JSON.parse(data),

    //             });
    //         }
    //     } catch (error) {
    //         console.log('Something went wrong', error);
    //     }
    //     this.cartItems();

    //     const existingCart = await AsyncStorage.getItem('cart')
    //     const datePicked = await AsyncStorage.getItem('datePicked')

    //     const arrayLength = JSON.parse(existingCart).length;
    //     const dateAryLength = JSON.parse(datePicked).length;
    //     const dummyQnty = this.state.qnty
    //     const dummyPrice = this.state.priceArray
    //     this.setState({
    //         isLoading: false,
    //         productData: JSON.parse(existingCart),
    //         datePicked: JSON.parse(datePicked),
    //         dateAryLength: dateAryLength,

    //     });
    //     console.log(this.state.dateAryLength)
    //     console.log(datePicked)
    //     for (let i = 0; i < arrayLength; i++) {
    //         dummyQnty[i] = 1,
    //             dummyPrice[i] = this.state.productData[i].price
    //         this.setState({
    //             totalAmount: this.state.totalAmount + Number(this.state.priceArray[i])
    //         });
    //     }
    //     this.setState({
    //         isLoading: false,
    //         qnty: dummyQnty,
    //         priceArray: dummyPrice,
    //         totalAmount: this.state.totalAmount
    //     });
    //     WooCommerce.get('coupons').then(response => {
    //         console.log(response + "123");
    //         this.setState({
    //             couponsData: response.data,
    //             isLoading: false,
    //         });
    //     }).catch(error => {
    //         console.log(error + "123");
    //     });
    // }

    async componentDidMount() {
        try {
            let data = await AsyncStorage.getItem('loginDetails');
            console.log('Data 100', data);
            if (data !== null) {
                this.setState({ loginData: JSON.parse(data) });
            }
        } catch (error) {
            console.log('Something went wrong', error);
        }
        this.cartItems();
        const existingCart = await AsyncStorage.getItem('cart')
        const datePicked = await AsyncStorage.getItem('datePicked')

        const arrayLength = JSON.parse(existingCart).length;
        const dateAryLength = JSON.parse(datePicked).length;
        const dummyQnty = this.state.qnty
        const dummyPrice = this.state.priceArray
        this.setState({
            isLoading: false,
            productData: JSON.parse(existingCart),
            datePicked: JSON.parse(datePicked),
            dateAryLength: dateAryLength,

        });
        console.log(this.state.dateAryLength)
        console.log(datePicked)
        for (let i = 0; i < arrayLength; i++) {
            dummyQnty[i] = 1,
                dummyPrice[i] = this.state.productData[i].price
            this.setState({
                totalAmount: this.state.totalAmount + Number(this.state.priceArray[i])
            });
        }
        this.setState({
            isLoading: false,
            qnty: dummyQnty,
            priceArray: dummyPrice,
            totalAmount: this.state.totalAmount
        });
        WooCommerce.get('coupons').then(response => {
            console.log(response + "123");
            this.setState({
                couponsData: response.data,
                isLoading: false,
            });
        }).catch(error => {
            console.log(error + "123");
        });
    }

    cartItems() {

        return fetch('https://mimiandbowbow.com/alpha/wp-json/cocart/v1/get-cart/customer/' + this.state.loginData.user_id + '?consumer_key=ck_3dc8e609d9bf166cc09293bf3ebdb6a0c19bb46d&consumer_secret=cs_18122b00e28ea61f7560e0d0e16ad4075aa8f326')
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json));

                var data = json.map(function (item) {
                    return {
                        id: item.product_id,
                    };
                });

                this.setState({
                    dataSource: json,
                    isLoading: false,
                    productId: data
                });
                console.log(this.state.productId);
            })
            .catch((error) => {
                console.error(error);
            });
        // var myHeaders = new Headers();
        // myHeaders.append("X-Shopify-Storefont-Access-Token", "18e4894f164b996610cbcb4f8690b6be");
        // myHeaders.append("Accept", "application/json");
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Cookie", "wp_cocart_session_6892ecc2a5f867b016ba3227fad9a964=1%7C%7C1611557790%7C%7C1611471390%7C%7C11b94ccc8d26e63eea5f120c1d7ff2fc; woocommerce_items_in_cart=1; woocommerce_cart_hash=8af003f63cc2c00faddaffbb5ad08a1f; swpm_session=a64e6a0961a7d1cc70571b5dafbdcf90");

        // var graphql = JSON.stringify({
        //     query: "query {\r\n  node(id:\"Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU1NjExODEzNzI1ODE=\") {\r\n    ...on Product {\r\n    collections(first:20){\r\n  		edges{\r\n        node{\r\n          products(first:20){\r\n            edges{\r\n              node{\r\n                title\r\n                onlineStoreUrl\r\n                images(first:1) {\r\n                  edges {\r\n                    node {\r\n                      originalSrc\r\n                    }\r\n                  }\r\n                }\r\n              }\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n    }\r\n  }\r\n}",
        //     variables: {}
        // })
        // var requestOptions = {
        //     method: 'GET',
        //     headers: myHeaders,
        //     body: graphql,
        //     redirect: 'follow'
        // };

        // fetch("https://mimiandbowbow.com/alpha/wp-json/cocart/v1/get-cart/customer/168?oauth_consumer_key=ck_3dc8e609d9bf166cc09293bf3ebdb6a0c19bb46d&oauth_signature_method=HMAC-SHA1", requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
    }

    cartSave = async () => {
        console.log(this.state.productData)
        console.log(this.state.priceArray)
        console.log(this.state.totalAmount)
        console.log(this.state.couponAmount)
        await AsyncStorage.setItem('cart', JSON.stringify(this.state.productData))
        await AsyncStorage.setItem('itemQuantity', JSON.stringify(this.state.qnty))
        await AsyncStorage.setItem('cartItemPrice', JSON.stringify(this.state.priceArray))
        await AsyncStorage.setItem('totalAmount', JSON.stringify(this.state.totalAmount))
        await AsyncStorage.setItem('couponAmount', JSON.stringify(this.state.couponAmount))
        await AsyncStorage.setItem('datePicked', JSON.stringify(this.state.datePicked))


    }
    goToCart = async () => {
        const existingProducts = await AsyncStorage.getItem('cart')
        let newProduct = JSON.parse(existingProducts);
        console.log("newProduct")
        console.log(newProduct)

    }
    removeCoupen = () => {
        this.setState({
            totalAmount: this.state.totalAmount + Number(this.state.couponAmount),
            couponLimit: 0,
            couponAmount: 0
        });
    }
    applyCoupen = (value) => {
        this.setState({

            couponLimit: this.state.couponLimit + 1
        });

        if (this.state.couponLimit < 1) {
            for (let i = 0; i < this.state.couponsData.length; i++) {
                if (value === this.state.couponsData[i].code && this.state.totalAmount > this.state.couponsData[i].amount) {
                    this.setState({
                        couponAmount: this.state.couponsData[i].amount,
                        totalAmount: this.state.totalAmount - this.state.couponsData[i].amount
                    });

                }
            }
        }



    }

    deleteFromCart = async (value) => {

        console.log(value)
        var array = [...this.state.productData];
        array.splice(value, 1);
        var dateAry = [...this.state.datePicked];
        dateAry.splice(value, 1);
        var priceAry = [...this.state.priceArray];
        var aryPrice = priceAry[value]

        priceAry.splice(value, 1);
        this.setState({
            productData: array,
            datePicked: dateAry,
            priceArray: priceAry,
            totalAmount: this.state.totalAmount - aryPrice,
            couponCode: '',
            couponLimit: 0
        });
        console.log(this.state.productData)
        await AsyncStorage.setItem('cart', JSON.stringify(array))
        await AsyncStorage.setItem('datePicked', JSON.stringify(dateAry))
            .then(() => {
                console.log('It was saved successfully')
            })
            .catch(() => {
                console.log('There was an error saving the product')
            })
    }
    QuantityChange = (value, index) => {

        const dummyQnty = this.state.qnty
        const dummyPrice = this.state.priceArray
        if (value === "add") {
            dummyQnty[index] = dummyQnty[index] + 1
            dummyPrice[index] = this.state.productData[index].price * dummyQnty[index]
            this.setState({
                qnty: dummyQnty,
                priceArray: dummyPrice,
                totalAmount: this.state.totalAmount + Number(this.state.productData[index].price),
                couponCode: '',
                couponLimit: 0
            });
        }
        else if (value === "sub" && dummyQnty[index] > 1) {
            dummyQnty[index] = dummyQnty[index] - 1
            dummyPrice[index] = dummyPrice[index] - this.state.productData[index].price
            this.setState({
                qnty: dummyQnty,
                priceArray: dummyPrice,
                totalAmount: this.state.totalAmount - Number(this.state.productData[index].price),
                couponCode: '',
                couponLimit: 0
            });
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                    <PacmanIndicator
                        count={5}
                        color='black'
                        animationDuration={600}
                        size={100}
                    />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <View style={{ flexDirection: 'row', height: height * .15, alignItems: 'center', justifyContent: 'space-between', padding: width * .05, width: '100%', backgroundColor: '#f5c711' }}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.toggleDrawer(); }}
                    >
                        <Icon name='menu' size={40} type='material-icons' color='#343434' />
                    </TouchableOpacity>
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
                    <Text style={[styles.TitleText, { fontFamily: 'Montserrat-SemiBold', fontSize: 20 }]}>My Cart</Text>

                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: height * .1 }}>
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={this.state.productData}
                        renderItem={({ item, index }) => (
                            item != null ?
                                item.categories[0].name != "Doctors" ?
                                    <View style={{ width: width * .95, height: height * .2, backgroundColor: 'white', margin: width * .025, borderRadius: 5 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image
                                                source={{ uri: item.images[0] ? item.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
                                                style={{ width: height * .12, height: height * .12, margin: height * .015, }}
                                            />
                                            <View style={{ padding: height * .015 }}>
                                                <Text style={{ fontFamily: 'Montserrat-Regular', width: width * .5, paddingBottom: height * .015 }} numberOfLines={1}>{item.name}</Text>
                                                <Text style={{ fontFamily: 'Montserrat-Regular', color: '#00AE51', paddingBottom: height * .015, fontSize: 13 }}>{item.stock_status.toUpperCase()}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontFamily: 'Montserrat-Regular', paddingBottom: height * .015 }}>Quantity      </Text>
                                                    <TouchableOpacity onPress={() => { this.QuantityChange("sub", index) }}>
                                                        <Text style={{ fontFamily: 'Montserrat-Bold', paddingBottom: height * .015 }}>-    </Text>
                                                    </TouchableOpacity>
                                                    <Text style={{ fontFamily: 'Montserrat-Bold', paddingBottom: height * .015, fontSize: 12 }}>{this.state.qnty[index]}      </Text>
                                                    <TouchableOpacity onPress={() => { this.QuantityChange("add", index) }}>
                                                        <Text style={{ fontFamily: 'Montserrat-Bold', paddingBottom: height * .015 }}>+    </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => { this.deleteFromCart(index); }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopColor: '#343434', borderTopWidth: .5 }}>
                                            <Icon name='delete' size={25} type='material-community' color='#343434' paddingBottom={height * .015} />
                                            <Text style={{ fontFamily: 'Montserrat-Regular', paddingBottom: height * .015 }}>
                                                Remove item from cart
                                    </Text>
                                        </TouchableOpacity>
                                    </View>
                                    :

                                    <View style={{ width: width * .95, height: height * .2, backgroundColor: 'white', margin: width * .025, borderRadius: 5 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image
                                                source={{ uri: item.images[0] ? item.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
                                                style={{ width: height * .12, height: height * .12, margin: height * .015, }}
                                            />
                                            <View style={{ padding: height * .015 }}>
                                                <Text style={{ fontFamily: 'Montserrat-Regular', width: width * .5, paddingBottom: height * .015 }} numberOfLines={1}>{item.name}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontFamily: 'Montserrat-Regular', paddingBottom: height * .015 }}>Date     </Text>

                                                    <Text style={{ fontFamily: 'Montserrat-Bold', paddingBottom: height * .015, fontSize: 12 }}>:   {this.state.datePicked[index]}      </Text>

                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => { this.deleteFromCart(index); }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopColor: '#343434', borderTopWidth: .5 }}>
                                            <Icon name='delete' size={25} type='material-community' color='#343434' paddingBottom={height * .015} />
                                            <Text style={{ fontFamily: 'Montserrat-Regular', paddingBottom: height * .015 }}>
                                                Remove item from cart
                                    </Text>
                                        </TouchableOpacity>
                                    </View>

                                : <View><Text>Nothing To Show</Text></View>
                        )}
                    />
                    <View style={{ flexDirection: 'row', height: height * .07, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
                        <Text style={[styles.TitleText, { fontFamily: 'Montserrat-SemiBold', fontSize: 15 }]}>Price details</Text>
                    </View>
                    {this.state.productData != null ?
                        <View style={{ width: width * .95, backgroundColor: 'white', margin: width * .025, borderRadius: 5, padding: width * .05 }}>
                            <FlatList
                                keyExtractor={(item, index) => index}
                                data={this.state.productData}
                                renderItem={({ item, index }) => (
                                    item != null ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontFamily: 'Montserrat-Regular', width: width * .5, paddingBottom: height * .015 }} numberOfLines={1}>{item.name}</Text>
                                            <Text style={{ fontFamily: 'Montserrat-Regular', paddingBottom: height * .015 }}>
                                                ₹{this.state.priceArray[index]}
                                            </Text>

                                        </View>

                                        : <View><Text>Nothing To Show</Text></View>
                                )}
                            />
                            {this.state.couponAmount > 0 && this.state.productData != null ?
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: 'Montserrat-Regular', width: width * .5, paddingBottom: height * .015 }} numberOfLines={1}>Coupon Applied</Text>
                                    <Text style={{ fontFamily: 'Montserrat-Regular', paddingBottom: height * .015 }}>
                                        -₹{Number(this.state.couponAmount)}
                                    </Text>

                                </View>
                                : null}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: height * .015, borderTopWidth: 1 }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular' }}>
                                    Total Amount
                                </Text>
                                <Text style={{ fontFamily: 'Montserrat-Regular' }}>
                                    ₹{this.state.totalAmount}
                                </Text>

                            </View>

                        </View>
                        : null
                    }
                    <View style={{ margin: width * .035 }}>
                        <Text style={{ fontFamily: 'Montserrat-Regular', width: width * .5, paddingBottom: height * .015 }} numberOfLines={1}>Have a coupon? Drop your code below</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={[styles.textInput, { alignItems: 'center', width: width * .95, flexDirection: 'row' }]}>
                            <TextInput style={{ fontFamily: 'Montserrat-Regular', width: width * .5, paddingBottom: height * .015 }}
                                placeholder="Enter Your Coupon Code"
                                returnKeyType={"next"}
                                onChangeText={couponCode => this.setState({ couponCode })}
                            />
                            <TouchableOpacity onPress={() => { this.applyCoupen(this.state.couponCode); }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopColor: '#343434' }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular', color: '#00AE51' }}>
                                    Apply
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.removeCoupen(); }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopColor: '#343434', marginLeft: 10 }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular', color: '#FF0000' }}>
                                    Remove
                                    </Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.productData.length != 0 ?
                            <TouchableOpacity onPress={() => { this.cartSave(); this.props.navigation.navigate('CartBillingAddress') }} style={{ width: width * .95, marginBottom: height * .02, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5c711', height: height * 0.08, borderRadius: 3, elevation: 3 }}>
                                <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]}>PLACE ORDER</Text>
                            </TouchableOpacity>
                            :
                            null
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}