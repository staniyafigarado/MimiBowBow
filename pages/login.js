import React from 'react';
import { Text, View, Dimensions, Image, TextInput, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import styles from './styles';


const { width, height } = Dimensions.get('window')

export default class App extends React.Component {
	render() {
		return (
			<ImageBackground source={require('../images/SignUpBkGrnd.png')} style={{width: '100%', height: '100%',  resizeMode: 'stretch'}}>
                <View style={{height:height*.4, marginLeft:width*.05, paddingTop:height*.1}}>
                    <Text style={[styles.TitleText,{color:'rgba(255,255,255,1)'}]} >SignIn</Text>
                </View>
                <View style={{alignItems:'center', paddingTop:height*.04}}>
                    <View style={styles.textInputLogin}>
                        <TextInput  style={styles.textinputText}
                            placeholder="Email Address"
                            keyboardType='email-address'
                            returnKeyType = { "next" }
                         />
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                    <View style={styles.textInputLogin}>
                        <TextInput  style={styles.textinputText}
                            placeholder="Password"
                            keyboardType='email-address'
                            secureTextEntry={true}
                         />
                         {/* <Icon name='eye-outline' size={20} type='material-community' color='rgba(0,0,0,0.3)' /> */}
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={[styles.textInputLogin,{alignItems:'center',backgroundColor:'#343434', borderWidth:0}]}>
                        <Text style={[styles.TextiputHeader,{color:'rgba(255,255,255,1)'}]} >CONTINUE</Text>
                    </TouchableOpacity>

                </View>
				<View style={{alignItems:'flex-end', marginRight:width*.05}}>
                    <Text style={{fontFamily:'Montserrat-Regular',color:'#343434', fontSize:14}} >Forgot Password?</Text>

                </View>
				<View style={{justifyContent:'center', flexDirection:'row'}}>
                    <View style={{margin:20, width:width*0.15, height:width*0.15, borderWidth:1, borderColor:'#343434', borderRadius:width*.075, alignItems:'center', justifyContent:'center'}}>
                        <Icon name='facebook' size={30} type='fontisto' color='#343434' />
                    </View>
                    <View style={{margin:20, width:width*0.15, height:width*0.15, borderWidth:1, borderColor:'#343434', borderRadius:width*.075, alignItems:'center', justifyContent:'center'}}>
                        <Icon name='google-plus' size={40} type='material-community' color='#343434' />
                    </View>
                </View>
            </ImageBackground>
		);  
	} 
}