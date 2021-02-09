import React, { Component } from 'react';
import { StatusBar, Text, View, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import { Icon, SearchBar, Badge } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
import styles from '../styles/styles';
import AsyncStorage from '@react-native-community/async-storage';
// import PayPal from 'react-native-paypal-wrapper';
// import RNPaypal from 'react-native-paypal-lib';
const icon1 = require('../assets/icons/upgrade1.png');
const icon2 = require('../assets/icons/upgrade2.png');
const icon3 = require('../assets/icons/upgrade3.png');
import WooCommerce from '../utils/wooApi';
const data = [
    {
        id: '1',
        title: 'Customer Prime Membership',
        subTitle: 'For 1 Year',
        price: 1000,
    },
    {
        id: '2',
        title: 'Wholesale Customer Prime Membership',
        subTitle: 'For 1 Year',
        price: 2000,

    },
];
export default class JustifyContentBasics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: '', cartCount: 0
        };
    }
    async componentDidMount() {
        try {
            let data = await AsyncStorage.getItem('loginDetails');
            console.log('Data 100', data);
            if (data !== null) {
                this.setState({ loginData: JSON.parse(data) });
                // this.props.setLoginData(data);
            }
        } catch (error) {
            console.log('Something went wrong', error);
        }
        const existingCart = await AsyncStorage.getItem('cart');
        this.setState({
            cartCount: JSON.parse(existingCart).length
        });
    }
    async _onPress(item) {
        // this.props.navigation.navigate('MemebershipAccountPayment', {
        //     Title: item.title,
        //     Price: item.price
        // });

        // PayPal.initialize(PayPal.NO_NETWORK, "AQm35MNs5ngY3HyR16bzt_Mhg9W-lks1tVQoJ9Abt5H9Ik0IN1k2ya4-PGJwy5antmIMrhVIHtcFI-Pj");
        // PayPal.pay({
        //     price: '40.70',
        //     currency: 'MYR',
        //     description: 'Your description goes here',
        // }).then(confirm => console.log(confirm))
        //     .catch(error => console.log(error));

        // RNPaypal.paymentRequest({
        //     clientId: 'AQm35MNs5ngY3HyR16bzt_Mhg9W-lks1tVQoJ9Abt5H9Ik0IN1k2ya4-PGJwy5antmIMrhVIHtcFI-Pj',
        //     environment: RNPaypal.ENVIRONMENT.NO_NETWORK,
        //     intent: RNPaypal.INTENT.SALE,
        //     price: 60,
        //     currency: 'USD',
        //     description: `Android testing`,
        //     acceptCreditCards: true
        // }).then(response => {
        //     console.log(response)
        // }).catch(err => {
        //     console.log(err.message)
        // })

        const data = {
            enabled: true
        };

        WooCommerce.put("payment_gateways/paypal", data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
                <StatusBar barStyle="dark-content" hidden={true} backgroundColor="rgba(255,255,255,1)" translucent={true} />
                <View style={{ flexDirection: 'row', height: height * .08, alignItems: 'center', justifyContent: 'space-between', margin: width * .05 }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.toggleDrawer(); }}>
                        <Icon name='menu' size={40} type='material-icons' color='#343434' />
                    </TouchableOpacity>
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
                <View style={{ height: height * .04, marginLeft: width * .05, marginRight: width * .05 }}>
                    <Text style={[styles.TitleText, { color: '#343434', fontSize: 20 }]}>Membership Upgrade</Text>
                </View>
                <View>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <View style={{
                                borderColor: '#FFFFFF', borderRadius: 10, borderWidth: 6, height: height * 0.22,
                                marginHorizontal: width * 0.05, flexDirection: 'column', marginTop: height * 0.02
                            }}>
                                <View style={{ height: '100%', flexDirection: 'row', padding: height * 0.02 }}>
                                    <View style={{ flexDirection: 'column', width: '100%', justifyContent: 'space-evenly' }}>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, color: '#FFFFFF' }}>{item.title}</Text>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, color: '#FFFFFF' }}>{item.subTitle}</Text>
                                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 22, color: '#343434' }}>Rs {item.price}</Text>
                                        <View style={{ backgroundColor: '#FFFFFF', height: height * 0.06, width: '100%', justifyContent: 'center', borderRadius: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => this._onPress(item)}
                                                style={{ padding: height * 0.02, }}>
                                                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16, color: '#FDC500', textAlign: 'center' }}>Pay Now</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        )}
                        keyExtractor={item => item.id}
                    // extraData={selected}
                    />
                </View>

            </View>
        );
    }
};