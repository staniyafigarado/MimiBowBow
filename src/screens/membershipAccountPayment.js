import React, { Component } from 'react';
import { StatusBar, Text, View, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import { Icon, SearchBar, Badge } from 'react-native-elements';
import styles from '../styles/styles';
import { RadioButton, TextInput } from 'react-native-paper';
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
            value: 0,
        };
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
                        {/* {this.state.cartCount != 0 ?
                            <Badge value={this.state.cartCount} status="error" containerStyle={{ position: 'absolute', top: -1, right: -1 }} />
                            : null
                        } */}

                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', height: height * .05, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
                    <Text style={{ color: '#343434', fontSize: 16, fontFamily: 'Montserrat-SemiBold' }}>{this.props.navigation.state.params.Title}</Text>
                    <Text style={{ color: '#343434', fontSize: 16, fontFamily: 'Montserrat-SemiBold' }}>₹ {this.props.navigation.state.params.Price}</Text>
                </View>
                <View style={[styles.textInput, { marginLeft: width * .05, height: null, padding: width * .025 }]}>
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
                        onPress={() => this.props.navigation.navigate('UpgradeSuccess')}
                        style={{ width: width * .9, marginTop: width * .05, alignItems: 'center', justifyContent: 'center', backgroundColor: '#343434', height: height * 0.08, borderRadius: 3 }}>
                        <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};