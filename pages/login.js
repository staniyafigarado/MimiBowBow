import React from 'react';
import { Text, View, Dimensions, Image, TextInput, ImageBackground, Alert, } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import WooCommerce from './wooApi';


const { width, height } = Dimensions.get('window')

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: 'sreejith7482@gmail.com',
            password: '',
        };
    }
    state = {
        nameList: []
    }
    userLogin = () => {

        // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // if(this.state.emailId != '' || reg.test(this.state.emailId) === true){
        //     const {emailId} = this.state;
        //     const {password} = this.state;
        //     var FormData = require('form-data');
        //     var data = new FormData();
        //     data.append('username', 'sreejith7482@gmail.com');
        //     data.append('password', 'orgRfIzWHCP1');

        //     fetch('https://mimiandbowbow.com/test/api/auth/generate_auth_cookie/?username=sreejith7482@gmail.com&password=orgRfIzWHCP1', {
        //         method: 'GET',

        //       }).then((response) => response.json())
        //       .then((responseJson) => {
        //          console.log(responseJson);

        //       })
        //       .catch((error) => {
        //          console.error(error);
        //       });
        // }
        // else{
        //     Alert.alert("Alert", "Please enter a valid mail ID");
        // }
    }
    gotoHome = async (response) => {
        try {

            console.log(response.data)
            await AsyncStorage.setItem('userData', JSON.stringify(response.data));

            // this.props.navigation.push('Home')
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            this.props.navigation.dispatch(resetAction);

        } catch (error) {
            Alert.alert("Alert", "An account is already registered with your email address. Please log in.");
            console.log(error)
        }
    }
    render() {
        return (
            <ImageBackground source={require('../images/SignUpBkGrnd.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}>
                <View style={{ height: height * .4, marginLeft: width * .05, paddingTop: height * .1 }}>
                    <Text style={[styles.TitleText, { color: 'rgba(255,255,255,1)' }]} >Sign In</Text>
                </View>
                <View style={{ alignItems: 'center', paddingTop: height * .04 }}>
                    <View style={styles.textInputLogin}>
                        <TextInput style={styles.textinputText}
                            placeholder="Email Address"
                            keyboardType='email-address'
                            returnKeyType={"next"}
                            onChangeText={emailId => this.setState({ emailId })}
                        />
                    </View>
                    <View style={styles.textInputLogin}>
                        <TextInput style={styles.textinputText}
                            placeholder="Password"
                            keyboardType='email-address'
                            returnKeyType={"next"}
                            onChangeText={password => this.setState({ password })}
                        />
                    </View>
                </View>

                {/* <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.userLogin()} style={[styles.textInputLogin, { alignItems: 'center', backgroundColor: '#343434', borderWidth: 0 }]}>
                        <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]} >CONTINUE</Text>
                    </TouchableOpacity>

                </View> */}
                {/* staniya new view */}
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={[styles.textInputLogin, { alignItems: 'center', backgroundColor: '#343434', borderWidth: 0 }]}>
                        <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]} >CONTINUE</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <View style={{ margin: 20, width: width * 0.15, height: width * 0.15, borderWidth: 1, borderColor: '#343434', borderRadius: width * .075, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='facebook' size={30} type='fontisto' color='#343434' />
                    </View>
                    <View style={{ margin: 20, width: width * 0.15, height: width * 0.15, borderWidth: 1, borderColor: '#343434', borderRadius: width * .075, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='google-plus' size={40} type='material-community' color='#343434' />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}