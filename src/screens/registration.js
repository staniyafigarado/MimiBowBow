// import React from 'react';
// import { Text, View, Dimensions, Image, TextInput, BackHandler, ImageBackground, StatusBar, Alert } from 'react-native';
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import { Icon } from 'react-native-elements';
// import styles from '../styles/styles';
// import { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from "react-native-fbsdk";
// import {
//     GoogleSigninButton,
//     GoogleSignin,
//     statusCodes
// } from '@react-native-community/google-signin';

// const { width, height } = Dimensions.get('window')
// // const loginWithFacebook = () => {
// //     LoginManager.logInWithPermissions(["public_profile", "email"]).then(
// //         function (result) {
// //             if (result.isCancelled) {

// //                 console.log("==> Login cancelled");
// //             } else {
// //                 console.log(
// //                     "==> Login success with permissions: " +
// //                     result.grantedPermissions.toString()

// //                 );
// //             }
// //         },
// //         function (error) {
// //             console.log("==> Login fail with error: " + error);
// //         }
// //     );
// // }

// async function signIn() {
//     try {
//         await GoogleSignin.hasPlayServices();
//         const userInfo = await GoogleSignin.signIn();
//         this.setState({ userInfo });
//     } catch (error) {
//         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//             // user cancelled the login flow
//             alert('Process Cancelled');
//         } else if (error.code === statusCodes.IN_PROGRESS) {
//             // operation (e.g. sign in) is in progress already
//             alert('Process in progress');
//         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//             // play services not available or outdated
//             alert('Play services are not available');
//         } else {
//             // some other error happened
//             console.log({ error })
//             alert('Something else went wrong... ', error.toString());
//         }
//     }
// }

// async function getCurrentUserInfo() {
//     try {
//         const userInfo = await GoogleSignin.signInSilently();
//         setUserInfo(userInfo);
//     } catch (error) {
//         if (error.code === statusCodes.SIGN_IN_REQUIRED) {
//             // when user hasn't signed in yet
//             Alert.alert('Please Sign in');
//             setIsLoggedIn(false);
//         } else {
//             Alert.alert('Something else went wrong... ', error.toString());
//             setIsLoggedIn(false);
//         }
//     }
// }
// export default class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             pushData: [],
//             loggedIn: false,
//         };
//     }
//     async componentDidMount() {
//         this._configureGoogleSignIn();

//     }
//     _configureGoogleSignIn() {
//         GoogleSignin.configure({
//             webClientId: ' 522544017492-0fmefup56u8euu3mhtohotd13u83vfbn.apps.googleusercontent.com',// my clientID
//             offlineAccess: false
//         });
//     }
//     async GoogleSignin() {
//         try {
//             await GoogleSignin.hasPlayServices();
//             const userInfo = await GoogleSignin.signIn();
//             // this.setState({ userInfo, error: null });
//             Alert.alert("success:" + JSON.stringify(userInfo));

//         } catch (error) {
//             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//                 // sign in was cancelled
//                 Alert.alert('cancelled');
//             } else if (error.code === statusCodes.IN_PROGRESS) {
//                 // operation in progress already
//                 Alert.alert('in progress');
//             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//                 Alert.alert('play services not available or outdated');
//             } else {
//                 Alert.alert('Something went wrong', error.toString());
//                 this.setState({
//                     error,
//                 });
//             }
//         }
//     }
//     // FBLogout = (accessToken) => {
//     //     let logout =
//     //         new GraphRequest(
//     //             "me/permissions/",
//     //             {
//     //                 accessToken: accessToken,
//     //                 httpMethod: 'DELETE'
//     //             },
//     //             (error, result) => {
//     //                 if (error) {
//     //                     console.log('Error fetching data: ' + error.toString());
//     //                 } else {
//     //                     LoginManager.logOut();
//     //                 }
//     //             });
//     //     new GraphRequestManager().addRequest(logout).start();
//     // };
//     getInfoFromToken = token => {
//         const PROFILE_REQUEST_PARAMS = {
//             fields: {
//                 string: 'public_profile, email',
//             },
//         };
//         const profileRequest = new GraphRequest(
//             '/me',
//             { token, parameters: PROFILE_REQUEST_PARAMS },
//             (error, result) => {
//                 if (error) {
//                     console.log('login info has error: ' + error);
//                 } else {
//                     this.setState({ userInfo: result });
//                     console.log('result:', result);
//                 }
//             },
//         );
//         new GraphRequestManager().addRequest(profileRequest).start();
//     };
//     loginWithFacebook(navigate) {
//         if (Platform.OS === "android") {
//             LoginManager.setLoginBehavior("web_only")
//         }
//         LoginManager.logInWithPermissions(["public_profile", "email"]).then(
//             function (result) {
//                 if (result.isCancelled) {
//                     console.log('Login cancelled');
//                 } else {
//                     alert('Login was successful with permissions: ' + result.grantedPermissions.toString());
//                     // navigate("Home");
//                     // this.getInfoFromToken(accessToken);
//                     // console.log(
//                     //     'Login success with permissions: ' +
//                     //     result.grantedPermissions.toString(),
//                     // );
//                     // AccessToken.getCurrentAccessToken().then(data => {
//                     //     this.setState({
//                     //         loggedIn: true,
//                     //         userID: data.userID
//                     //     })
//                     //     alert(this.state.loggedIn);
//                     //     console.log(data.accessToken.toString());
//                     //     console.log('result-->', result);
//                     // });
//                     AccessToken.getCurrentAccessToken().then(data => {
//                         const accessToken = data.accessToken.toString();
//                         console.log('data', accessToken)

