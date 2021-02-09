import React, { Component } from 'react';
import { ImageBackground, StatusBar, View, Dimensions } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import AsyncStorage from '@react-native-community/async-storage';
const { width, height } = Dimensions.get('window')
export default class Splash extends Component {
    constructor() {
        super();
        this.state = {
            isVisible: true, user: ''
        }
    }
    Hide_Splash_Screen = () => {
        this.setState({
            isVisible: false
        });
    }
    async componentDidMount() {
        var that = this;
        const data = await AsyncStorage.getItem('loginDetails');
        console.log(data)
        AsyncStorage.getItem('user').then((value) => this.setState({ 'user': value }))
        if (data == null) {
            this.props.navigation.push('Registration')
        }
        else {
            this.props.navigation.push('Home');
        }
        setTimeout(function () {
            that.Hide_Splash_Screen();
        }, 3000);
    }
    //    componentWillUnmount() {
    //         this.onTokenRefreshListener();
    //         this.messageListener();
    //    }
    render() {
        return (
            <ImageBackground source={require('../assets/images//splash.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}>
                <StatusBar barStyle="dark-content" hidden={true} backgroundColor="rgba(255,255,255,1)" translucent={true} />
                <View style={{ flex: 1, justifyContent: 'flex-end', width: width * .6, marginLeft: width * .2 }}>
                    <ProgressBar styleAttr="Horizontal" color="#FDC500" />
                </View>
            </ImageBackground>

        );
    }
};