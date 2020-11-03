import React from 'react';
import { Text, View, Dimensions, Image, TextInput, Alert } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import { Rating, AirbnbRating } from 'react-native-ratings';
//import DatePicker from 'react-native-datepicker';
import { Container, Header, Content, DatePicker, Button } from 'native-base';
import { Picker } from '@react-native-community/picker';
import styles from '../styles/styles';
import WooCommerce from '../utils/wooApi';
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


const { width, height } = Dimensions.get('window')


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            editStatus: 0,
            userName: '',
            phoneNo: '',
            emailId: '',
        };
    }
    componentDidMount() {
        WooCommerce.get('customers/' + 3).then(response => {
            this.setState({
                dataSource: response.data,
                isLoading: false,
            });
        }).catch(error => {
            console.log(error);
        });
    }
    editStatusFun = (value) => {
        this.setState({
            editStatus: value
        });
    }
    upadateUser = () => {
        console.log("456");
        WooCommerce.put('customers/' + 3, {
            first_name: this.state.userName,
            billing: { phone: this.state.phoneNo }


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
                // Error saving data
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
                        source={require('../assets/images/logo.png')}
                        style={{ width: height * .07, height: height * .07 }}
                    />
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17 }}>
                        Mimi and Bow Bow
                        </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')}>
                        <Icon name='cart' size={40} type='material-community' color='#343434' />
                    </TouchableOpacity>
                </View>
                {this.state.editStatus == 0 ?
                    <View>
                        <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
                            <Text style={[styles.TitleText, { color: '#343434', fontSize: 20 }]}>My Profile</Text>
                            <TouchableOpacity onPress={() => { this.editStatusFun(1) }}>
                                <Text style={{ color: '#343434', fontSize: 13, fontFamily: 'Montserrat-Regular' }}>Edit profile</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.profileTextInput}>
                                <Text style={styles.textinputText}>John Doe</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.profileTextInput}>
                                <Text style={styles.textinputText}>8565478956</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.profileTextInput}>
                                <Text style={styles.textinputText}>Johndoe@gmail.com</Text>
                            </View>
                        </View>
                        {/* <View style={{ alignItems: 'center' }}>
                            <View style={[styles.profileTextInput, { height: height * .2 }]}>

                            </View>
                        </View> */}
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.profileTextInput}>
                                <Text style={styles.textinputText} >Address</Text>
                            </View>
                        </View>


                    </View>
                    :
                    <View style={{ marginBottom: height * .15, marginTop: height * .05 }}>
                        <ScrollView>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        placeholder={'John Doe'}
                                        keyboardType='email-address'
                                        returnKeyType={"next"}
                                        onChangeText={userName => this.setState({ userName })}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        // placeholder={this.state.dataSource.billing.phone}
                                        placeholder={'9656039412'}
                                        keyboardType='phone-pad'
                                        maxLength={10}
                                        returnKeyType={"next"}
                                        onChangeText={phoneNo => this.setState({ phoneNo })}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.profileTextInput}>
                                    <TextInput style={styles.textinputText}
                                        placeholder={"Johndoe@gmail.com"}
                                        keyboardType='email-address'
                                        returnKeyType={"next"}
                                        onChangeText={emailId => this.setState({ emailId })}
                                    />
                                </View>
                            </View>

                            <View style={{ alignItems: 'center' }}>
                                <View style={[styles.profileTextInput, { height: height * .2 }]}>
                                    <TextInput style={[styles.textinputText, { height: height * .2 }]}
                                        placeholder="Note"
                                        keyboardType='email-address'
                                        returnKeyType={"next"}
                                    />
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => { this.upadateUser() }}
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