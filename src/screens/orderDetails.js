import React from 'react';
import { Text, View, Dimensions, Image, BackHandler, FlatList } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
//import { Rating, AirbnbRating } from 'react-native-ratings';
import { Rating, AirbnbRating } from 'react-native-elements';
import styles from '../styles/styles';
import WooCommerce from '../utils/wooApi';
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

const DataArray = require("../screens/categoryData.json");

const { width, height } = Dimensions.get('window')

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listView: 1,
            isLoading: true,
            gridView: true,
            selectedCategory: '',
            dataSource: [],
        };
    }
    componentDidMount() {
        const { navigation } = this.props;
        const oderId = navigation.getParam('orderId', 'Null');
        console.log(oderId)
        WooCommerce.get('orders/' + oderId).then(response => {
            this.setState({
                dataSource: response.data,
                isLoading: false,
            });
        }).catch(error => {
            console.log(error + "123");
        });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
                    <PacmanIndicator
                        count={5}
                        color='black'
                        animationDuration={600}
                        size={100}
                    />
                </View>
            );
        }
        else {
            return (
                <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
                    <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', margin: width * .05 }}>
                        <TouchableOpacity
                        //onPress={() => { this.props.navigation.toggleDrawer(); }}
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
                    <View style={[styles.textInput, { marginLeft: width * .05, borderWidth: 0, marginBottom: 3, elevation: 5 }]}>
                        <SearchBar
                            //ref="searchBar"
                            placeholder="Search Here"
                        //onChangeText={...}
                        //onSearchButtonPress={...}
                        //onCancelButtonPress={...}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
                        <Text style={[styles.TitleText, { color: '#343434', fontSize: 20 }]}>My Orders</Text>

                    </View>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', width: width * .90, height: height * .17, backgroundColor: 'white', marginLeft: width * .05, marginRight: width * .05, borderRadius: 5 }}>
                            <Image
                                source={require('../assets/images/kitty.png')}
                                style={{ width: height * .14, height: height * .14, margin: height * .015 }}
                            />
                            <View style={{ justifyContent: 'space-between', padding: 10 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Regular', width: width * .5 }} numberOfLines={1}>{this.state.dataSource.line_items[0].name}</Text>
                                <Text style={{ fontFamily: 'Montserrat-Regular' }}>Order date :  {this.state.dataSource.date_created}</Text>
                                <Text style={{ fontFamily: 'Montserrat-Regular' }}>Order Id:  {this.state.dataSource.id}</Text>
                                <Text style={{ fontFamily: 'Montserrat-Regular' }}>Total: {this.state.dataSource.total}</Text>
                            </View>
                        </View>
                        <View style={{ width: width * .90, margin: width * .025, marginLeft: width * .05, marginRight: width * .05 }}>
                            <Text style={{ color: '#343434', fontFamily: 'Montserrat-SemiBold' }}>Shipping and Payment details:</Text>
                        </View>
                        <View style={{ width: width * .90, height: height * .3, backgroundColor: 'white', marginLeft: width * .05, marginRight: width * .05, borderRadius: 5, padding: width * .05 }}>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>Delivered</Text>
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12 }}>Delivered on : {this.state.dataSource.date_completed}</Text>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, paddingTop: 10 }}>Payment Method</Text>
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12 }}>{this.state.dataSource.payment_method_title}</Text>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, paddingTop: 10 }}>Billing Address</Text>
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12 }}>{this.state.dataSource.billing.address_1}, {this.state.dataSource.billing.address_2}</Text>
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12 }}>{this.state.dataSource.billing.city}, {this.state.dataSource.billing.state}</Text>
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12 }}>{this.state.dataSource.billing.country}</Text>
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12 }}>{this.state.dataSource.billing.postcode}</Text>
                        </View>
                        <View style={{ width: width * .90, margin: width * .025, marginLeft: width * .05, marginRight: width * .05 }}>
                            <Text style={{ color: '#343434', fontFamily: 'Montserrat-SemiBold' }}>Write order review</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductReview', { productId: this.state.dataSource.line_items[0].product_id })} style={{ flexDirection: 'row', width: width * .90, height: height * .08, backgroundColor: 'white', margin: width * .05, marginTop: 0, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                            <Rating imageSize={25} readonly startingValue={3.5} />

                        </TouchableOpacity>

                    </ScrollView>

                </View>
            );
        }
    }
}