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
            <View style={{ flex: 1, backgroundColor: 'black', flexDirection: 'column-reverse' }}>
                <View style={{ backgroundColor: '#f5c711', height: '70%', borderTopStartRadius: 100, borderTopEndRadius: 250 }}></View>
            </View>
        );
    }
};