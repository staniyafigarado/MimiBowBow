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

        // this.retrieveData()
    }
    // async retrieveData() {
    //     try {
    //         AsyncStorage.getItem('user_id').then((value) =>
    //         navigation.replace(
    //           value === null ? 'Auth' : 'DrawerNavigationRoutes'
    //         ),
    //       );
    //         const userData = await AsyncStorage.getItem('user_id');

    //         if (userData !== null) {
    //             this.props.navigation.push('Home')
    //         }
    //         else
    //             this.props.navigation.push('Registration')
    //         //this.props.navigation.push('Home')
    //     } catch (error) {

    //     }
    // }
    async componentDidMount() {
        var that = this;
        const userData = await AsyncStorage.getItem('user_id');
        AsyncStorage.getItem('user').then((value) => this.setState({ 'user': value }))
        if (userData == null) {
            this.props.navigation.push('Registration')
        }

        else if (this.state.user == null) {
            this.props.navigation.push('Registration')
        }
        else {
            this.props.navigation.push('Home');
        }
        //this.props.navigation.push('Home')
        // AsyncStorage.getItem('user_id').then((value) =>
        //     navigation.replace(
        //         value === null ? 'Registration' : 'Home'
        //     ),
        // );
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

                    <ProgressBar styleAttr="Horizontal" color="#343434" />
                    {/* <PacmanIndicator
        count={5}
        color='#FDC500'
        animationDuration={600}
        size={100}
      />  */}
                </View>
            </ImageBackground>

        );
    }
};