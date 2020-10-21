import React from 'react';
import { Text, View, Dimensions, Image, TextInput, BackHandler, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import styles from './styles';


const { width, height } = Dimensions.get('window')

export default class App extends React.Component {
    render() {
        return (
            <ImageBackground source={require('../images/SignUpBkGrnd.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}>
                <View style={{ height: height * .4, marginLeft: width * .05, paddingTop: height * .1 }}>

                    <Text style={[styles.TitleText, { color: 'rgba(255,255,255,1)' }]} >Create An Account</Text>
                </View>
                <View style={{ alignItems: 'center', paddingTop: height * .04 }}>
                    <View style={styles.textInputLogin}>
                        <TextInput style={styles.textinputText}
                            placeholder="Email Address"
                            keyboardType='email-address'
                            returnKeyType={"next"}
                        />
                    </View>

                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.textInputLogin}>
                        <TextInput style={styles.textinputText}
                            placeholder="Password"
                            keyboardType='email-address'
                            secureTextEntry={true}
                        />
                        {/* <Icon name='eye-outline' size={20} type='material-community' color='rgba(0,0,0,0.3)' /> */}
                    </View>


                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={[styles.textInputLogin, { alignItems: 'center', backgroundColor: '#343434', borderWidth: 0 }]}>
                        <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]} >CONTINUE</Text>
                    </TouchableOpacity>

                </View>

            </ImageBackground>
        );
    }
}