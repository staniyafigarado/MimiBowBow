import React from 'react';
import { Text, View, Dimensions, Image, TextInput, ImageBackground, Alert, Keyboard, KeyboardAvoidingView, } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from '../styles/styles';
const { width, height } = Dimensions.get('window')
import axios from 'axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
    }
    insertData() {
        axios.post('https://mimiandbowbow.com/alpha/api/user/retrieve_password/?user_login=' + this.state.email)

            .then(res => {
                const data = res.data;
                console.log(data);
                alert(data.msg)
                this.props.navigation.navigate("Login");
            }).catch(error => {
                console.log(error)
            });
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
                <ImageBackground source={require('../assets/images/SignUpBkGrnd.png')} style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                }}>
                    <View style={{ height: height * .4, marginLeft: width * .05, paddingTop: height * .1 }}>
                        <Text style={[styles.TitleText, { color: 'rgba(255,255,255,1)' }]} >Sign In</Text>
                    </View>
                    <Text style={styles.textinputText}>You will receive a link to create a new password via email.</Text>
                    <View style={{ alignItems: 'center', paddingTop: height * .04 }}>
                        <View style={styles.textInputLogin}>
                            <TextInput style={styles.textinputText}
                                placeholder="* User Name / Email Address"
                                keyboardType='email-address'
                                returnKeyType={"next"}
                                onChangeText={email => this.setState({ email })}
                            />
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', marginTop: height * .05 }}>
                        <TouchableOpacity
                            onPress={() => this.insertData()}
                            style={[styles.textInputLogin, { alignItems: 'center', backgroundColor: '#FDC500', elevation: 3 }]}>
                            <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]} >CONTINUE</Text>
                        </TouchableOpacity>

                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}