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
  ProgressBarAndroid
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-community/async-storage';

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
import {createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {Icon} from 'react-native-elements';
import { createBottomTabNavigator, createMaterialTopTabNavigator  } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './pages/styles';


import home from'./pages/home';
import categories from'./pages/categories';
import login from'./pages/login';
import petDetails from'./pages/petDetails';
import itemList from'./pages/itemList';
import createAccount from'./pages/createAccount';
import registration from'./pages/registration';
import doctorAppoinment from'./pages/doctorAppoinment';
import bookingConfirm from'./pages/bookingConfirm';
import store from'./pages/store';
import productList from'./pages/productList';
import cartPage from'./pages/cartPage';




const { width, height } = Dimensions.get('window')

const DrawerContent = (props) => (
  <View>
      <View
        style={{
          height: height*.2,
          justifyContent: 'center',
          padding: width*.05,
          backgroundColor:'#f5c711'
        }}
      >
        <View style={{ height:height*0.1, flexDirection:'row', alignItems:'center'}} >
          <TouchableOpacity onPress={() => { props.navigation.toggleDrawer(); }}>
            <Icon name='chevron-left' size={50} type='material-community' color='rgba(255,255,255,1)' />
          </TouchableOpacity>
          <Image source={require('./images/NameLogo.png')} style={{width:width*.5, height:height*.1, marginBottom:height*.01, marginTop:height*.01,resizeMode: 'stretch'}} />
          <View style={{marginLeft:width*.05 }}>
          </View>      
        </View>
      </View>
      <DrawerItems {...props} />
      <View>
        <View style={{ borderTopWidth:1,borderTopColor:'rgba(0,0,0,0.5)'}}>
          <Text style={{fontSize:20, fontFamily:'Montserrat-Regular', color:'black', marginLeft:width*0.05, paddingTop:width*0.05}}>Contact With Us</Text> 
          <View style={{justifyContent:'center', flexDirection:'row'}}>
            <View style={{margin:20, width:width*0.1, height:width*0.1, borderWidth:1, borderColor:'#FDC500', borderRadius:width*.05, alignItems:'center', justifyContent:'center'}}>
                <Icon name='facebook' size={25} type='fontisto' color='#FDC500' />
            </View>
            <View style={{margin:20, width:width*0.1, height:width*0.1, borderWidth:1, borderColor:'#FDC500', borderRadius:width*.05, alignItems:'center', justifyContent:'center'}}>
                <Icon name='google' size={25} type='fontisto' color='#FDC500' />
            </View>
            <View style={{margin:20, width:width*0.1, height:width*0.1, borderWidth:1, borderColor:'#FDC500', borderRadius:width*.05, alignItems:'center', justifyContent:'center'}}>
                <Icon name='instagram' size={25} type='fontisto' color='#FDC500' />
            </View>
            <View style={{margin:20, width:width*0.1, height:width*0.1, borderWidth:1, borderColor:'#FDC500', borderRadius:width*.05, alignItems:'center', justifyContent:'center'}}>
                <Icon name='instagram' size={25} type='fontisto' color='#FDC500' />
            </View>
          </View> 
          <View style={{flexDirection:'row',marginLeft:width*0.05}}>
              <Icon name='logout' size={30} type='material-community' color='rgba(0,0,0,1)' />
              <Text style={{fontSize:20, fontFamily:'Montserrat-Medium', color:'black', marginLeft:width*0.05}}>Logout</Text> 
            </View>       
        </View>
        <View style={{backgroundColor:'rgba(0,0,0,0.7)', height:height*.1, marginTop:height*.03, alignItems:'center'}}>
          <Text style={{fontSize:15, fontFamily:'Montserrat-Medium', color:'rgba(255,255,255,0.3)', marginLeft:width*0.05, paddingTop:10}}>MIMIANDBOWBOW</Text>
        </View>
      </View>
   </View>
)


class App extends React.Component {

  constructor(){
    super();
    this.state={
      isVisible : true,
    }
  }
  static navigationOptions = {
     headerShown: false
  };
  Hide_Splash_Screen=()=>{
    this.setState({ 
      isVisible : false 
    });
    
    this.retrieveData()
  }
  async retrieveData(){
    try {    
      
      const token = await AsyncStorage.getItem('token');
      
      if (token !== null ) {
          const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        this.props.navigation.dispatch(resetAction);
      }
      else
        this.props.navigation.push('Registration')
        //this.props.navigation.push('Home')
    } catch (error){

    } 
  }
  componentDidMount() {
   var that = this;
    setTimeout(function(){
      that.Hide_Splash_Screen();
    }, 2000); 
  }
//    componentWillUnmount() {
//         this.onTokenRefreshListener();
//         this.messageListener();
//    }

  render() {
  
    return (

      <ImageBackground source={require('./images/splash.png')} style={{width: '100%', height: '100%',  resizeMode: 'stretch'}}>
        <StatusBar barStyle = "dark-content" hidden = {true} backgroundColor = "rgba(255,255,255,1)" translucent = {true}/>
        <View style={{flex: 1, justifyContent:'flex-end', width:width*.6, marginLeft:width*.2}}>

        <ProgressBarAndroid styleAttr="Horizontal" color="#343434"/>
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

// const TabNavigator = createBottomTabNavigator(
//   {
//     Home: {
//       screen: home,
//       navigationOptions: {
//           tabBarLabel:'Home',
//           tabBarIcon:
//               <Icon name='home' size={30} type='material-community' color='#FDC500' />
//         },
//     },
//     PetDetails: {
//       screen: petDetails,
//       navigationOptions: {
//           tabBarLabel:'Pet List',
//           tabBarIcon:
//               <Icon name='shopping-basket' size={30} type='material' color='#FDC500' />
//         },
//     },
//     appoinment: {
//       screen: petDetails,
//       navigationOptions: {
//           tabBarLabel:'Appoinment',
//           tabBarIcon:
//               <Icon name='event' size={30} type='material' color='#FDC500' />
//         },
//     },
//     event: {
//       screen: petDetails,
//       navigationOptions: {
//           tabBarLabel:'Store',
//           tabBarIcon:
//               <Icon name='location-on' size={30} type='material' color='#FDC500' />
//         },
//     },
//     doctor: {
//       screen: petDetails,
//       navigationOptions: {
//           tabBarLabel:'Doctor',
//           tabBarIcon:
//               <Icon name='hospital-box' size={30} type='material-community'      color='#FDC500' />
//         },
//     },
//   },
//   {
//     tabBarOptions: {
//       activeTintColor:'white',
//       showLabel:false,
//       labelStyle: {
//         fontSize: 20,
//       },
//       style: {
//         backgroundColor: 'rgba(0,0,0,0.7)',
//         borderTopLeftRadius:20,
//         borderTopRightRadius:20,
//         padding:10,
//         paddingLeft:30,
//         height:height*0.09,
//       },
//     },
//   }
// );

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: home },
    Shopping: { screen: productList },
    Appoinment: { screen: petDetails },
    Store: { screen: store },
    Doctor: { screen: doctorAppoinment },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '-sharp' : '-outline'}`;
        } else if (routeName === 'Shopping') {
          iconName = `md-basket${focused ? '-sharp' : '-outline'}`;
        }
        else if (routeName === 'Appoinment') {
          iconName = `calendar${focused ? '-sharp' : '-outline'}`;
        }
        else if (routeName === 'Store') {
          iconName = `location${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Doctor') {
          iconName = `ios-medkit${focused ? '-sharp' : '-outline'}`;
        }
        //return <IconComponent name={iconName} size={30} color={tintColor} />;
        return <View style={{margin:20, width:width*0.1, height:width*0.1, borderWidth:1, borderColor:'#FDC500', borderRadius:width*.05, alignItems:'center', justifyContent:'center'}}>
          <IconComponent name={iconName} size={25} color={tintColor}/>
        </View>
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FDC500',
      inactiveTintColor: 'rgba(255,255,255,0.7)',
      showLabel:false,
      style: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        padding:10,
        paddingLeft:30,
        height:height*0.09,
      },
    },
    
  }
);

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
        title: `Home`,
        tabBarLabel:"Dashboard",
        drawerIcon: () => (
          <Icon name='home' size={25} type='material-community' color='rgba(0,0,0,1)' />
          
              )
      },
  },
  Media: {
    screen: petDetails,
    navigationOptions: {
        tabBarLabel:"Media",
        drawerIcon: () => (
          <Icon name='folder' size={25} type='material-community' color='rgba(0,0,0,1)' />
              )
      },
  },
  Shop: {
    screen: productList,
    navigationOptions: {
        tabBarLabel:"Shop",
        drawerIcon: () => (
          <Icon name='shopping-basket' size={25} type='material' color='rgba(0,0,0,1)' />
              )
      },
  },
  Event: {
    screen: petDetails,
    navigationOptions: {
        tabBarLabel:"Event",
        drawerIcon: () => (
          <Icon name='event' size={25} type='material' color='rgba(0,0,0,1)' />
              )
      },
  },
  Hostel: {
    screen: petDetails,
    navigationOptions: {
        tabBarLabel:"Hostel",
        drawerIcon: () => (
          <Icon name='location-on' size={25} type='material' color='rgba(0,0,0,1)' />
              )
      },
  },
  Doctor: {
    screen: doctorAppoinment,
    navigationOptions: {
        tabBarLabel:"Doctor",
        drawerIcon: () => (
          <Icon name='hospital-box' size={25} type='material-community' color='rgba(0,0,0,1)' />
              )
      },
  },    
},
{
  contentComponent: DrawerContent,
  drawerPosition: 'left',
        drawerWidth: width*.8,
        contentOptions: {
          activeTintColor :'rgba(0,0,0,1)',
          inactiveTintColor :'rgba(0,0,0,.8)',
        },
        
          drawerBackgroundColor : 'rgba(255,255,255,1)',   
  })

const MainNavigator = createStackNavigator({
  App: {screen: App,  headerShown: false},
  Home: {screen: MyDrawerNavigator},
  Login: {screen: login},
  Categories: {screen: categories},
  PetDetails: {screen: petDetails},
  ItemList: {screen: itemList},
  Registration: {screen: registration},
  CreateAccount: {screen: createAccount},
  DoctorAppoinment: {screen: doctorAppoinment},
  BookingConfirm: {screen: bookingConfirm},
  Store: {screen: store},
  ProductList: {screen: productList},
  CartPage: {screen: cartPage},
},
{ headerMode:'none'}
);

const App1 = createAppContainer(MainNavigator);

export default App1;