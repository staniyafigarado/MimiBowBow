import React from 'react';
import { StatusBar, Text, View, Dimensions, Image, FlatList, ImageBackground } from 'react-native';
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
const success = require('../assets/images/upgrade.png');
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
            <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
                <StatusBar barStyle="dark-content" hidden={true} backgroundColor="rgba(255,255,255,1)" translucent={true} />
                <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', margin: width * .05 }}>
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
                        {/* {this.state.cartCount != 0 ?
                            <Badge value={this.state.cartCount} status="error" containerStyle={{ position: 'absolute', top: -1, right: -1 }} />
                            : null
                        } */}

                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#FFF', width: '100%', height: '100%' }}>
                    <View style={{ height: height * .09, marginLeft: width * .05, marginRight: width * .05, marginTop: 10 }}>
                        <Text style={[styles.TitleText, { color: '#343434', fontSize: 20, textAlign: 'center' }]}>Upgraded Successfully</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={success} style={{ width: width * 1, height: height * 0.5 }}></Image>
                        <View style={{ alignItems: 'center', paddingBottom: height * .025 }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Home')}
                                style={{ width: width * .9, marginTop: width * .2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDC500', height: height * 0.08, borderRadius: 3, elevation: 3 }}>
                                <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]}>GO TO HOMESCREEN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}