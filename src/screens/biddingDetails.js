import React from 'react';
import { Text, View, Dimensions, Image, TextInput, Modal, ImageBackground, Button, FlatList } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Badge } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from '../styles/styles';
import WooCommerce from '../utils/wooApi';
import AsyncStorage from '@react-native-community/async-storage';
import CountDown from 'react-native-countdown-component';

import {
    PacmanIndicator,
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
                dataSource: response.data,
                selectedCategory: 'Bidding'
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
                                /* {this.state.cartCount = 0 ? */
                                <Badge value={this.state.cartCount} status="error" containerStyle={{ position: 'absolute', top: -1, right: -1 }} />
                                : null
                            }
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                        <View style={{ height: height * .55, width: '93%', backgroundColor: '#FFF', alignSelf: 'center', borderRadius: 10, padding: width * .03 }}>
                            <View style={{ height: height * .25, flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{ uri: this.state.productData.images[0] ? this.state.productData.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
                                    style={{ width: width * .33, height: height * .2, borderRadius: 10 }}></Image>
                                <View style={{ flexDirection: 'column', padding: 10 }}>
                                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>{this.state.productData.name}</Text>
                                    <View style={{ flexDirection: 'row', marginTop: height * .01 }}>
                                        <Rating
                                            type='custom'
                                            ratingColor='#f5c711'
                                            ratingBackgroundColor='white'
                                            ratingCount={5}
                                            imageSize={14.5}
                                            startingValue={this.state.productData.average_rating}
                                            style={{ paddingVertical: 0 }}
                                        />
                                        <Text style={[styles.TitleText, { color: '#343434', fontSize: 12, marginLeft: width * .02 }]}>4.5/5 rating</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: height * .01 }}>
                                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, width: width * 0.24 }}>Starting Bid</Text>
                                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, color: '#00AE51' }}>₹{this.state.productData.price}</Text>
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
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12 }}>Time Left</Text>
                            <View >
                                <CountDown
                                    until={3600}
                                    onFinish={() => alert('finished')}
                                    // onPress={() => alert('hello')}
                                    size={15}
                                />
                            </View>
                            <View style={{ marginTop: height * .01, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, }}>Ending On:</Text>
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#EE1221', marginLeft: 10 }}>{this.state.productData.date_created}</Text>
                            </View>
                            <View style={{ marginTop: height * .01, flexDirection: 'row' }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, }}>Timezone:</Text>
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, marginLeft: 10 }}>UTC +5.5</Text>
                            </View>
                            {this.state.btnValue === 1 ?
                                <TouchableOpacity
                                    onPress={() => this.addToCart(this.state.productData)}
                                    style={{ backgroundColor: 'black', height: height * .08, marginTop: height * .01, borderRadius: 10, justifyContent: 'center' }}>
                                    <Text style={{ color: '#FFF', textAlign: 'center', fontFamily: 'Montserrat-SemiBold', fontSize: 18 }}>By Now at ₹{this.state.productData.price}</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('CartPage')}
                                    style={{ backgroundColor: 'black', height: height * .08, marginTop: height * .01, borderRadius: 10, justifyContent: 'center' }}>
                                    <Text style={{ color: '#FFF', textAlign: 'center', fontFamily: 'Montserrat-SemiBold', fontSize: 18 }}>Go to Cart</Text>
                                </TouchableOpacity>
                            }

                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <Modal
                                animationType={"fade"}
                                transparent={true}
                                visible={this.state.isVisible}
                                onRequestClose={() => { console.log("Modal has been closed.") }}>
                                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }}>
                                    <ImageBackground source={require('../assets/images/Alert1.png')} style={{
                                        width: width * 1, height: width * 1, justifyContent
                                            : 'flex-end', alignItems: 'center', marginTop: height * .25
                                    }} >
                                        {/* <TouchableOpacity onPress = {() => {this.setState({ isVisible:!this.state.isVisible})}} style={[styles.textInputLogin,{alignItems:'center',backgroundColor:'#343434', borderWidth:0}]}>
                        <Text style={[styles.TextiputHeader,{color:'rgba(255,255,255,1)'}]} >CLOSE</Text>
                     </TouchableOpacity> */}
                                        <Button style={[styles.textInputLogin, { alignItems: 'center', backgroundColor: '#343434', borderWidth: 0 }]} title="CLOSE" onPress={() => { this.setState({ isVisible: !this.state.isVisible }) }} />
                                    </ImageBackground>
                                </View>
                            </Modal>
                        </View>
                        <View style={{ width: '93%', backgroundColor: '#FFF', alignSelf: 'center', borderRadius: 10, padding: width * .03, marginTop: height * .025 }}>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>Description</Text>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 10, color: '#707070', textAlign: 'justify', marginTop: height * .01 }}>{this.state.productData.description}</Text>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginTop: height * .01 }}>Additional Information</Text>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 10, color: '#707070', textAlign: 'justify', marginTop: height * .01 }}>Weight: {this.state.productData.description}</Text>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginTop: height * .01 }}>Bids</Text>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 10, color: '#707070', textAlign: 'justify', marginTop: height * .01 }}>Auction Started: {this.state.productData.date_created}</Text>
                        </View>
                        <Text style={{ marginTop: height * .025, fontFamily: 'Montserrat-SemiBold', fontSize: 18, color: '#FFF', paddingLeft: width * 0.05 }}>Related products</Text>
                        <View style={{ marginTop: height * .025 }}>
                            <FlatList
                                horizontal={true}
                                style={{ marginBottom: height * .07, padding: 10, marginRight: 10 }}
                                keyExtractor={(item, index) => index}
                                data={this.state.dataSource.filter(item => {
                                    return item.categories[0].name === this.state.selectedCategory;
                                })}
                                extraData={this.state}
                                renderItem={this.renderItemGrid}
                            />
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}