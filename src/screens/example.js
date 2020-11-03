import React, { Component } from 'react';
import { View, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-community/async-storage'
import styles from '../styles/styles';
import WooCommerce from '../utils/wooApi';
import { TextInput } from 'react-native-paper';
const { width, height } = Dimensions.get('window');
export default class BiddingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: 1,
            isLoading: true,
            gridView: true,
            productData: [],
            cartData: [],
            btnValue: 1,
            isVisible: false,
        };
    }
    componentDidMount = async () => {
        const { navigation } = this.props;
        const petData = navigation.getParam('petData', 'Null');


        WooCommerce.get('products').then(response => {
            this.setState({
                productData: petData,
                isLoading: false,
            });
        }).catch(error => {
            console.log(error + "123");
        });
    }
    addToCart = async (item) => {
        const existingCart = await AsyncStorage.getItem('cart')
        //console.log(item)
        this.setState({
            //cartData : [...this.state.cartData, item],
            btnValue: 2,
            isVisible: true
        });
        let newProduct = JSON.parse(existingCart);
        if (!newProduct) {
            newProduct = []
        }
        newProduct.push(item);
        await AsyncStorage.setItem('cart', JSON.stringify(newProduct))
            .then(() => {
                console.log('It was saved successfully')
            })
            .catch(() => {
                console.log('There was an error saving the product')
            })
        //   try {
        //     await AsyncStorage.clear()
        //     console.log('Storage successfully cleared!')
        //   } catch (e) {
        //     console.log('Failed to clear the async storage.')
        //   }
        const datePicked = await AsyncStorage.getItem('datePicked')
        let newDate = JSON.parse(datePicked);
        if (!newDate) {
            newDate = []
        }
        newDate.push(null);
        await AsyncStorage.setItem('datePicked', JSON.stringify(newDate))
            .then(() => {
                console.log('It was saved successfully')
            })
            .catch(() => {
                console.log('There was an error saving the product')
            })


    }
    goToCart = async () => {
        const existingProducts = await AsyncStorage.getItem('cart')
        let newProduct = JSON.parse(existingProducts);
        console.log("newProduct")
        console.log(newProduct)

    }
    modalClose = () => {
        console.log("Hi")
        this.setState({
            isVisible: false
        });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
                {/* header component */}
                <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', margin: width * .05 }}>
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')}>
                        <Icon name='cart' size={40} type='material-community' color='#343434' />
                    </TouchableOpacity>
                </View>
                <View style={{ height: height * .5, width: '93%', backgroundColor: '#FFF', alignSelf: 'center', borderRadius: 10, padding: width * .03 }}>
                    <View style={{ height: height * .25, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: this.state.productData.images[0] ? this.state.productData.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
                            style={{ width: width * .33, height: height * .2, backgroundColor: 'red' }}></Image>
                        <View style={{ flexDirection: 'column', padding: 10 }}>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>Name</Text>
                            <View style={{ flexDirection: 'row', marginTop: height * .01 }}>
                                <Rating
                                    type='custom'
                                    ratingColor='#f5c711'
                                    ratingBackgroundColor='white'
                                    ratingCount={5}
                                    imageSize={14.5}
                                    style={{ paddingVertical: 0 }}
                                />
                                <Text style={[styles.TitleText, { color: '#343434', fontSize: 12, marginLeft: width * .02 }]}>4.5/5 rating</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: height * .01 }}>
                                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, width: width * 0.24 }}>Starting Bid</Text>
                                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, color: '#00AE51' }}>5000</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: height * .01 }}>
                                <View style={{
                                    borderColor: '#707070', borderWidth: 1, width: width * .23,
                                    borderRadius: 10, height: height * .05, flexDirection: 'row', alignItems: 'center', padding: 5, justifyContent: 'center'
                                }}>
                                    <Text style={{ color: '#00AE51', fontFamily: 'Montserrat-Regular', fontSize: 14 }}>₹</Text>
                                    <TextInput
                                        // underlineColorAndroid='rgba(0,0,0,0)'
                                        underlineColor={'#FFF'}
                                        style={{ height: height * .02, marginLeft: 5, backgroundColor: '#FFF' }}></TextInput>
                                </View>
                                <TouchableOpacity style={{
                                    width: width * .23, marginLeft: width * .03,
                                    borderRadius: 10, height: height * .05, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDC500'
                                }}>
                                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 12, color: '#FFF' }} >Place Bid</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 10, color: '#343434', marginTop: height * .01 }}>Enter more than or equal to 15000</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
};