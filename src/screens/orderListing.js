import React from 'react';
import { Text, View, Dimensions, Image, BackHandler, FlatList } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from '../styles/styles';
import WooCommerce from '../utils/wooApi';
import AsyncStorage from '@react-native-community/async-storage';
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
            userid: '', dataSource: []
        };
    }
    componentDidMount = async () => {
        const userData = (JSON.parse(await AsyncStorage.getItem('userData')));
        AsyncStorage.getItem('user_id').then((value) => this.setState({ 'userid': value }))
        WooCommerce.get('orders/').then(response => {
            console.log(response.data + "123");
            this.setState({
                dataSource: response.data,
                isLoading: false,
                // userId: userData.id
            });
        }).catch(error => {
            console.log(error + "1235");
        });

    }
    render() {
        // if (this.state.isLoading) {
        //     return (
        //         <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
        //             <PacmanIndicator
        //                 count={5}
        //                 color='black'
        //                 animationDuration={600}
        //                 size={100}
        //             />
        //         </View>
        //     );
        // }

        return (
            <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
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
                {/* <View style={[styles.textInput, { marginLeft: width * .05, borderWidth: 0, marginBottom: 3, elevation: 5 }]}>
                    <SearchBar
                        //ref="searchBar"
                        placeholder="Search Here"
                    //onChangeText={...}
                    //onSearchButtonPress={...}
                    //onCancelButtonPress={...}
                    />
                </View> */}
                <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
                    <Text style={[styles.TitleText, { color: '#343434', fontSize: 20 }]}>My Orders</Text>

                </View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', marginLeft: width * .025 }}>
                        <FlatList
                            keyExtractor={(item, index) => index}
                            data={this.state.dataSource}
                            renderItem={({ item, index }) => (
                                // item.customer_id === this.state.userId ?
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderDetails', {
                                    orderId: item.id,
                                })} style={{ flexDirection: 'row', width: width * .90, height: height * .17, backgroundColor: 'white', margin: width * .025, borderRadius: 5 }}>
                                    <Image
                                        source={require('../assets/images/kitty.png')}
                                        style={{ width: height * .14, height: height * .14, margin: height * .015 }}
                                    />
                                    <View style={{ justifyContent: 'space-between', padding: 10 }}>

                                        <Text style={{ fontFamily: 'Montserrat-Regular' }}>Order date :{item.date_created}</Text>
                                        <Text style={{ fontFamily: 'Montserrat-Regular' }}>No.of Items :{(item.line_items).length}</Text>
                                        <Text style={{ fontFamily: 'Montserrat-Regular' }}>Order Id:  {item.id}</Text>
                                        <Text style={{ fontFamily: 'Montserrat-Regular', fontWeight: 'bold' }}>Total: {item.total}</Text>
                                        {/* <Text style={{ fontFamily: 'Montserrat-Regular' }}>Order date : 20/10/2020</Text>
                                            <Text style={{ fontFamily: 'Montserrat-Regular' }}>No.of Items : 1</Text>
                                            <Text style={{ fontFamily: 'Montserrat-Regular' }}>Order Id: 1001</Text>
                                            <Text style={{ fontFamily: 'Montserrat-Regular', fontWeight: 'bold' }}>Total: 1000</Text> */}
                                    </View>
                                    {/* <View style={{ justifyContent: 'space-between', padding: 10 }}>

                                            <Text style={{ fontFamily: 'Montserrat-Regular' }}>Order date :12/8/1/2020</Text>
                                            <Text style={{ fontFamily: 'Montserrat-Regular' }}>No.of Items :1</Text>
                                            <Text style={{ fontFamily: 'Montserrat-Regular' }}>Order Id:  1002</Text>
                                            <Text style={{ fontFamily: 'Montserrat-Regular', fontWeight: 'bold' }}>Total: 1000</Text>
                                        </View> */}
                                </TouchableOpacity>
                                // :
                                // null
                            )}
                        />
                    </View>

                </ScrollView>

            </View>
        );

    }
}