import React, { Component } from 'react';
import { View, Dimensions, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
const { width, height } = Dimensions.get('window')
export default class JustifyContentBasics extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
                {/* header component */}
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
                <View style={{ height: height * .25, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Image
                        source={require('../assets/images/user.jpg')}
                        style={{ height: height * .17, width: height * .17, borderRadius: height * .085 }}
                    />
                    <Text style={{ fontFamily: 'Montserrat-medium', fontSize: 18 }}>
                        staniya Figarado
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='camera' size={20} type='material-community' color='#343434' />
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, paddingLeft: 10 }}>
                            Change Profile Picture
                        </Text>
                    </View>
                </View>

                <View style={{ height: height * .65, backgroundColor: '#fff', borderTopStartRadius: 40, borderTopEndRadius: 40, marginTop: 5, justifyContent: 'space-evenly', paddingHorizontal: '5%', paddingBottom: 15 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}
                        style={{
                            flexDirection: 'row', paddingLeft: width * .05, borderWidth: 1,
                            borderRadius: 10, borderColor: '#D1D1D1', height: '15%', alignItems: 'center', opacity: 0.8
                        }}>
                        <View style={{ width: '85%', flexDirection: 'row' }}>
                            <Icon name='user-circle' size={20} type='font-awesome-5' color='rgba(0,0,0,1)' />
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, paddingLeft: 20 }}>
                                My Profile
                        </Text>
                        </View>
                        <View style={{ width: '15%' }}>
                            <Icon name='keyboard-arrow-right' size={40} type='material' color='#000000' style={{ opacity: .2 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}
                        style={{
                            flexDirection: 'row', paddingLeft: width * .05, borderWidth: 1,
                            borderRadius: 10, borderColor: '#D1D1D1', height: '15%', alignItems: 'center', opacity: 0.8
                        }}>
                        <View style={{ width: '85%', flexDirection: 'row' }}>
                            <Icon name='cart' size={20} type='material-community' color='rgba(0,0,0,1)' />
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, paddingLeft: 20 }}>
                                My Orders
                        </Text>
                        </View>
                        <View style={{ width: '15%' }}>
                            <Icon name='keyboard-arrow-right' size={40} type='material' color='#000000' style={{ opacity: .2 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('HOme')}
                        style={{
                            flexDirection: 'row', paddingLeft: width * .05, borderWidth: 1,
                            borderRadius: 10, borderColor: '#D1D1D1', height: '15%', alignItems: 'center', opacity: 0.8
                        }}>
                        <View style={{ width: '85%', flexDirection: 'row' }}>
                            <Icon name='address-card' size={20} type='font-awesome-5' color='rgba(0,0,0,1)' />
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, paddingLeft: 20 }}>
                                Billing Address
                        </Text>
                        </View>
                        <View style={{ width: '15%' }}>
                            <Icon name='keyboard-arrow-right' size={40} type='material' color='#000000' style={{ opacity: .2 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}
                        style={{
                            flexDirection: 'row', paddingLeft: width * .05, borderWidth: 1,
                            borderRadius: 10, borderColor: '#D1D1D1', height: '15%', alignItems: 'center', opacity: 0.8
                        }}>
                        <View style={{ width: '85%', flexDirection: 'row' }}>
                            <Icon name='logout' size={20} type='material-community' color='rgba(0,0,0,1)' />
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, paddingLeft: 20 }}>
                                Logout
                        </Text></View>
                        <View style={{ width: '15%' }}>
                            <Icon name='keyboard-arrow-right' size={40} type='material' color='#000000' style={{ opacity: .2 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};