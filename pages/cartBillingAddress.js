import React from 'react';
import { Text, View, Dimensions, Image, BackHandler, FlatList, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Icon, CheckBox } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import WooCommerce from './wooApi';
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
          isLoading: true,
          editStatus:0,
          firstName:'',
          lastName:'',
          companyName:'',
          addressLine1:'',
          addressLine2:'',
          cityName:'',
          stateName:'',
          countryName:'',
          postCode:'',
          emailId:'',
          phoneNumber:'',
          shippingfirstName:'',
          shippinglastName:'',
          shippingcompanyName:'',
          shippingaddressLine1:'',
          shippingaddressLine2:'',
          shippingcityName:'',
          shippingstateName:'',
          shippingcountryName:'',
          shippingpostCode:'',
          checked: true,
        };
    }
    componentDidMount = async() =>{
        const userData =(JSON.parse( await AsyncStorage.getItem('userData')));
        WooCommerce.get('customers/'+(userData.id)).then(response => {
            this.setState({
                dataSource: response.data,
                isLoading : false,
                firstName:response.data.billing.first_name,
                lastName:response.data.billing.last_name,
                companyName:response.data.billing.company,
                addressLine1:response.data.billing.address_1,
                addressLine2:response.data.billing.address_2,
                cityName:response.data.billing.city,
                stateName:response.data.billing.state,
                countryName:response.data.billing.country,
                postCode:response.data.billing.postcode,
                emailId:response.data.billing.email,
                phoneNumber:response.data.billing.phone,
                shippingfirstName:response.data.billing.first_name,
                shippinglastName:response.data.billing.last_name,
                shippingcompanyName:response.data.billing.company,
                shippingaddressLine1:response.data.billing.address_1,
                shippingaddressLine2:response.data.billing.address_2,
                shippingcityName:response.data.billing.city,
                shippingstateName:response.data.billing.state,
                shippingcountryName:response.data.billing.country,
                shippingpostCode:response.data.billing.postcode,
            });
        }).catch(error => {
            console.log(error + "123");
        });        
    }
    editStatusFun = (value) =>{
        this.setState({
            editStatus:value
        });
    }

    userCheck = () => {
        
        if(this.state.checked == false){
            console.log(this.state.shippingpostCode)
            const pin = /^\d{6}$/;
            if(pin.test(this.state.shippingpostCode) === false){
                Alert.alert("Alert", "Invalid PostCode");
            }
        }        
    }
    // userValidation = () => {
    //     console.log(this.state.shippinglastName)
    //     const pin = /^\d{6}$/;
    //     if(this.state.emailId != ''){
    //         if(this.state.shippingfirstName == ''){
    //             Alert.alert("Alert", "Must need First name");
    //         }
    //         else if(this.state.shippingaddressLine1 == ''){            
    //             Alert.alert("Alert", "Must need Address");          
    //         }
    //         else if(pin.test(this.state.shippingpostCode) === false){
    //             Alert.alert("Alert", "Invalid PostCode");
    //         }
    //     }
        
        
    //     // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     // if (reg.test(this.state.emailId) === true)
    //     // {
    //     //     this.upadateAddress()
    //     // }
    //     // else{
    //     //     Alert.alert("Alert", "invalid Mail ID");
    //     // }
    // }

    upadateAddress = async() =>{
        const userData =(JSON.parse( await AsyncStorage.getItem('userData')));
        if(this.state.checked == true){
            const pin = /^\d{6}$/;
            if(pin.test(this.state.postCode) === false){
                Alert.alert("Alert", "Invalid PostCode");
            }
            else{
                const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if(reg.test(this.state.emailId) === false){
                    Alert.alert("Alert", "Invalid Email");
                }
                else{
                    const PhonecCheck = /^\d{10}$/;
                    if(PhonecCheck.test(this.state.phoneNumber) === false){
                        Alert.alert("Alert", "Invalid Phone Number");
                    }
                    else{
                        WooCommerce.put('customers/'+(userData.id), {
                            billing:{
                                first_name: this.state.firstName,
                                last_name: this.state.lastName,
                                company: this.state.companyName,
                                address_1: this.state.addressLine1,
                                address_2: this.state.addressLine2,
                                city: this.state.cityName,
                                postcode: this.state.postCode,
                                country: this.state.countryName,
                                state: this.state.stateName,
                                email:this.state.emailId,
                                phone:this.state.phoneNumber
                            } 
                        }).then(response => {
                            console.log(response);
                        }).catch(error => {
                            console.log(error+"456");
                        });
                        WooCommerce.put('customers/'+(userData.id), {
                                shipping: {
                                    first_name: this.state.firstName,
                                    last_name: this.state.lastName,
                                    company: this.state.companyName,
                                    address_1: this.state.addressLine1,
                                    address_2: this.state.addressLine2,
                                    city: this.state.cityName,
                                    postcode: this.state.postCode,
                                    country: this.state.countryName,
                                    state: this.state.stateName,
                                }  
                            }).then(response => {
                                console.log(response);
                                Alert.alert("Information", "Updated Successfully");
                                this.props.navigation.navigate('PaymentDetails')
                            }).catch(error => {
                                console.log(error+"456");
                            });
                    }
                }
            }
        }
        else{
            const pin = /^\d{6}$/;
            if(pin.test(this.state.postCode) === false ||pin.test(this.state.shippingpostCode) === false){
                Alert.alert("Alert", "Invalid PostCode");
            }
            else{
                const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if(reg.test(this.state.emailId) === false ){
                    Alert.alert("Alert", "Invalid Email");
                }
                else{
                    const PhonecCheck = /^\d{10}$/;
                    if(PhonecCheck.test(this.state.phoneNumber) === false){
                        Alert.alert("Alert", "Invalid Phone Number");
                    }
                    else{
                        WooCommerce.put('customers/'+3, {
                            billing:{
                                first_name: this.state.firstName,
                                last_name: this.state.lastName,
                                company: this.state.companyName,
                                address_1: this.state.addressLine1,
                                address_2: this.state.addressLine2,
                                city: this.state.cityName,
                                postcode: this.state.postCode,
                                country: this.state.countryName,
                                state: this.state.stateName,
                                email:this.state.emailId,
                                phone:this.state.phoneNo
                            } 
                        }).then(response => {
                            console.log(response);
                        }).catch(error => {
                            console.log(error+"456");
                        });
                        WooCommerce.put('customers/'+3, {
                                shipping: {
                                    first_name: this.state.shippingfirstName,
                                    last_name: this.state.shippinglastName,
                                    company: this.state.shippingcompanyName,
                                    address_1: this.state.shippingaddressLine1,
                                    address_2: this.state.shippingaddressLine2,
                                    city: this.state.shippingcityName,
                                    postcode: this.state.shippingpostCode,
                                    country: this.state.shippingcountryName,
                                    state: this.state.shippingstateName,
                                }  
                            }).then(response => {
                                console.log(response);
                                Alert.alert("Information", "Updated Successfully");
                                this.props.navigation.navigate('PaymentDetails')
                            }).catch(error => {
                                console.log(error+"456");
                            });
                    }
                }
            }
        }
        
        
        // WooCommerce.put('customers/'+3, {
        //     billing:{
        //         first_name: this.state.firstName,
        //         last_name: this.state.lastName,
        //         company: this.state.companyName,
        //         address_1: this.state.addressLine1,
        //         address_2: this.state.addressLine2,
        //         city: this.state.cityName,
        //         postcode: this.state.postCode,
        //         country: this.state.countryName,
        //         state: this.state.stateName,
        //         email:this.state.emailId,
        //         phone:this.state.phoneNo
        //     } 
        // }).then(response => {
        //     console.log(response);
        //     //Alert.alert("Information", "Updated Successfully");
        //     // try {                
        //     //     // this.props.navigation.push('Home')
        //     //     const resetAction = StackActions.reset({
        //     //       index: 0,
        //     //       actions: [NavigationActions.navigate({ routeName: 'Home' })],
        //     //     });
        //     //     this.props.navigation.dispatch(resetAction);
        //     //   } catch (error) {
        //     //     console.log(error);
        //     //   }
        // }).catch(error => {
        //     console.log(error+"456");
        // });
        // WooCommerce.put('customers/'+3, {
        //     shipping: {
        //         first_name: this.state.shippingfirstName,
        //         last_name: this.state.shippinglastName,
        //         company: this.state.shippingcompanyName,
        //         address_1: this.state.shippingaddressLine1,
        //         address_2: this.state.shippingaddressLine2,
        //         city: this.state.shippingcityName,
        //         postcode: this.state.shippingpostCode,
        //         country: this.state.shippingcountryName,
        //         state: this.state.shippingstateName,
        //     }  
        // }).then(response => {
        //     console.log(response);
        //     Alert.alert("Information", "Updated Successfully");
        //     this.props.navigation.navigate('PaymentDetails')
        //     // try {                
        //     //     // this.props.navigation.push('Home')
        //     //     const resetAction = StackActions.reset({
        //     //       index: 0,
        //     //       actions: [NavigationActions.navigate({ routeName: 'Home' })],
        //     //     });
        //     //     this.props.navigation.dispatch(resetAction);
        //     //   } catch (error) {
        //     //     console.log(error);
        //     //   }
        // }).catch(error => {
        //     console.log(error+"456");
        // });
        
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
               
                <View style={{marginBottom:height*.25}}>
                    <KeyboardAvoidingView>
                    <ScrollView>
                        <View style={{flexDirection:'row', height:height*.1, alignItems:'center', justifyContent:'space-between', marginLeft:width*.05, marginRight:width*.05 }}>
                            <Text style={[styles.TitleText,{color:'#343434', fontSize:20}]}>Billing Details</Text>                           
                        </View>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.profileTextInput}>
                                <TextInput  style={styles.textinputText}
                                    placeholder={this.state.dataSource.billing.first_name?this.state.dataSource.billing.first_name:"First Name"}
                                    keyboardType='email-address'
                                    returnKeyType = { "next" }
                                    onChangeText = {firstName => this.setState({firstName})}
                                />
                            </View>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.profileTextInput}>
                                <TextInput  style={styles.textinputText}
                                    placeholder={this.state.dataSource.billing.last_name?this.state.dataSource.billing.last_name:"Last Name"}
                                    keyboardType='email-address'
                                    returnKeyType = { "next" }
                                    onChangeText = {lastName => this.setState({lastName})}
                                />
                            </View>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.profileTextInput}>
                                <TextInput  style={styles.textinputText}
                                    placeholder={this.state.dataSource.billing.company?this.state.dataSource.billing.company:"Company Name"}
                                    keyboardType='email-address'
                                    returnKeyType = { "next" }
                                    onChangeText = {companyName => this.setState({companyName})}
                                />
                            </View>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.profileTextInput}>
                                <TextInput  style={styles.textinputText}
                                    placeholder={this.state.dataSource.billing.address_1?this.state.dataSource.billing.address_1:"Address Line 1"}
                                    keyboardType='email-address'
                                    returnKeyType = { "next" }
                                    onChangeText = {addressLine1 => this.setState({addressLine1})}
                                />
                            </View>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.profileTextInput}>
                                <TextInput  style={styles.textinputText}
                                    placeholder={this.state.dataSource.billing.address_2?this.state.dataSource.billing.address_2:"Address Line 2"}
                                    keyboardType='email-address'
                                    returnKeyType = { "next" }
                                    onChangeText = {addressLine2 => this.setState({addressLine2})}
                                />
                            </View>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.profileTextInput}>
                                <TextInput  style={styles.textinputText}
                                    placeholder={this.state.dataSource.billing.city?this.state.dataSource.billing.city:"City"}
                                    keyboardType='email-address'
                                    returnKeyType = { "next" }
                                    onChangeText = {cityName => this.setState({cityName})}
                                />
                            </View>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.profileTextInput}>
                                <TextInput  style={styles.textinputText}
                                    placeholder={this.state.dataSource.billing.state?this.state.dataSource.billing.state:"State"}
                                    keyboardType='email-address'
                                    returnKeyType = { "next" }
                                    onChangeText = {stateName => this.setState({stateName})}
                                />
                            </View>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.profileTextInput}>
                                <TextInput  style={styles.textinputText}
                                    placeholder={this.state.dataSource.billing.country?this.state.dataSource.billing.country:"Country"}
                                    keyboardType='email-address'
                                    returnKeyType = { "next" }
                                    onChangeText = {countryName => this.setState({countryName})}
                                />
                            </View>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.profileTextInput}>
                                <TextInput  style={styles.textinputText}
                                    placeholder={this.state.dataSource.billing.postcode?this.state.dataSource.billing.postcode:"PostCode"}
                                    keyboardType='phone-pad'
                                    maxLength={6}
                                    returnKeyType = { "next" }
                                    onChangeText = {postCode => this.setState({postCode})}
                                />
                            </View>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.profileTextInput}>
                                <TextInput  style={styles.textinputText}
                                    placeholder={this.state.dataSource.billing.email?this.state.dataSource.billing.email:"Email Id"}
                                    keyboardType='email-address'
                                    returnKeyType = { "next" }
                                    onChangeText = {emailId => this.setState({emailId})}
                                />
                            </View>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.profileTextInput}>
                                <TextInput  style={styles.textinputText}
                                    placeholder={this.state.dataSource.billing.phone?this.state.dataSource.billing.phone:"Phone Number"}
                                    keyboardType='phone-pad'
                                    maxLength={10}
                                    returnKeyType = { "next" }
                                    onChangeText = {phoneNumber => this.setState({phoneNumber})}
                                />
                            </View>
                            
                            
                        </View>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.profileTextInput}>
                            <CheckBox
                                checked={this.state.checked}
                                title='Ship to billing address'
                                onPress={() => this.setState({checked: !this.state.checked})}
                                />
                            </View>
                        </View>
                        { this.state.checked?
                        null 
                        :
                            <View>
                                <View style={{flexDirection:'row', height:height*.1, alignItems:'center', justifyContent:'space-between', marginLeft:width*.05, marginRight:width*.05 }}>
                                <Text style={[styles.TitleText,{color:'#343434', fontSize:20}]}>Shipping Details</Text>                           
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <View style={styles.profileTextInput}>
                                        <TextInput  style={styles.textinputText}
                                            placeholder={this.state.dataSource.shipping.first_name?this.state.dataSource.shipping.first_name:"First Name"}
                                            keyboardType='email-address'
                                            returnKeyType = { "next" }
                                            onChangeText = {shippingfirstName => this.setState({shippingfirstName})}
                                        />
                                    </View>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <View style={styles.profileTextInput}>
                                        <TextInput  style={styles.textinputText}
                                            placeholder={this.state.dataSource.shipping.last_name?this.state.dataSource.shipping.last_name:"Last Name"}
                                            keyboardType='email-address'
                                            returnKeyType = { "next" }
                                            onChangeText = {shippinglastName => this.setState({shippinglastName})}
                                        />
                                    </View>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <View style={styles.profileTextInput}>
                                        <TextInput  style={styles.textinputText}
                                            placeholder={this.state.dataSource.shipping.company?this.state.dataSource.shipping.company:"Company Name (optional)"}
                                            keyboardType='email-address'
                                            returnKeyType = { "next" }
                                            onChangeText = {shippingcompanyName => this.setState({shippingcompanyName})}
                                        />
                                    </View>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <View style={styles.profileTextInput}>
                                        <TextInput  style={styles.textinputText}
                                            placeholder={this.state.dataSource.shipping.address_1?this.state.dataSource.shipping.address_1:"Address Line 1"}
                                            keyboardType='email-address'
                                            returnKeyType = { "next" }
                                            onChangeText = {shippingaddressLine1 => this.setState({shippingaddressLine1})}
                                        />
                                    </View>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <View style={styles.profileTextInput}>
                                        <TextInput  style={styles.textinputText}
                                            placeholder={this.state.dataSource.shipping.address_2?this.state.dataSource.shipping.address_2:"Address Line 2"}
                                            keyboardType='email-address'
                                            returnKeyType = { "next" }
                                            onChangeText = {shippingaddressLine2 => this.setState({shippingaddressLine2})}
                                        />
                                    </View>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <View style={styles.profileTextInput}>
                                        <TextInput  style={styles.textinputText}
                                            placeholder={this.state.dataSource.shipping.city?this.state.dataSource.shipping.city:"City"}
                                            keyboardType='email-address'
                                            returnKeyType = { "next" }
                                            onChangeText = {shippingcityName => this.setState({shippingcityName})}
                                        />
                                    </View>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <View style={styles.profileTextInput}>
                                        <TextInput  style={styles.textinputText}
                                            placeholder={this.state.dataSource.shipping.state?this.state.dataSource.shipping.state:"State"}
                                            keyboardType='email-address'
                                            returnKeyType = { "next" }
                                            onChangeText = {shippingstateName => this.setState({shippingstateName})}
                                        />
                                    </View>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <View style={styles.profileTextInput}>
                                        <TextInput  style={styles.textinputText}
                                            placeholder={this.state.dataSource.shipping.country?this.state.dataSource.shipping.country:"Country"}
                                            keyboardType='email-address'
                                            returnKeyType = { "next" }
                                            onChangeText = {shippingcountryName => this.setState({shippingcountryName})}
                                        />
                                    </View>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <View style={styles.profileTextInput}>
                                        <TextInput  style={styles.textinputText}
                                            placeholder={this.state.dataSource.shipping.postcode?this.state.dataSource.shipping.postcode:"PostCode"}
                                            keyboardType='phone-pad'
                                            maxLength={6}
                                            returnKeyType = { "next" }
                                            onChangeText = {shippingpostCode => this.setState({shippingpostCode})}
                                        />
                                    </View>
                                </View>
                            </View>

                        }
                        

                        <View style={{alignItems:'center', paddingBottom:height*.025}}>
                            <TouchableOpacity 
                            onPress={() => { this.upadateAddress()}}  
                            style={{width:width*.9,marginTop:width*.05 ,alignItems:'center', justifyContent:'center', backgroundColor:'#343434',height:height*0.08, borderRadius:3}}>
                                    <Text style={[styles.TextiputHeader,{ color:'rgba(255,255,255,1)'}]}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
            );
        }
    }
}