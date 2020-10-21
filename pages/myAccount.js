import React from 'react';
import { Text, View, Dimensions, Image, BackHandler, FlatList } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from './styles';
import WooCommerce from './wooApi';
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

const DataArray = require("./categoryData"); 

const { width, height } = Dimensions.get('window')

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          listView: 1,
          isLoading: true,
          gridView : true,
          selectedCategory : ''
        };
    }
    componentDidMount = async() =>{
        const userData =(JSON.parse( await AsyncStorage.getItem('userData')));
        console.log(userData.id)
        WooCommerce.get('customers/'+(userData.id)).then(response => {
            console.log(response.data + "123");
            this.setState({
                dataSource: response.data,
                isLoading : false,
            });
        }).catch(error => {
            console.log(error + "123");
        });
        console.log(this.state.dataSource + "Hi")
        
    }
	render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor:'#f5c711'}}>
                    <PacmanIndicator
                        count={5}
                        color='black'
                        animationDuration={600}
                        size={100}
                    />
              </View>
            );
        }
        else{
            return (
                <View style={{ flex: 1, backgroundColor:'#f5c711'}}>
                <View style={{flexDirection:'row', height:height*.1, alignItems:'center', justifyContent:'space-between', margin:width*.05}}>
                    <TouchableOpacity 
                    //onPress={() => { this.props.navigation.toggleDrawer(); }}
                    >
                        <Icon name='menu' size={40} type='material-icons' color='#343434'/>
                    </TouchableOpacity>
                    <Image
                    source={require('../images/logo.png')}
                    style={{ width: height*.07, height: height*.07}}
                    />  
                    <Text style={{fontFamily:'Montserrat-Regular', fontSize:17}}>
                    Mimi and Bow Bow
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')}>
                        <Icon name='cart' size={40} type='material-community' color='#343434' />
                    </TouchableOpacity>
                </View>
                <View style={[styles.textInput,{marginLeft:width*.05, borderWidth:0, marginBottom:3, elevation:5}]}>
                    <SearchBar
                        //ref="searchBar"
                        placeholder="Search Here"
                        //onChangeText={...}
                        //onSearchButtonPress={...}
                        //onCancelButtonPress={...}
                        />
                </View>
                <View style={{height: height*.3, alignItems:'center', justifyContent:'space-evenly'}}>
                    <Image
                        source={require('../images/user.jpg')}
                        style={{height:height*.17, width:height*.17, borderRadius:height*.085}}
                        />
                    <Text style={{fontFamily:'Montserrat-medium', fontSize:18}}>
                    {this.state.dataSource.username}
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='camera' size={20} type='material-community' color='#343434' />
                        <Text style={{fontFamily:'Montserrat-Regular', fontSize:12, paddingLeft:10}}>
                        Change Profile Picture
                        </Text>
                    </View>
                </View>
                <View style={{height:height*.5, backgroundColor:'#fff', borderTopStartRadius:40, borderTopEndRadius:40, padding: height*.05, justifyContent:'space-evenly'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyProfile')}  style={{flexDirection:'row', paddingLeft: width*.05, paddingBottom:height*.05}}>
                        <Icon name='user-circle' size={20} type='font-awesome-5' color='rgba(0,0,0,1)' />
                        <Text style={{fontFamily:'Montserrat-SemiBold', fontSize:15, paddingLeft:20}}>
                        My Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderListing')} style={{flexDirection:'row', paddingLeft: width*.05, paddingBottom:height*.05}}>
                        <Icon name='cart' size={20} type='material-community' color='#343434' />
                        <Text style={{fontFamily:'Montserrat-SemiBold', fontSize:15, paddingLeft:20}}>
                        My Orders
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('BillingAddress')} style={{flexDirection:'row', paddingLeft: width*.05, paddingBottom:height*.05}}>
                        <Icon name='address-card' size={20} type='font-awesome-5' color='rgba(0,0,0,1)' />
                        <Text style={{fontFamily:'Montserrat-SemiBold', fontSize:15, paddingLeft:20}}>
                        Billing Address
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('LogOut') }} style={{flexDirection:'row', paddingLeft: width*.05, paddingBottom:height*.05}}>
                        <Icon name='logout' size={20} type='material-community' color='rgba(0,0,0,1)' />
                        <Text style={{fontFamily:'Montserrat-SemiBold', fontSize:15, paddingLeft:20}}>
                        Logout
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
            );
        }
    }
}