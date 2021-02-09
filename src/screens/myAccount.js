import React from 'react';
import { Text, View, Dimensions, Image, BackHandler, FlatList, StatusBar } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Badge } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
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

import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('window')
import WooCommerce from '../utils/wooApi';
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: null, userid: '', profile: '', username: '', dataSource: [], isLoading: true, loginData: '', cartCount: 0
        }
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }

    async componentDidMount() {
        //   const Userid = await AsyncStorage.getItem('user_id');
        // AsyncStorage.getItem('user_id').then((value) => this.setState({ 'userid': value }))
        AsyncStorage.getItem('profile').then((value) => this.setState({ 'profile': value }))
        // AsyncStorage.getItem('username').then((value) => this.setState({ 'username': value }))
        try {
            let data = await AsyncStorage.getItem('loginDetails');
            console.log('Data 100', data);
            if (data !== null) {
                this.setState({ loginData: JSON.parse(data) });
            }
        } catch (error) {
            console.log('Something went wrong', error);
        }
        const existingCart = await AsyncStorage.getItem('cart');
        this.setState({
            cartCount: JSON.parse(existingCart).length
        });
        this.fetchData();
    }
    fetchData() {
        WooCommerce.get('customers/' + this.state.loginData.user_id)
            .then(res => {
                console.log(res.data);

                this.setState({
                    dataSource: res.data,
                    isLoading: false,

                }); console.log(this.state.dataSource.avatar_url)
            })
            .catch(error => {
                console.log(error);
            });
    }
    postData() {
        const data = {
            email: this.state.loginData.user_email,
            avatar_url: this.state.avatarSource.uri,
        };

        WooCommerce.put("customers/" + this.state.loginData.user_id, data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }
    // Image picker
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            } this.postData();
        });
    }

    uploadButton = () => {
        this.setState({ loading: true })
        const data = new FormData()
        data.append('avatar_url', this.state.avatarSource.uri)

        return fetch('https://mimiandbowbow.com/alpha/wp-json/wc/v3/customers?consumer_key=ck_3dc8e609d9bf166cc09293bf3ebdb6a0c19bb46d&consumer_secret=cs_18122b00e28ea61f7560e0d0e16ad4075aa8f326', {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(json => {
                console.log('append', json)
                console.log('error', json.error)
                this.setState({ loading: false })
                if (json.error) {
                    alert('Error')
                } else {
                    alert('upload successfully');
                    // this.props.navigation.navigate('mainsrc')
                }
                return json
            })

            .catch(error => {
                console.error(error)
            })
    }
    //   image rendering
    renderFileData() {
        if (this.state.avatarSource) {
            return <View>
                <Image
                    source={this.state.avatarSource}
                    style={{ height: height * .17, width: height * .17, borderRadius: height * .085 }}
                />
            </View>

        }

        else {
            return <View>
                <Image
                    source={{ uri: this.state.dataSource.avatar_url }}
                    style={{ height: height * .17, width: height * .17, borderRadius: height * .085 }}
                />
            </View>
        }
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
        return (
            <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
                <StatusBar barStyle="dark-content" hidden={true} backgroundColor="rgba(255,255,255,1)" translucent={true} />
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
                <View style={{ height: height * .25, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    {this.state.profile ? (
                        <Image
                            source={{ uri: this.state.profile }}
                            style={{ height: height * .17, width: height * .17, borderRadius: height * .085 }}
                        />
                    ) : this.renderFileData()}
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18 }}>
                        {this.state.username}
                    </Text>

                    {/* <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: height * 0.03 }}>
                            <Icon name='camera' size={20} type='material-community' color='#343434' />
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, paddingLeft: 10 }}>
                                Change Profile Picture
                        </Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
                <View style={{ height: height * .65, backgroundColor: '#fff', borderTopStartRadius: 40, borderTopEndRadius: 40, padding: height * .05, justifyContent: 'space-evenly', paddingBottom: height * 0.12 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyProfile')} style={{ flexDirection: 'row', paddingLeft: width * .05, paddingBottom: height * .05 }}>
                        <Icon name='user-circle' size={20} type='font-awesome-5' color='rgba(0,0,0,1)' />
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, paddingLeft: 20 }}>
                            My Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderListing')} style={{ flexDirection: 'row', paddingLeft: width * .05, paddingBottom: height * .05 }}>
                        <Icon name='cart' size={20} type='material-community' color='#343434' />
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, paddingLeft: 20 }}>
                            My Orders
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BillingAddress')} style={{ flexDirection: 'row', paddingLeft: width * .05, paddingBottom: height * .05 }}>
                        <Icon name='address-card' size={20} type='font-awesome-5' color='rgba(0,0,0,1)' />
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, paddingLeft: 20 }}>
                            Billing Address
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('LogOut') }} style={{ flexDirection: 'row', paddingLeft: width * .05, paddingBottom: height * .05 }}>
                        <Icon name='logout' size={20} type='material-community' color='rgba(0,0,0,1)' />
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, paddingLeft: 20 }}>
                            Logout
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        );

    }
}