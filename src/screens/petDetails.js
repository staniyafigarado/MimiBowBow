import React from 'react';
import { Text, View, Dimensions, Image, Alert, Modal, ImageBackground, Button, ToastAndroid } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Badge } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from '../styles/styles';
import WooCommerce from '../utils/wooApi';
import AsyncStorage from '@react-native-community/async-storage';
import Share from 'react-native-share';
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
    constructor(props) {
        super(props);
        this.state = {
            listView: 1,
            isLoading: true,
            gridView: true,
            productData: [],
            cartData: [],
            btnValue: 1,
            isVisible: false, Userid: '', productId: '', loginData: [], shareKey: '', data: [], cartCount: 0, description: ''
        };
    }
    componentDidMount = async () => {
        //   const Userid = await AsyncStorage.getItem('user_id');
        try {
            let data = await AsyncStorage.getItem('loginDetails');
            console.log('Data 100', data);
            if (data !== null) {
                this.setState({ loginData: JSON.parse(data) });
            }
        } catch (error) {
            console.log('Something went wrong', error);
        }
        AsyncStorage.getItem('user_id').then((value) => this.setState({ 'userid': value }))

        const { navigation } = this.props;
        const petData = navigation.getParam('petData', 'Null');
        console.log(JSON.stringify(petData.id))
        this.setState({ productId: petData.id });
        const regex = /(<([^>]+)>)/ig;
        const result = petData.description.replace(regex, '');
        this.setState({ description: result })
        WooCommerce.get('products').then(response => {
            this.setState({
                productData: petData,
                isLoading: false,
            });
        }).catch(error => {
            console.log(error + "123");
        });
        const existingCart = await AsyncStorage.getItem('cart');
        this.setState({
            cartCount: JSON.parse(existingCart).length
        });
        this.getShareKey();
    }

    getShareKey() {
        return fetch('https://mimiandbowbow.com/alpha/wp-json/wc/v3/wishlist/get_by_user/' + this.state.loginData.user_id + '?consumer_key=ck_3dc8e609d9bf166cc09293bf3ebdb6a0c19bb46d&consumer_secret=cs_18122b00e28ea61f7560e0d0e16ad4075aa8f326')
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json));
                this.setState({ shareKey: json[0]["share_key"] })
                console.log(json[0]["share_key"])
            })
            .catch((error) => {
                console.error(error);
            });
    }

    addToWhishlist() {
        const data = new FormData()
        data.append('product_id', this.state.productId)
        return fetch('https://mimiandbowbow.com/alpha/wp-json/wc/v3/wishlist/' + this.state.shareKey + '/add_product?consumer_key=ck_3dc8e609d9bf166cc09293bf3ebdb6a0c19bb46d&consumer_secret=cs_18122b00e28ea61f7560e0d0e16ad4075aa8f326', {
            method: 'POST',
            body: data,
        })
            .then(response => response.text())
            .then(result => {
                console.log(result)
                ToastAndroid.show("Item Added to whishlist", ToastAndroid.SHORT);
            })

            .catch(error => {
                console.error(error)
            })
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
    addingItemToCart() {
        const data = new FormData()
        data.append('product_id', this.state.productId)
        return fetch('https://mimiandbowbow.com/alpha/wp-json/cocart/v1/add-item?id=' + this.state.loginData.user_id, {
            method: 'POST',
            body: data,
        })
            .then(response => response.text())
            .then(result => console.log(result))

            .catch(error => {
                console.error(error)
            })
    }
    sharing = () => {
        const shareOptions = {
            title: 'MimiandBowbow',
            message: "Find your favorate pets with mimi and bow",
            url: this.state.productData.permalink
        };

        Share.open(shareOptions)
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
    }
    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                    <PacmanIndicator
                        count={5}
                        color='#343434'
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
                    <ScrollView style={{ backgroundColor: '#FFF', marginBottom: 20 }} showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', marginHorizontal: width * .05, alignItems: 'center' }}>
                            <View style={{ width: '75%' }}>
                                <Text style={[styles.TitleText, { color: '#343434', }]}>{this.state.productData.name}</Text>
                                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 12, color: '#343434' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</Text>
                            </View>
                            {/* {/* <Icon name='share-variant' size={25} type='material-community' color='#343434' margin={20} /> */}
                            <View style={{ width: '25%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.addToWhishlist()}>
                                    <Icon name='heart' size={25} type='material-community' color='#343434' />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.sharing()}>
                                    <Icon name='share-variant' size={25} type='material-community' color='#343434' />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ borderRadius: 5, width: width * .9, margin: width * .05, height: height * .7, elevation: 7 }}>
                            <Image
                                source={{ uri: this.state.productData.images[0] ? this.state.productData.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
                                style={{ width: width * .9, height: height * .4, borderRadius: 2, resizeMode: 'stretch' }}
                            />
                            <View style={{ height: height * .35, backgroundColor: 'rgba(255,255,255,1)', padding: width * .05 }}>
                                <Text style={{ fontSize: 23, fontFamily: 'Montserrat-Medium' }}>Price : ₹{this.state.productData.price}‎ </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Rating imageSize={15} readonly startingValue={this.state.productData.average_rating} />
                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12 }}>{Number(this.state.productData.average_rating)}/5 rating</Text>
                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12 }}>({this.state.productData.rating_count} reviews)</Text>
                                </View>
                                <Text style={{ fontFamily: 'Montserrat-Regular', color: 'rgba(0,0,0,1)' }}>Description</Text>
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 11, color: 'rgba(0,0,0,.7)' }} numberOfLines={2}>{this.state.description}</Text>
                                {this.state.btnValue === 1 ?
                                    <TouchableOpacity onPress={() => { this.addToCart(this.state.productData); this.addingItemToCart(); }} style={{ width: width * .8, marginTop: width * .05, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDC500', height: height * 0.08, borderRadius: 3, elevation: 3 }}>
                                        <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]}>ADD TO CART</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')} style={{ width: width * .8, marginTop: width * .05, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDC500', height: height * 0.08, borderRadius: 3, elevation: 3 }}>
                                        <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]}>GO TO CART</Text>
                                    </TouchableOpacity>
                                }

                            </View>

                        </View>
                    </ScrollView>
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



                </View>
            );
        }
    }
}