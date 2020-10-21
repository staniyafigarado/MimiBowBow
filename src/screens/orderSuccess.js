import React from 'react';
import { Text, View, Dimensions, ImageBackground } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StackActions, NavigationActions } from 'react-navigation';
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

    goToHome = async () => {
        await AsyncStorage.removeItem('cart');
        await AsyncStorage.removeItem('itemQuantity');
        await AsyncStorage.removeItem('cartItemPrice');
        await AsyncStorage.removeItem('totalAmount');
        await AsyncStorage.removeItem('couponAmount');
        await AsyncStorage.removeItem('datePicked');
        try {
            // this.props.navigation.push('Home')
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            this.props.navigation.dispatch(resetAction);
        } catch (error) {
            // Error saving data
        }

    }

    render() {
        return (
            <ImageBackground source={require('../assets/images/orderPlaced.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}>

                <View style={{ flex: 1, justifyContent: 'flex-end', width: width, height: height }}>

                    <View style={{ alignItems: 'center', paddingBottom: height * .025 }}>
                        <TouchableOpacity
                            onPress={() => { this.goToHome() }}
                            style={{ width: width * .9, marginTop: width * .05, alignItems: 'center', justifyContent: 'center', backgroundColor: '#343434', height: height * 0.08, borderRadius: 3 }}>
                            <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]}>GO TO HOMESCREEN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}