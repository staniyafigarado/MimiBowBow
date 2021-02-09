import React from 'react';
import { Text, View, Dimensions, Image, TextInput } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Badge } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
//import DatePicker from 'react-native-datepicker';
import { Container, Header, Content, DatePicker, Button } from 'native-base';
import { Picker } from '@react-native-community/picker';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-community/async-storage';
const { width, height } = Dimensions.get('window')


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ItemSelector: '',
            date: "12-08-2020", cartCount: 0
        };
    }
    async componentDidMount() {
        const existingCart = await AsyncStorage.getItem('cart');
        this.setState({
            cartCount: JSON.parse(existingCart).length
        });
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f5c711', paddingBottom: 55 }}>
                <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', margin: width * .05 }}>
                    <Icon name='menu' size={40} type='material-icons' color='#343434' />
                    <Text style={[styles.TitleText, { marginLeft: width * .03, fontSize: 22 }]}>Make An Appoinment</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')}>
                        <Icon name='cart' size={40} type='material-community' color='#343434' />
                        {this.state.cartCount != 0 ?
                            /* {this.state.cartCount = 0 ? */
                            <Badge value={this.state.cartCount} status="error" containerStyle={{ position: 'absolute', top: -1, right: -1 }} />
                            : null
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: height * .15 }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#FFF' }}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.textInput}>
                                <TextInput style={styles.textinputText}
                                    placeholder="Name"
                                    keyboardType='email-address'
                                    returnKeyType={"next"}
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.textInput}>
                                <Picker
                                    style={styles.textinputText}
                                    selectedValue={this.state.ItemSelector}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ ItemSelector: itemValue })} >
                                    <Picker.Item label="Category" value='' />
                                    <Picker.Item label="Dog" value="dog" />
                                    <Picker.Item label="Cat" value="cat" />
                                    <Picker.Item label="Birds" value="birds" />
                                    <Picker.Item label="Fish" value="fish" />
                                    <Picker.Item label="Small Pets" value="smallpets" />
                                    <Picker.Item label="Others" value="others" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.textInput}>
                                <DatePicker
                                    defaultDate={new Date(2020, 7, 12)}
                                    minimumDate={new Date(2018, 1, 1)}
                                    maximumDate={new Date(2100, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Select date"
                                    textStyle={styles.textinputText}
                                    placeHolderTextStyle={styles.textinputText}
                                    onDateChange={this.setDate}
                                //disabled={false}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: width * .05 }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity style={[styles.textInput, { width: width * .25, alignItems: 'center' }]}>
                                    <Text>10.00</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.textInput, { width: width * .25, alignItems: 'center' }]}>
                                    <Text>11.00</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.textInput, { width: width * .25, alignItems: 'center' }]}>
                                    <Text>12.00</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.textInput, { width: width * .25, alignItems: 'center' }]}>
                                    <Text>03.00</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.textInput, { width: width * .25, alignItems: 'center' }]}>
                                    <Text>04.00</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.textInput, { width: width * .25, alignItems: 'center' }]}>
                                    <Text>05.00</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={[styles.textInput, { height: height * .2 }]}>
                                <TextInput style={[styles.textinputText, { height: height * .2 }]}
                                    placeholder="Note"
                                    keyboardType='email-address'
                                    returnKeyType={"next"}
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BookingConfirm')} style={[styles.textInput, { alignItems: 'center', borderWidth: 0, backgroundColor: '#FDC500', elevation: 3 }]}>
                                <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]} >BOOK</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}