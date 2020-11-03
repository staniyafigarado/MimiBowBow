import React from 'react';
import { Text, View, Dimensions, Image, BackHandler, FlatList } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
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
        super(props)
        this.state = {
            avatarSource: null
        }
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }
    // Image picker
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    //   image rendering
    renderFileData() {
        if (this.state.avatarSource) {
            return <View>
                <Image
                    source={this.state.avatarSource}
                    style={{ height: height * .17, width: height * .17, borderRadius: height * .085 }}
                />
            </View>

        } else {
            return <View>
                <Image
                    source={require('../assets/images/user.jpg')}
                    style={{ height: height * .17, width: height * .17, borderRadius: height * .085 }}
                />
            </View>
        }
    }
    render() {
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
                <View style={{ height: height * .3, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    {this.renderFileData()}
                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18 }}>
                        User Name
                    </Text>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='camera' size={20} type='material-community' color='#343434' />
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, paddingLeft: 10 }}>
                                Change Profile Picture
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ height: height * .6, backgroundColor: '#fff', borderTopStartRadius: 40, borderTopEndRadius: 40, padding: height * .05, justifyContent: 'space-evenly', paddingBottom: height * 0.12 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyProfile')} style={{ flexDirection: 'row', paddingLeft: width * .05, paddingBottom: height * .05 }}>
                        <Icon name='user-circle' size={20} type='font-awesome-5' color='rgba(0,0,0,1)' />
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, paddingLeft: 20 }}>
                            My Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderListing')} style={{ flexDirection: 'row', paddingLeft: width * .05, paddingBottom: height * .05 }}>
                        <Icon name='cart' size={20} type='material-community' color='#343434' />
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, paddingLeft: 20 }}>
                            My Orders
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BillingAddress')} style={{ flexDirection: 'row', paddingLeft: width * .05, paddingBottom: height * .05 }}>
                        <Icon name='address-card' size={20} type='font-awesome-5' color='rgba(0,0,0,1)' />
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, paddingLeft: 20 }}>
                            Billing Address
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('LogOut') }} style={{ flexDirection: 'row', paddingLeft: width * .05, paddingBottom: height * .05 }}>
                        <Icon name='logout' size={20} type='material-community' color='rgba(0,0,0,1)' />
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 15, paddingLeft: 20 }}>
                            Logout
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        );

    }
}