//                     }); this.getInfoFromToken(accessToken);
//                 }
//             },
//             function (error) {
//                 console.log('Login fail with error: ' + error);
//             },
//         );
//     };
//     // componentDidMount() {
//     //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
//     // }
//     // handleBackButton(){
//     //           BackHandler.exitApp();
//     //       }
//     render() {
//         const { navigate } = this.props.navigation;
//         return (
//             <ImageBackground source={require('../assets/images/SignUpBkGrnd.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}>
//                 <StatusBar barStyle="dark-content" hidden={true} backgroundColor="rgba(255,255,255,1)" translucent={true} />
//                 <View style={{ height: height * .4, marginLeft: width * .05, paddingTop: height * .1 }}>
//                     <Text style={[styles.TitleText, { color: 'rgba(255,255,255,1)' }]} >Create An Account</Text>
//                 </View>
//                 <View style={{ alignItems: 'center' }}>
//                     <TouchableOpacity
//                         onPress={() => this.GoogleSignin()}
//                         style={[styles.roundButton, { justifyContent: 'flex-start', paddingLeft: width * .05, backgroundColor: '#343434', }]}>
//                         <Icon name='google' size={30} type='material-community' color='rgba(255,255,255,1)' />
//                         <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)', fontSize: 13, paddingLeft: width * .1 }]} >CONTINUE WITH GOOGLE</Text>
//                     </TouchableOpacity>

//                 </View>
//                 <View style={{ alignItems: 'center' }}>
//                     <TouchableOpacity onPress={() => this.props.navigation.navigate('UserReg')} style={[styles.roundButton, { justifyContent: 'flex-start', paddingLeft: width * .05, borderWidth: 2, borderColor: '#FDC500', }]}>
//                         <Icon name='email' size={30} type='material' color='#343434' />
//                         <Text style={[styles.TextiputHeader, { color: '#343434', fontSize: 13, paddingLeft: width * .1 }]} >CONTINUE WITH EMAIL</Text>
//                     </TouchableOpacity>

//                 </View>
//                 {/* <GoogleSigninButton
//                     style={styles.signInButton}
//                     size={GoogleSigninButton.Size.Wide}
//                     color={GoogleSigninButton.Color.Dark}
//                     onPress={() => signIn()}
//                 /> */}
//                 <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
//                     {/* <View style={{ margin: 20, width: width * 0.15, height: width * 0.15, borderWidth: 2, borderColor: '#343434', borderRadius: width * .075, alignItems: 'center', justifyContent: 'center' }}>
//                         <Icon name='facebook' size={30} type='fontisto' color='#343434' />
//                     </View> */}
//                     <TouchableOpacity
//                         onPress={() => {
//                             this.loginWithFacebook(navigate);
//                             // this.props.navigation.navigate('Home')
//                         }}
//                         style={{ margin: 20, width: width * 0.15, height: width * 0.15, borderWidth: 1, borderColor: '#343434', borderRadius: width * .075, alignItems: 'center', justifyContent: 'center' }}>
//                         <Icon name='facebook' size={30} type='fontisto' color='#343434' />
//                     </TouchableOpacity>
//                     <View style={{ margin: 20, width: width * 0.15, height: width * 0.15, borderWidth: 2, borderColor: '#343434', borderRadius: width * .075, alignItems: 'center', justifyContent: 'center' }}>
//                         <Icon name='google-plus' size={40} type='material-community' color='#343434' />
//                     </View>
//                 </View>
//                 <View style={{ justifyContent: 'center', alignItems: 'baseline', flexDirection: 'row' }}>
//                     <Text style={{ fontFamily: 'Montserrat-Regular', color: 'rgba(0,0,0,.7)', fontSize: 14 }} >Already Have an Account?</Text>
//                     <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
//                         <Text style={{ fontFamily: 'Montserrat-Bold', color: 'rgba(255,255,255,1)', fontSize: 17 }} > SignIn</Text>
//                     </TouchableOpacity>

