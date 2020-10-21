import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-community/async-storage';
import { ProgressBar } from '@react-native-community/progress-bar-android';

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
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/styles';

import home from '../screens/home';
import categories from '../screens/categories';
import login from '../screens/login';
import petDetails from '../screens/petDetails';
import itemList from '../screens/itemList';
import createAccount from '../screens/createAccount';
import registration from '../screens/registration';
import doctorAppoinment from '../screens/doctorAppoinment';
import bookingConfirm from '../screens/bookingConfirm';
import store from '../screens/store';
import productList from '../screens/productList';
import cartPage from '../screens/cartPage';
import myAccount from '../screens/myAccount';
import myProfile from '../screens/myProfile';
import orderListing from '../screens/orderListing';
import billingAddress from '../screens/billingAddress';
import cartBillingAddress from '../screens/cartBillingAddress';
import orderDetails from '../screens/orderDetails';
import productReview from '../screens/productReview';
import paymentDetails from '../screens/paymentDetails';
import orderSuccess from '../screens/orderSuccess';
import logOut from '../screens/logOut';
import doctorsList from '../screens/doctorsList';
import doctorDetails from '../screens/doctorDetails';
import userReg from '../screens/userReg';




const { width, height } = Dimensions.get('window')

const DrawerContent = (props) => (
    <View style={{ height: '100%' }}>
        <View
            style={{
                height: '20%',
                justifyContent: 'center',
                padding: width * .05,
                backgroundColor: '#f5c711'
            }} >
            <View style={{ height: height * 0.09, flexDirection: 'row', alignItems: 'center' }} >
                <TouchableOpacity onPress={() => { props.navigation.toggleDrawer(); }}>
                    <Icon name='chevron-left' size={50} type='material-community' color='rgba(255,255,255,1)' />
                </TouchableOpacity>
                <Image source={require('../assets/images/NameLogo.png')} style={{ width: width * .5, height: height * .1, marginBottom: height * .01, marginTop: height * .01, resizeMode: 'stretch' }} />
            </View>
        </View>
        <View style={{ height: '55%' }}>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>

        </View>

        <View style={{ height: '25%' }}>
            <View style={{ borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.5)', height: '85%' }}>
                <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Regular', color: 'black', marginLeft: width * 0.05, paddingTop: 5, height: '22%' }}>Contact With Us</Text>
                <View style={{ justifyContent: 'center', flexDirection: 'row', height: '50%' }}>
                    <View style={{ margin: 20, width: width * 0.1, height: width * 0.1, borderWidth: 1, borderColor: '#FDC500', borderRadius: width * .05, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='facebook' size={25} type='fontisto' color='#FDC500' />
                    </View>
                    <View style={{ margin: 20, width: width * 0.1, height: width * 0.1, borderWidth: 1, borderColor: '#FDC500', borderRadius: width * .05, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='google' size={25} type='fontisto' color='#FDC500' />
                    </View>
                    <View style={{ margin: 20, width: width * 0.1, height: width * 0.1, borderWidth: 1, borderColor: '#FDC500', borderRadius: width * .05, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='instagram' size={25} type='fontisto' color='#FDC500' />
                    </View>
                    <View style={{ margin: 20, width: width * 0.1, height: width * 0.1, borderWidth: 1, borderColor: '#FDC500', borderRadius: width * .05, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='instagram' size={25} type='fontisto' color='#FDC500' />
                    </View>
                </View>
                <TouchableOpacity onPress={() => { props.navigation.navigate('LogOut') }} style={{ flexDirection: 'row', marginLeft: width * 0.05, height: '28%' }}>
                    <Icon name='logout' size={30} type='material-community' color='rgba(0,0,0,1)' />
                    <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Medium', color: 'black', marginLeft: width * 0.05 }}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', height: '15%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Medium', color: 'rgba(255,255,255,0.3)', marginLeft: width * 0.05 }}>MIMIANDBOWBOW</Text>
            </View>
        </View>
    </View>
)


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            isVisible: true,
        }
    }
    static navigationOptions = {
        headerShown: false
    };
    Hide_Splash_Screen = () => {
        this.setState({
            isVisible: false
        });

        this.retrieveData()
    }
    async retrieveData() {
        try {

            const userData = await AsyncStorage.getItem('userData');

            if (userData !== null) {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                });
                this.props.navigation.dispatch(resetAction);
            }
            else
                this.props.navigation.push('Registration')
            //this.props.navigation.push('Home')
        } catch (error) {

        }
    }
    componentDidMount() {
        var that = this;
        setTimeout(function () {
            that.Hide_Splash_Screen();
        }, 2000);
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

const TabNavigator = createBottomTabNavigator(
    {

        Shopping: {
            screen: productList,
            navigationOptions: {
                tabBarLabel: 'Pet List',
                tabBarIcon: ({ focused }) => (
                    focused
                        ? <Icon name='shopping-basket' size={30} type='material' color='#343434' style={{ padding: 7, borderRadius: 25, backgroundColor: '#FDC500' }} />
                        : <Icon name='shopping-basket' size={30} type='material' color='#FDC500' />
                )
            },
        },
        Appoinment: {
            screen: store,
            navigationOptions: {
                tabBarLabel: 'Appoinment',
                tabBarIcon: ({ focused }) => (
                    focused
                        ? <Icon name='event' size={30} type='material' color='#343434' style={{ padding: 7, borderRadius: 25, backgroundColor: '#FDC500' }} />
                        : <Icon name='event' size={30} type='material' color='#FDC500' />
                )
            },
        },
        Home: {
            screen: home,
            navigationOptions: {
                tabBarLabel: 'Home',
                // tabBarIcon:
                //     <Icon name='home' size={30} type='material-community' color='#FDC500' />,
                tabBarIcon: ({ focused }) => (
                    focused
                        ? <Icon name='home' size={30} type='material' color='#343434' style={{ padding: 7, borderRadius: 25, backgroundColor: '#FDC500' }} />
                        : <Icon name='home' size={30} type='material' color='#FDC500' />
                )
            },
        },
        Store: {
            screen: store,
            navigationOptions: {
                tabBarLabel: 'Store',
                tabBarIcon: ({ focused }) => (
                    focused
                        ? <Icon name='location-on' size={30} type='material' color='#343434' style={{ padding: 7, borderRadius: 25, backgroundColor: '#FDC500' }} />
                        : <Icon name='location-on' size={30} type='material' color='#FDC500' />
                )
            },
        },
        Doctor: {
            screen: doctorsList,
            navigationOptions: {
                tabBarLabel: 'Doctor',
                tabBarIcon: ({ focused }) => (
                    focused
                        ? <Icon name='local-hospital' size={30} type='material' color='#343434' style={{ padding: 7, borderRadius: 25, backgroundColor: '#FDC500' }} />
                        : <Icon name='local-hospital' size={30} type='material' color='#FDC500' />
                )
            },
        },
    },

    {
        initialRouteName: 'Home',
        tabBarOptions: {
            activeTintColor: 'white',
            showLabel: false,
            labelStyle: {
                fontSize: 20,
            },
            style: {
                // backgroundColor: 'rgba(0,0,0,0.7)',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                height: height * 0.09,
                position: 'absolute',
                backgroundColor: '#343434', justifyContent: 'center', alignItems: 'center'
            },
        },
    }
);

// const TabNavigator = createBottomTabNavigator(
//     {
//         Home: { screen: home },
//         Shopping: { screen: productList },
//         Appoinment: { screen: store },
//         Store: { screen: store },
//         Doctor: { screen: doctorsList },
//     },
//     {
//         defaultNavigationOptions: ({ navigation }) => ({
//             tabBarIcon: ({ focused, horizontal, tintColor }) => {
//                 const { routeName } = navigation.state;
//                 let IconComponent = Ionicons;
//                 let iconName;
//                 if (routeName === 'Home') {
//                     iconName = `ios-home${focused ? '-sharp' : '-outline'}`;
//                 } else if (routeName === 'Shopping') {
//                     iconName = `md-basket${focused ? '-sharp' : '-outline'}`;
//                 }
//                 else if (routeName === 'Appoinment') {
//                     iconName = `calendar${focused ? '-sharp' : '-outline'}`;
//                 }
//                 else if (routeName === 'Store') {
//                     iconName = `location${focused ? '' : '-outline'}`;
//                 }
//                 else if (routeName === 'Doctor') {
//                     iconName = `ios-medkit${focused ? '-sharp' : '-outline'}`;
//                 }
//                 //return <IconComponent name={iconName} size={30} color={tintColor} />;
//                 return <View style={{ margin: 20, width: width * 0.1, height: width * 0.1, borderWidth: 1, borderColor: '#FDC500', borderRadius: width * .05, alignItems: 'center', justifyContent: 'center' }}>
//                     <IconComponent name={iconName} size={25} color={tintColor} />
//                 </View>
//             },
//         }),
//         tabBarOptions: {
//             activeTintColor: '#FDC500',
//             inactiveTintColor: 'rgba(255,255,255,0.7)',
//             showLabel: false,
//             style: {
//                 // backgroundColor: 'rgba(0,0,0,0.7)',
//                 borderTopLeftRadius: 20,
//                 borderTopRightRadius: 20,
//                 padding: 10,
//                 height: height * 0.09,
//                 position: 'absolute',
//                 backgroundColor: '#343434', justifyContent: 'center', alignItems: 'center'
//             },
//         },

//     }
// );

const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: TabNavigator,
        navigationOptions: {
            title: `Home`,
            drawerLabel: "Home",
            drawerIcon: () => (
                <Icon name='home' size={25} type='material-community' color='rgba(0,0,0,1)' />

            )
        },
    },
    Media: {
        screen: store,
        navigationOptions: {
            drawerLabel: "Media",
            drawerIcon: () => (
                <Icon name='folder' size={25} type='material-community' color='rgba(0,0,0,1)' />
            )
        },
    },
    Shop: {
        screen: productList,
        navigationOptions: {
            drawerLabel: "Shop",
            drawerIcon: () => (
                <Icon name='shopping-basket' size={25} type='material' color='rgba(0,0,0,1)' />
            )
        },
    },
    Event: {
        screen: store,
        navigationOptions: {
            drawerLabel: "Event",
            drawerIcon: () => (
                <Icon name='event' size={25} type='material' color='rgba(0,0,0,1)' />
            )
        },
    },
    Hostel: {
        screen: store,
        navigationOptions: {
            drawerLabel: "Hostel",
            drawerIcon: () => (
                <Icon name='location-on' size={25} type='material' color='rgba(0,0,0,1)' />
            )
        },
    },
    Doctor: {
        screen: doctorsList,
        navigationOptions: {
            drawerLabel: "Doctor",
            drawerIcon: () => (
                <Icon name='hospital-box' size={25} type='material-community' color='rgba(0,0,0,1)' />
            )
        },
    },
    MyAccount: {
        screen: myAccount,
        navigationOptions: {
            drawerLabel: "My Account",
            drawerIcon: () => (
                <Icon name='user-circle' size={25} type='font-awesome-5' color='rgba(0,0,0,1)' />
            )
        },
    },
},
    {
        contentComponent: DrawerContent,
        drawerPosition: 'left',
        drawerWidth: width * .8,
        contentOptions: {
            activeTintColor: 'rgba(0,0,0,1)',
            inactiveTintColor: 'rgba(0,0,0,.8)',
            labelStyle: {
                fontFamily: 'Montserrat-Medium',
                fontSize: 16, fontWeight: 'normal'
            },
        },

        drawerBackgroundColor: 'rgba(255,255,255,1)',
    })

const MainNavigator = createStackNavigator({
    App: { screen: App, headerShown: false },
    Home: { screen: MyDrawerNavigator },
    Login: { screen: login },
    Categories: { screen: categories },
    PetDetails: { screen: petDetails },
    ItemList: { screen: itemList },
    Registration: { screen: registration },
    CreateAccount: { screen: createAccount },
    DoctorAppoinment: { screen: doctorAppoinment },
    BookingConfirm: { screen: bookingConfirm },
    Store: { screen: store },
    ProductList: { screen: productList },
    CartPage: { screen: cartPage },
    MyAccount: { screen: myAccount },
    MyProfile: { screen: myProfile },
    OrderListing: { screen: orderListing },
    BillingAddress: { screen: billingAddress },
    CartBillingAddress: { screen: cartBillingAddress },
    OrderDetails: { screen: orderDetails },
    ProductReview: { screen: productReview },
    PaymentDetails: { screen: paymentDetails },
    OrderSuccess: { screen: orderSuccess },
    LogOut: { screen: logOut },
    DoctorsList: { screen: doctorsList },
    DoctorDetails: { screen: doctorDetails },
    UserReg: { screen: userReg },
},
    { headerMode: 'none' }
);

const App1 = createAppContainer(MainNavigator);

export default App1;