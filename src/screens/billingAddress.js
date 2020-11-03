import React from 'react';
import { Text, View, Dimensions, Image, BackHandler, FlatList, TextInput, Alert } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from '../styles/styles';
import WooCommerce from '../utils/wooApi';
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

const DataArray = require("../screens/categoryData.json");

const { width, height } = Dimensions.get('window')

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            editStatus: 0,
            firstName: '',
            lastName: '',
            companyName: '',
            addressLine1: '',
            addressLine2: '',
            cityName: '',
            stateName: '',
            countryName: '',
            postCode: '',
            emailId: '',
            phoneNumber: '',
        };
    }
    componentDidMount = async () => {
        const userData = (JSON.parse(await AsyncStorage.getItem('userData')));
        WooCommerce.get('customers/' + (userData.id)).then(response => {
            console.log(response.data + "123");
            this.setState({
                dataSource: response.data.billing,
                isLoading: false,
            });
        }).catch(error => {
            console.log(error + "123");
        });
        console.log(this.state.dataSource + "Hi")

    }
    editStatusFun = (value) => {
        this.setState({
            editStatus: value
        });
    }
    upadateBillingAddress = async () => {
        const userData = (JSON.parse(await AsyncStorage.getItem('userData')));
        console.log("456");
        WooCommerce.put('customers/' + (userData.id), {
            billing: {
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                company: this.state.companyName,
                address_1: this.state.addressLine1,
                address_2: this.state.addressLine2,
                city: this.state.cityName,
                postcode: this.state.postCode,
                country: this.state.countryName,
                state: this.state.stateName,
                email: this.state.emailId,
                phone: this.state.phoneNumber
            }


        }).then(response => {
            Alert.alert("Information", "Updated Successfully");
            try {
                // this.props.navigation.push('Home')
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                });
                this.props.navigation.dispatch(resetAction);
            } catch (error) {
                console.log(error);
            }
        }).catch(error => {
            console.log(error + "456");
        });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
                    <PacmanIndicator
                        count={5}
                        color='black'
                        animationDuration={600}
                        size={100}
                    />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
                <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', margin: width * .05 }}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.toggleDrawer(); }}
                    >
                        <Icon name='menu' size={40} type='material-icons' color='#343434' />
                    </TouchableOpacity>
                    <Image
                        source={require('../assets/images//logo.png')}
                        style={{ width: height * .07, height: height * .07 }}
                    />
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17 }}>
                        Mimi and Bow Bow
                        </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')}>
                        <Icon name='cart' size={40} type='material-community' color='#343434' />
                    </TouchableOpacity>
                </View>
                {/* <View style={[styles.textInput, { marginLeft: width * .05, borderWidth: 0, marginBottom: 3, elevation: 5 }]}>
                    <SearchBar
                        //ref="searchBar"
                        placeholder="Search Here"
                    //onChangeText={...}
                    //onSearchButtonPress={...}
                    //onCancelButtonPress={...}
                    />
                </View> */}
                {this.state.editStatus == 0 ?
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
                            <Text style={[styles.TitleText, { color: '#343434', fontSize: 20 }]}>Billing Details</Text>
                            <TouchableOpacity onPress={() => { this.editStatusFun(1) }}>
                                <Text style={{ color: '#343434', fontSize: 13, fontFamily: 'Montserrat-Regular' }}>Edit Billing Address</Text>
                            </TouchableOpacity>
                        </View>
                        <View >
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.profileTextInput}>
                                        {/* <Text style={styles.textinputText}>{this.state.dataSource.first_name ? this.state.dataSource.first_name : "First Name"}</Text> */}
                                        <Text style={styles.textinputText}>First Name</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.profileTextInput}>
                                        {/* <Text style={styles.textinputText}>{this.state.dataSource.last_name ? this.state.dataSource.last_name : "Last Name"}</Text> */}
                                        <Text style={styles.textinputText}>Last Name</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.profileTextInput}>
                                        {/* <Text style={styles.textinputText}>{this.state.dataSource.company ? this.state.dataSource.company : "Company Name"}</Text> */}
                                        <Text style={styles.textinputText}>Company Name</Text>
                                    </View>
                                </View>

                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.profileTextInput}>
                                        {/* <Text style={styles.textinputText}>{this.state.dataSource.address_1 ? this.state.dataSource.address_1 : "Address Line 1"}</Text> */}
                                        <Text style={styles.textinputText}>Address Line 1</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.profileTextInput}>
                                        {/* <Text style={styles.textinputText}>{this.state.dataSource.address_2 ? this.state.dataSource.address_2 : "Address Line 2"}</Text> */}
                                        <Text style={styles.textinputText}>Address Lane 2</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.profileTextInput}>
                                        {/* <Text style={styles.textinputText}>{this.state.dataSource.city ? this.state.dataSource.city : "City"}</Text> */}
                                        <Text style={styles.textinputText}>City</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.profileTextInput}>
                                        {/* <Text style={styles.textinputText}>{this.state.dataSource.postcode ? this.state.dataSource.postcode : "PostCode"}</Text> */}
                                        <Text style={styles.textinputText}>PostCode</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.profileTextInput}>
                                        {/* <Text style={styles.textinputText}>{this.state.dataSource.country ? this.state.dataSource.country : "Country"}</Text> */}
                                        <Text style={styles.textinputText}>State</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.profileTextInput}>
                                        {/* <Text style={styles.textinputText}>{this.state.dataSource.state ? this.state.dataSource.state : "State"}</Text> */}
                                        <Text style={styles.textinputText}>Country</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.profileTextInput}>
                                        {/* <Text style={styles.textinputText}>{this.state.dataSource.email ? this.state.dataSource.email : "Email Id"}</Text> */}
                                        <Text style={styles.textinputText}>Email Id</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.profileTextInput}>
                                        {/* <Text style={styles.textinputText}>{this.state.dataSource.phone ? this.state.dataSource.phone : "Phone Number"}</Text> */}
                                        <Text style={styles.textinputText}>Phone Number</Text>
                                    </View>
                                </View>

                            </ScrollView>
                        </View>

                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
                            <Text style={[styles.TitleText, { color: '#343434', fontSize: 20 }]}>Billing Details</Text>
                        </View>
                        <ScrollView>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        // placeholder={this.state.dataSource.first_name ? this.state.dataSource.first_name : "First Name"}
                                        placeholder={"First Name"}
                                        keyboardType='email-address'
                                        returnKeyType={"next"}
                                        onChangeText={firstName => this.setState({ firstName })}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        // placeholder={this.state.dataSource.last_name ? this.state.dataSource.last_name : "Last Name"}
                                        placeholder={"Last Name"}
                                        keyboardType='email-address'
                                        returnKeyType={"next"}
                                        onChangeText={lastName => this.setState({ lastName })}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        // placeholder={this.state.dataSource.company ? this.state.dataSource.company : "Company Name"}
                                        placeholder={"Company Name"}
                                        keyboardType='email-address'
                                        returnKeyType={"next"}
                                        onChangeText={companyName => this.setState({ companyName })}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        // placeholder={this.state.dataSource.address_1 ? this.state.dataSource.address_1 : "Address Line 1"}
                                        placeholder={"Address Line 1"}
                                        keyboardType='email-address'
                                        returnKeyType={"next"}
                                        onChangeText={addressLine1 => this.setState({ addressLine1 })}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        // placeholder={this.state.dataSource.address_2 ? this.state.dataSource.address_2 : "Address Line 2"}
                                        placeholder={"Address Line 2"}
                                        keyboardType='email-address'
                                        returnKeyType={"next"}
                                        onChangeText={addressLine2 => this.setState({ addressLine2 })}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        // placeholder={this.state.dataSource.city ? this.state.dataSource.city : "City"}
                                        placeholder={"City"}
                                        keyboardType='email-address'
                                        returnKeyType={"next"}
                                        onChangeText={cityName => this.setState({ cityName })}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        // placeholder={this.state.dataSource.state ? this.state.dataSource.state : "State"}
                                        placeholder={"State"}
                                        keyboardType='email-address'
                                        returnKeyType={"next"}
                                        onChangeText={stateName => this.setState({ stateName })}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        // placeholder={this.state.dataSource.country ? this.state.dataSource.country : "Country"}
                                        placeholder={"Country"}
                                        keyboardType='email-address'
                                        returnKeyType={"next"}
                                        onChangeText={countryName => this.setState({ countryName })}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        // placeholder={this.state.dataSource.postcode ? this.state.dataSource.postcode : "PostCode"}
                                        placeholder={"Postcode"}
                                        keyboardType='phone-pad'
                                        maxLength={6}
                                        returnKeyType={"next"}
                                        onChangeText={postCode => this.setState({ postCode })}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        // placeholder={this.state.dataSource.email ? this.state.dataSource.email : "Email Id"}
                                        placeholder={"Email Id"}
                                        keyboardType='email-address'
                                        returnKeyType={"next"}
                                        onChangeText={emailId => this.setState({ emailId })}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        // placeholder={this.state.dataSource.phone ? this.state.dataSource.phone : "Phone Number"}
                                        placeholder={"Phone Number"}
                                        keyboardType='phone-pad'
                                        maxLength={10}
                                        returnKeyType={"next"}
                                        onChangeText={phoneNumber => this.setState({ phoneNumber })}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', paddingBottom: height * .025 }}>
                                <TouchableOpacity
                                    // onPress={() => { this.upadateBillingAddress() }}
                                    style={{ width: width * .9, marginTop: width * .05, alignItems: 'center', justifyContent: 'center', backgroundColor: '#343434', height: height * 0.08, borderRadius: 3 }}>
                                    <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]}>SUBMIT</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                }
            </View>
        );

    }
}