//                 </View>
//             </ImageBackground>
//         );
//     }
// }

import React, { Component } from 'react';
import { Text, View, Dimensions, Image, TextInput, BackHandler, ImageBackground, StatusBar, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import styles from '../styles/styles';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import WooCommerce from '../utils/wooApi';
import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
} from 'react-native-fbsdk';
import {
    GoogleSigninButton,
    GoogleSignin,
    statusCodes
} from '@react-native-community/google-signin';
const { width, height } = Dimensions.get('window')
const _getCurrentUserInfo = async () => {
    try {
        let info = await GoogleSignin.signInSilently();
        // console.log('User Info --> ', info);
        this.state.userInfoG(info);
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            // alert('User has not signed in yet');
            console.log('User has not signed in yet');
        } else {
            // alert("Unable to get user's info");
            console.log("Unable to get user's info");
        }
    }
};
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}, userInfoG: {}, profile: '', username: '', email: '', password: '', user: ''
        };
    }
    async componentDidMount() {
        this._configureGoogleSignIn();

    }

    _configureGoogleSignIn() {
        GoogleSignin.configure({
            ClientId: '522544017492-hqmtlkf1dggp9tmaste8nmc3j5dimoft.apps.googleusercontent.com',
            scopes: ['openid', 'email', 'profile'],
            shouldFetchBasicProfile: true,
        });
        this._isSignedIn();
    }

    _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            // alert('User is already signed in');
            this.props.navigation.navigate('Home');
            // Set User Info if user is already signed in
            _getCurrentUserInfo();
        } else {
            console.log('Please Login');
        }
        setGettingLoginStatus(false);
    };
    async GoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo + JSON.stringify(userInfo))
            // this.setState({ userInfo, error: null });
            // Alert.alert("success:" + JSON.stringify(userInfo));
            this.setState({
                profile: userInfo.user.photo,
                username: userInfo.user.name,
                email: userInfo.user.email,
                password: userInfo.user.id
            });
            AsyncStorage.setItem('profile', this.state.profile);
            AsyncStorage.setItem('username', this.state.username);
            AsyncStorage.setItem('email', this.state.email);
            this.handleSubmit();
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                Alert.alert('cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                Alert.alert('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('play services not available or outdated');
            } else {
                console.log(error)
                Alert.alert('Something went wrong', error.toString());
                this.setState({
                    error,
                });
            }
        }
    }

    logoutWithFacebook = () => {
        LoginManager.logOut();
        this.setState({ userInfo: {} });
    };

    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'email,id,name,first_name,last_name,picture.type(large)',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, user) => {
                if (error) {
                    console.log('login info has error: ' + error);
                } else {
                    this.setState({
                        userInfo: user,
                        profile: user.picture.data.url,
                        username: user.name,
                        email: user.email,
                        password: user.id
                    });
                    // AsyncStorage.setItem('user_id', this.state.userInfo.email);
                    AsyncStorage.setItem('profile', this.state.profile);
                    AsyncStorage.setItem('username', this.state.username);
                    AsyncStorage.setItem('email', this.state.email);
                    console.log('result:', user);
                    // this.props.navigation.navigate('Home');
                    // this.getWPnonce();
                    this.handleSubmit();
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };

    loginWithFacebook = () => {
        if (Platform.OS === "android") {
            LoginManager.setLoginBehavior("web_only")
        }
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(['public_profile']).then(
            login => {
                if (login.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    alert('Login was successful with permissions: ' + login.grantedPermissions.toString());
                    AccessToken.getCurrentAccessToken().then(data => {
                        const accessToken = data.accessToken.toString();
                        this.getInfoFromToken(accessToken);

                    });
                }
            },
            error => {
                console.log('Login fail with error: ' + error);
            },
        );
    };
    // insertData(nonce) {
    //     axios.get('https://mimiandbowbow.com/alpha/wp-json/wc/v3/customers?username=' + this.state.userInfo.name + '&email=' + this.state.userInfo.email + '&user_pass=' + this.state.userInfo.id + '&nonce=' + nonce)
    //         .then(res => {
    //             const data = res.data;
    //             console.log("gfh", data.data);
    //             alert(res.data.id)
    //             // AsyncStorage.setItem('user_id', res.data.user_id);
    //             // this.props.navigation.navigate("Home");
    //         }).catch(error => {
    //             // console.log("fcygvjhbknlm.", error.response)
    //         });
    // }

    // getWPnonce() {
    //     axios.get('https://mimiandbowbow.com/alpha/api/get_nonce/?controller=user&method=register')
    //         .then(res => {
    //             // this.insertData(res.data.nonce);
    //             this.handleSubmit();
    //             ///console.log(res.data.nonce);
    //         }).catch(error => {
    //             console.log("j n,mlkm", error.response)
    //         });
    // }
    handleSubmit = () => {
        WooCommerce.post('customers', {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        })
            .then(data => {
                console.log(data.data);
                AsyncStorage.setItem('user', JSON.stringify(data.data.id));
                this.props.navigation.navigate("Home");
            })
            .catch(error => {
                console.log(error);
                alert('User already exist')
            });
    }
    render() {
        const isLogin = this.state.userInfo.name;
        const buttonText = isLogin ? 'Logout With Facebook' : 'Login From Facebook';
        const onPressButton = isLogin
            ? this.logoutWithFacebook
            : this.loginWithFacebook;
        return (
            // <View style={{ flex: 1, margin: 50 }}>
            //     <TouchableOpacity
            //         onPress={onPressButton}
            //         style={{
            //             backgroundColor: 'blue',
            //             padding: 16,
            //             alignItems: 'center',
            //             justifyContent: 'center',
            //         }}>
            //         <Text>{buttonText}</Text>
            //     </TouchableOpacity>
            //     {this.state.userInfo.name && (
            //         <Text style={{ fontSize: 16, marginVertical: 16 }}>
            //             Logged in As {this.state.userInfo.name}
            //         </Text>
            //     )}
            // </View>
            <ImageBackground source={require('../assets/images/SignUpBkGrnd.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}>
                <StatusBar barStyle="dark-content" hidden={true} backgroundColor="rgba(255,255,255,1)" translucent={true} />
                <View style={{ height: height * .4, marginLeft: width * .05, paddingTop: height * .1 }}>
                    <Text style={[styles.TitleText, { color: 'rgba(255,255,255,1)' }]} >Sign Up</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => this.GoogleSignin()}
                        style={[styles.roundButton, { justifyContent: 'flex-start', paddingLeft: width * .05, backgroundColor: '#343434', }]}>
                        <Icon name='google' size={30} type='material-community' color='rgba(255,255,255,1)' />
                        <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)', fontSize: 13, paddingLeft: width * .1 }]} >CONTINUE WITH GOOGLE</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UserReg')} style={[styles.roundButton, { justifyContent: 'flex-start', paddingLeft: width * .05, borderWidth: 2, borderColor: '#FDC500', }]}>
                        <Icon name='email' size={30} type='material' color='#343434' />
                        <Text style={[styles.TextiputHeader, { color: '#343434', fontSize: 13, paddingLeft: width * .1 }]} >CONTINUE WITH EMAIL</Text>
                    </TouchableOpacity>

                </View>
                {/* <GoogleSigninButton
                                style={styles.signInButton}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={() => signIn()}
                            /> */}
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    {/* <View style={{ margin: 20, width: width * 0.15, height: width * 0.15, borderWidth: 2, borderColor: '#343434', borderRadius: width * .075, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon name='facebook' size={30} type='fontisto' color='#343434' />
                                </View> */}
                    <TouchableOpacity
                        // onPress={() => {
                        //     this.loginWithFacebook(navigate);
                        //     // this.props.navigation.navigate('Home')
                        // }}
                        onPress={onPressButton}
                        style={{ margin: 20, width: width * 0.15, height: width * 0.15, borderWidth: 1, borderColor: '#343434', borderRadius: width * .075, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='facebook' size={30} type='fontisto' color='#343434' />
                    </TouchableOpacity>
                    <View style={{ margin: 20, width: width * 0.15, height: width * 0.15, borderWidth: 2, borderColor: '#343434', borderRadius: width * .075, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='google-plus' size={40} type='material-community' color='#343434' />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'baseline', flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Montserrat-Regular', color: 'rgba(0,0,0,.7)', fontSize: 14 }} >Already Have an Account?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: 'rgba(255,255,255,1)', fontSize: 17 }} > SignIn</Text>
                    </TouchableOpacity>

                </View>
                {/* {this.state.username&& (
                    <Text style={{ fontSize: 16, marginVertical: 16 }}>
                        Logged in As {this.state.username}
                    </Text>
                )} */}
            </ImageBackground>
        );
    }
}
