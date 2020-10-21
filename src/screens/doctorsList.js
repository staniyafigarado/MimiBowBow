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

const { width, height } = Dimensions.get('window')

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listView: 1,
            isLoading: true,
            gridView: true,
            selectedCategory: ''
        };
    }
    componentDidMount = async () => {

        WooCommerce.get('products').then(response => {
            console.log(response.data + "123");
            this.setState({
                dataSource: response.data,
                isLoading: false,
                selectedCategory: 'Doctors'
            });
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
    viewType = (value) => {
        if (value === 2) {
            this.setState({
                listView: 2,
                gridView: false
            });
        }
        else {
            this.setState({
                listView: 1,
                gridView: true
            });

        }
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
            if (this.state.listView == 1) {
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
                                {this.state.cartCount != 0 ?
                                    <Badge value={this.state.cartCount} status="error" containerStyle={{ position: 'absolute', top: -1, right: -1 }} />
                                    : null
                                }
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
                            <Text style={[styles.TitleText, { color: '#343434', width: width * .6 }]}>{this.state.selectedCategory}</Text>
                            <TouchableOpacity onPress={() => { this.viewType(1); }}>
                                <Icon name='view-grid' size={30} type='material-community' color='#343434' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.viewType(2); }}>
                                <Icon name='view-list' size={30} type='material-community' color='#343434' />
                            </TouchableOpacity>

                            {/* <Icon name='arrow-right' size={30} type='material-community' color='#343434' /> */}
                        </View>
                        <ScrollView>

                            <FlatList
                                keyExtractor={(item, index) => index}
                                key={(this.state.gridView) ? 1 : 0}
                                numColumns={this.state.gridView ? 2 : 1}
                                data={this.state.dataSource}
                                renderItem={({ item, index }) => (
                                    item.categories[0].name === this.state.selectedCategory ?
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('DoctorDetails', { petData: item })}
                                            style={{ width: width * .5, height: width * .65, backgroundColor: 'rgba(255,255,255,1)', borderRightWidth: .5 }}>
                                            <Image
                                                source={{ uri: item.images[0] ? item.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
                                                style={{ width: width * .5, height: width * .5, }}
                                            />
                                            <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-between' }}>
                                                <Text style={[styles.TitleText, { color: '#343434', fontSize: 14, width: width * .28 }]} numberOfLines={1}>{item.name}</Text>
                                                <Rating
                                                    type='custom'
                                                    ratingColor='#f5c711'
                                                    ratingBackgroundColor='white'
                                                    ratingCount={5}
                                                    imageSize={15}
                                                    style={{ paddingVertical: 0 }}
                                                />
                                            </View>
                                            <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-between' }}>
                                                <Text style={[styles.TitleText, { color: '#343434', fontSize: 12 }]}>₹{item.price}</Text>
                                                <Text style={[styles.TitleText, { color: '#343434', fontSize: 12 }]}>4.5/5 rating</Text>
                                            </View>
                                        </TouchableOpacity>
                                        : null
                                )}
                            />
                        </ScrollView>
                    </View>
                );
            } else {
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
                            <Text style={[styles.TitleText, { color: '#343434', width: width * .6 }]}>{this.state.selectedCategory}</Text>
                            <TouchableOpacity onPress={() => { this.viewType(1); }}>
                                <Icon name='view-grid' size={30} type='material-community' color='#343434' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.viewType(2); }}>
                                <Icon name='view-list' size={30} type='material-community' color='#343434' />
                            </TouchableOpacity>
                            <Icon name='arrow-right' size={30} type='material-community' color='#343434' />
                        </View>
                        <ScrollView>
                            <FlatList
                                keyExtractor={(item, index) => index}
                                data={this.state.dataSource}
                                key={(this.state.gridView) ? 1 : 0}
                                numColumns={this.state.gridView ? 2 : 1}
                                renderItem={({ item, index }) => (
                                    item.categories[0].name === this.state.selectedCategory ?
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('DoctorDetails', { petData: item })}
                                            style={{ height: height * .2, padding: width * .025, backgroundColor: 'rgba(255,255,255,1)', borderTopWidth: 2, borderTopColor: '#f5c711', flexDirection: 'row' }}>
                                            <Image
                                                source={{ uri: item.images[0] ? item.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
                                                style={{ width: height * .17, height: height * .17, }}
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
                                        : null
                                )}
                            />
                        </ScrollView>
                    </View>
                );
            }
        }
    }
}