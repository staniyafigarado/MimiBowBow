import React from 'react';
import { Text, View, Dimensions, Image, BackHandler, FlatList } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Badge } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-community/async-storage'
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

const { width, height } = Dimensions.get('window');
const data = [
    {
        id: '1',
        title: 'John Doe',
        "image": "http://mimiandbowbow.com/alpha/wp-content/uploads/2019/03/S5-1.jpg",
        price: 1000,
        specialization: 'Veterinarian Doctor'
    },
    {
        id: '2',
        title: 'Charlotte ',
        image: 'https://mimiandbowbow.com/alpha/wp-content/uploads/2019/03/S4-1.jpg',
        price: 2000,
        specialization: 'Veterinarian Doctor'
    },
    {
        id: '3',
        title: 'John Doe',
        image: "http://mimiandbowbow.com/alpha/wp-content/uploads/2019/03/S5-1.jpg",
        price: 1000,
        specialization: 'Veterinarian Doctor'
    },
    {
        id: '4',
        title: 'Charlotte ',
        image: 'https://mimiandbowbow.com/alpha/wp-content/uploads/2019/03/S4-1.jpg',
        price: 2000,
        specialization: 'Veterinarian Doctor'
    },
];
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listView: 1,
            isLoading: true,
            gridView: true,
            selectedCategory: '',
            isSelected: true, cartCount: 0
        };
        this.arrayholder = []
    }
    componentDidMount = async () => {

        WooCommerce.get('products?category=192&per_page=100', { per_page: 100 }).then(response => {
            console.log(response.data + "123");
            this.setState({
                dataSource: response.data,
                isLoading: false,
            });
            this.arrayholder = response.data;
        }).catch(error => {
            console.log(error + "123");
        });
        console.log(this.state.dataSource + "Hi")
        const existingCart = await AsyncStorage.getItem('cart');
        this.setState({
            cartCount: JSON.parse(existingCart).length
        });
    }
    categoryChange = (value) => {
        this.setState({
            selectedCategory: value
        })
    }
    updateTitleStatus = () =>
        this.setState({
        }, () => {
            //this.ButtonState();
            if (this.state.isSelected == true) {
                this.setState({
                    isSelected: false
                });
            } else {
                this.setState({
                    isSelected: true
                });
            }
        });

    // List View
    renderItemList = ({ item }) => {
        return <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DoctorDetails', { petData: item })}
            style={{ height: height * .25, padding: width * .025, backgroundColor: 'rgba(255,255,255,1)', borderTopWidth: 2, borderTopColor: '#f5c711', flexDirection: 'row' }}>
            <Image
                source={{ uri: item.images[0] ? item.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
                style={{ width: height * .17, height: height * .17 }}
            />
            <View style={{ margin: width * .02 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Rating
                        type='custom'
                        ratingColor='#f5c711'
                        ratingBackgroundColor='white'
                        ratingCount={5}
                        imageSize={20}
                        style={{ paddingVertical: 0 }}
                    />
                    <Text style={[styles.TitleText, { color: '#343434', fontSize: 12 }]}>4.5/5 rating</Text>
                    <Icon name='arrow-right' size={20} type='material-community' color='#343434' />
                </View>
                <Text style={[styles.TitleText, { color: '#343434', fontSize: 16 }]}>{item.name}</Text>
                <Text style={[styles.TitleText, { color: '#343434', fontSize: 12 }]}>₹{item.price}</Text>
                <Text style={[styles.textinputTextSmall, { color: '#343434', marginLeft: 0, width: width * .65, fontSize: 10, height: height * .07 }]}>{item.short_description}</Text>
            </View>
        </TouchableOpacity>
    }
    // Grid view
    renderItemGrid = ({ item }) => {
        return <View
            style={{
                width: width * .5, justifyContent: 'space-around', alignItems: 'center', paddingBottom: height * .03
            }}>
            <View style={{ backgroundColor: '#FFF', height: height * 0.44, borderRadius: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={{ uri: item.images[0] ? item.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
                        style={{ width: width * .47, height: width * .45, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                    />
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={[styles.TitleText, { color: '#343434', fontSize: 14, width: width * .34 }]} numberOfLines={1}>{item.name}</Text>
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
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 12, width: width * 0.24 }}>Starting Bid</Text>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 12, }}>₹{item.price}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('BiddingDetails', { petData: item })}
                        style={{ width: width * 0.4, height: height * 0.06, backgroundColor: '#FDC500', justifyContent: 'center', marginTop: height * .01, borderRadius: 10 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-SemiBold', fontSize: 12, color: '#FFF' }}>Bid Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }


    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData,
        });
    };

    render() {
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
            <View style={{ flex: 1, backgroundColor: '#FDC500' }}>
                <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', margin: width * .05 }}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.toggleDrawer(); }}
                    >
                        <Icon name='menu' size={40} type='material-icons' color='#343434' />
                    </TouchableOpacity>
                    {/* <Icon name='menu' size={40} type='material-icons' color='#343434' /> */}
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
                <View style={[styles.textInput, { marginLeft: width * .05, borderWidth: 0, marginBottom: 3, elevation: 5 }]}>
                    <SearchBar
                        // ref="searchBar"
                        placeholder="Search Here"
                        textColor={'black'}
                        lightTheme
                        onChangeText={text => this.searchFilterFunction(text)}
                        autoCorrect={false}
                        value={this.state.value}
                        lightTheme={true}
                    //onSearchButtonPress={...}
                    //onCancelButtonPress={...}
                    />
                </View>
                {/* categories */}
                <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#FFF' }}>
                    <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
                        <Text style={[styles.TitleText, { color: '#343434', width: width * .6 }]}>Bidding</Text>
                    </View>
                    {/* pet list */}
                    <FlatList
                        style={{ marginBottom: height * .1 }}
                        keyExtractor={(item, index) => index}
                        numColumns={this.state.gridView ? 2 : 1}
                        data={this.state.dataSource}
                        extraData={this.state}
                        renderItem={this.renderItemGrid}
                    />

                </ScrollView>
            </View>
        );

    }
}