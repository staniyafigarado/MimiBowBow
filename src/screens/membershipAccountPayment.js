import React, { Component } from 'react';
import { StatusBar, Text, View, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import { Icon, SearchBar, Badge } from 'react-native-elements';
import styles from '../styles/styles';
import { RadioButton, TextInput } from 'react-native-paper';
import axios from 'axios';
const { width, height } = Dimensions.get('window');
const data = [
    {
        id: '1',
        title: 'UPI Bank tranfer',
        subTitle: 'Pay using google pay / phonepay'
    },
    {
        id: '2',
        title: 'Credit Card/Debit Card/NetBanking ',
        subTitle: 'Pay securely by Credit or Debit card or Internet Banking through Razorpay.'
    },
];
export default class JustifyContentBasics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            cartAmount: 0,
            value: 0, cartCount: 0
        };
    }
    async componentDidMount() {
        const existingCart = await AsyncStorage.getItem('cart');
        this.setState({
            cartCount: JSON.parse(existingCart).length
        });
    }
    insertData() {
        axios.post('https://mimiandbowbow.com/alpha/?swpm_api_action=update&key=7e8657a1d5cabccdf5748f569e9bbcad&member_id=51&first_name=bilbin&last_name=thomas&email=bilginthomas1997@gmail.com&password=321')

            .then(res => {
                const data = res.data;
                console.log(data);
                // let userDets = {
                //     username: res.data.user_nicename,
                //     email: res.data.user_email,
                //     // displayname: response.data.user_display_name
                // };
                // alert('Scucessfully signed in with email ' + userDets.email);
                // this.props.navigation.navigate("Home");
                // AsyncStorage.setItem('user_id', res.data.user_email);
            }).catch(error => {
                alert("Something went wrong, Check your email and password.")
                console.log(error)
            });
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
                <StatusBar barStyle="dark-content" hidden={true} backgroundColor="rgba(255,255,255,1)" translucent={true} />
                <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', margin: width * .05 }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.toggleDrawer(); }}>
                        <Icon name='menu' size={40} type='material-icons' color='#343434' />
                    </TouchableOpacity>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={{ width: height * .07, height: height * .07 }}
                    />
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17 }}>
                        Mimi and Bow Bow
					</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')}>
                        <Icon name='cart' size={40} type='material-community' color='#343434' />
                        {this.state.cartCount != 0 ?
                            /* {this.state.cartCount = 0 ? */
                            <Badge value={this.state.cartCount} status="error" containerStyle={{ position: 'absolute', top: -1, right: -1 }} />
                            : null
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#FFF', height: '100%' }}>
                    <View style={{ flexDirection: 'row', height: height * .05, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
                        <Text style={{ color: '#343434', fontSize: 16, fontFamily: 'Montserrat-SemiBold' }}>{this.props.navigation.state.params.Title}</Text>
                        <Text style={{ color: '#343434', fontSize: 16, fontFamily: 'Montserrat-SemiBold' }}>₹ {this.props.navigation.state.params.Price}</Text>
                    </View>
                    <View style={[styles.textInput, { marginLeft: width * .05, height: null, padding: width * .025, marginTop: 10 }]}>
                        <RadioButton.Group onValueChange={value => this.setState({ value: this.state.value })}>
                            <FlatList
                                keyExtractor={(item, index) => index}
                                data={data}
                                renderItem={({ item, index }) => (

                                    <View style={{ flexDirection: 'row', alignItems: 'center', height: height * 0.08 }}>
                                        <RadioButton value={index} />
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={[styles.textinputText, { fontSize: 12, fontFamily: 'Montserrat-Medium' }]}>{item.title}</Text>
                                            <Text style={[styles.textinputText, { fontSize: 8 }]}>{item.subTitle}</Text>
                                        </View>
                                    </View>


                                )}
                            />
                        </RadioButton.Group>
                    </View>
                    <View style={{ alignItems: 'center', paddingBottom: height * .025 }}>
                        <TouchableOpacity
                            onPress={() =>
                                // this.insertData()
                                this.props.navigation.navigate('UpgradeSuccess')
                            }
                            style={{ width: width * .9, marginTop: width * .05, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDC500', height: height * 0.08, borderRadius: 3, elevation: 3 }}>
                            <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]}>CONTINUE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
};