import React from 'react';
import { Text, View, Dimensions, Image, TextInput, ImageBackground, Alert, Keyboard, KeyboardAvoidingView, } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-community/async-storage';
import WooCommerce from '../utils/wooApi';
const { width, height } = Dimensions.get('window')
import axios from 'axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            validating: false, hidePassword: true
        };
    }
    insertData() {
        axios.post('https://mimiandbowbow.com/alpha/wp-json/simple-jwt-authentication/v1/token?username=' + this.state.email + '&password=' + this.state.password)

            .then(res => {
                const data = res.data;
                console.log(data);
                let userDets = {
                    username: res.data.user_nicename,
                    email: res.data.user_email,
                    // displayname: response.data.user_display_name
                };
                alert('Scucessfully signed in with email ' + userDets.email);
                this.props.navigation.navigate("Home");
                AsyncStorage.setItem('user_id', res.data.user_id);
                AsyncStorage.setItem('username', res.data.username);
            }).catch(error => {
                alert("Something went wrong, Check your email and password.")
                console.log(error)
            });
    }

    async saveToStorage(userData) {
        if (userData) {
            console.log(userData);
            await AsyncStorage.setItem('user', JSON.stringify({
                isLoggedIn: true,
                authToken: userData.auth_token,
                id: userData.user_id,
                name: userData.user_login
            })
            );
            return true;
        }

        return false;
    }
    setPasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{ flex: 1 }}>
                <ImageBackground source={require('../assets/images/SignUpBkGrnd.png')} style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                }}>
                    <View style={{ height: height * .4, marginLeft: width * .05, paddingTop: height * .1 }}>
                        <Text style={[styles.TitleText, { color: 'rgba(255,255,255,1)' }]} >Sign In</Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingTop: height * .04 }}>
                        <View style={styles.textInputLogin}>
                            <TextInput style={styles.textinputText}
                                placeholder="* Email Address"
                                keyboardType='email-address'
                                returnKeyType={"next"}
                                onChangeText={email => this.setState({ email })}
                            />
                        </View>
                        <View style={[styles.textInputPass, { alignItems: 'center' }]}>
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
                    </View>
                    <View style={{ width: width * .5, marginLeft: width * .42 }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('ForgotPass')
                            }}
                        >
                            <Text style={[styles.textinputText, { textAlign: 'right' }]}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.userLogin()} style={[styles.textInputLogin, { alignItems: 'center', backgroundColor: '#343434', borderWidth: 0 }]}>
                        <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]} >CONTINUE</Text>
                    </TouchableOpacity>

                </View> */}
                    {/* staniya new view */}
                    <View style={{ alignItems: 'center', marginTop: height * .05 }}>
                        <TouchableOpacity
                            // onPress={() => {
                            //     if (this.state.email && this.state.password) {
                            //         this.validate();

                            //     }
                            // }}
                            onPress={() => this.insertData()}
                            style={[styles.textInputLogin, { alignItems: 'center', backgroundColor: '#343434', borderWidth: 0 }]}>
                            <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]} >CONTINUE</Text>
                        </TouchableOpacity>

                    </View>
                    {/* <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.loginWithFacebook(navigate);
                            // this.props.navigation.navigate('Home')
                        }}
                        style={{ margin: 20, width: width * 0.15, height: width * 0.15, borderWidth: 1, borderColor: '#343434', borderRadius: width * .075, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='facebook' size={30} type='fontisto' color='#343434'
                        // onPress={() => loginWithFacebook()} 
                        />
                    </TouchableOpacity>
                    <View style={{ margin: 20, width: width * 0.15, height: width * 0.15, borderWidth: 1, borderColor: '#343434', borderRadius: width * .075, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='google-plus' size={40} type='material-community' color='#343434' />
                    </View>
                </View> */}
                </ImageBackground>
            </ScrollView>
        );
    }
}