import React from 'react';
import { Text, View, Dimensions, Image, TextInput, ImageBackground, Alert, ToastAndroid, StatusBar } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-community/async-storage';
import WooCommerce from '../utils/wooApi';
import axios from 'axios';
import { color } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window')

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            hidePassword: true, msg: [], username: '', status: ''
        };
    }
    // userLogin = () => {
    //     const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     if (this.state.emailId != '' || reg.test(this.state.emailId) === true) {
    //         WooCommerce.post('customers', {
    //             email: this.state.emailId
    //         }).then(response => {
    //             console.log(response);
    //             this.gotoHome(response);
    //         }).catch(error => {
    //             console.log(error + "1234");
    //         });
    //     }
    //     else {
    //         Alert.alert("Alert", "Please enter a valid mail ID");
    //     }


    // }
    // gotoHome = async (response) => {
    //     try {

    //         console.log(response.data)
    //         await AsyncStorage.setItem('userData', JSON.stringify(response.data));

    //         // this.props.navigation.push('Home')
    //         const resetAction = StackActions.reset({
    //             index: 0,
    //             actions: [NavigationActions.navigate({ routeName: 'Home' })],
    //         });
    //         this.props.navigation.dispatch(resetAction);

    //     } catch (error) {
    //         Alert.alert("Alert", "An account is already registered with your email address. Please log in.");
    //         console.log(error)
    //     }
    // }

    insertData(nonce) {
        axios.get('https://mimiandbowbow.com/alpha/api/user/register/?username=' + this.state.username + '&email=' + this.state.email + '&user_pass=' + this.state.password + '&nonce=' + nonce)
            .then(res => {
                const data = res.data;
                if (data.error) {
                    alert(data.error)
                    console.log("nounce", data.error)
                } else {
                    console.log("nouncee", data);
                    // this.props.navigation.navigate("Login");
                }
                // this.props.navigation.navigate("Login");
            }).catch(error => {
                console.log("error", error)
            });
    }

    getWPnonce() {
        axios.get('https://mimiandbowbow.com/alpha/api/get_nonce/?controller=user&method=register')
            .then(res => {
                this.insertData(res.data.nonce);
                console.log("get", res.data.nonce);
            }).catch(error => {
                console.log("gete", error.response)
            });
    }

    // handleSubmit = () => {
    //     // e.preventDefault();
    //     this.getWPnonce();

    //     WooCommerce.post('customers', {
    //         email: this.state.email,
    //         username: this.state.username,
    //         password: this.state.password
    //     })
    //         .then(data => {
    //             ToastAndroid.show("Successfull", ToastAndroid.SHORT);
    //             AsyncStorage.setItem('username', this.state.username);
    //             this.props.navigation.navigate("Login");
    //             console.log(data);
    //             console.log(data.data);
    //         })
    //         .catch(error => {
    //             console.log(error.message);
    //         });
    // }
    handleSubmit = () => {
        fetch("https://mimiandbowbow.com/alpha/wp-json/wc/v3/customers?consumer_key=ck_3dc8e609d9bf166cc09293bf3ebdb6a0c19bb46d&consumer_secret=cs_18122b00e28ea61f7560e0d0e16ad4075aa8f326&email=" + this.state.email + "&username=" + this.state.username, {
            method: 'POST',
            headers: new Headers({
                "X-Shopify-Storefont-Access-Token": "18e4894f164b996610cbcb4f8690b6be",
                "Accept": "application/json",
                "Content-Type": "application/json"
            }),

        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (!responseJson.username) {
                    alert(responseJson.message)
                }
                else {
                    ToastAndroid.show("Successfull", ToastAndroid.SHORT);
                    this.props.navigation.navigate("Login");
                    alert("Check your email for user name and password")
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    setPasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }
    render() {
        return (
            <ImageBackground source={require('../assets/images/SignUpBkGrnd.png')} style={{ width: '100%', height: '100%' }}>
                <StatusBar barStyle="dark-content" hidden={true} backgroundColor="#FDC500" translucent={true} />
                <ScrollView showsVerticalScrollIndicator={true}>
                    <View style={{ height: height * .4, marginLeft: width * .05, paddingTop: height * .1 }}>
                        <Text style={[styles.TitleText, { color: 'rgba(255,255,255,1)' }]} >Create An Account</Text>
                    </View>
                    <Text>{this.state.msg.error}</Text>
                    <View style={{ alignItems: 'center', }}>
                        <View style={styles.textInputLogin}>
                            <TextInput style={styles.textinputText}
                                placeholder="* User name"
                                keyboardType='email-address'
                                returnKeyType={"next"}
                                onChangeText={username => this.setState({ username })}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.textInputLogin}>
                            <TextInput style={styles.textinputText}
                                placeholder="* Email Address"
                                keyboardType='email-address'
                                returnKeyType={"next"}
                                onChangeText={email => this.setState({ email })}
                            />
                        </View>
                    </View>
                    {/* <View style={{ alignItems: 'center' }}>
                        <View style={[styles.textInputPass, { alignItems: 'center', elevation: 3 }]}>
                            <TextInput style={[styles.textinputText, { width: '80%', }]}
                                placeholder="* Password"
                                keyboardType="default"
                                returnKeyType={"next"}
                                secureTextEntry={this.state.hidePassword}
                                onChangeText={password => this.setState({ password })}
                            />
                            <TouchableOpacity onPress={this.setPasswordVisibility}>
                                {
                                    this.state.hidePassword ? <Icon name='eye-off' size={25} type='ionicon' color='#343434' /> : <Icon name='eye' size={25} type='ionicon' color='#343434' />
                                }
                            </TouchableOpacity>
                        </View>
                    </View> */}

                    <View style={{ alignItems: 'center', paddingTop: height * .03 }}>
                        <TouchableOpacity onPress={() => this.handleSubmit()} style={[styles.textInputLogin, { alignItems: 'center', backgroundColor: '#FDC500', elevation: 3 }]}>
                            <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]} >CONTINUE</Text>
                        </TouchableOpacity>

                    </View>
                    {/* <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <View style={{ margin: 20, width: width * 0.15, height: width * 0.15, borderWidth: 1, borderColor: '#343434', borderRadius: width * .075, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name='facebook' size={30} type='fontisto' color='#343434' />
                        </View>
                        <View style={{ margin: 20, width: width * 0.15, height: width * 0.15, borderWidth: 1, borderColor: '#343434', borderRadius: width * .075, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name='google-plus' size={40} type='material-community' color='#343434' />
                        </View>
                    </View> */}
                </ScrollView>
            </ImageBackground>
        );
    }
}