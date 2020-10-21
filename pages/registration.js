import React from 'react';
import { Text, View, Dimensions, Image, TextInput, BackHandler, ImageBackground, StatusBar } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import styles from './styles';


const { width, height } = Dimensions.get('window')

export default class App extends React.Component {
    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    // }
    // handleBackButton(){
    //           BackHandler.exitApp();
    //       }
	render() {
		return (
			<ImageBackground source={require('../images/SignUpBkGrnd.png')} style={{width: '100%', height: '100%',  resizeMode: 'stretch'}}>
                <StatusBar barStyle = "dark-content" hidden = {true} backgroundColor = "rgba(255,255,255,1)" translucent = {true}/>
                <View style={{height:height*.4, marginLeft:width*.05, paddingTop:height*.1}}>   
                    <Text style={[styles.TitleText,{color:'rgba(255,255,255,1)'}]} >Create An Account</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity  style={[styles.roundButton,{justifyContent:'flex-start', paddingLeft:width*.05, backgroundColor:'#343434',}]}>
                    <Icon name='google' size={30} type='material-community' color='rgba(255,255,255,1)' />
                        <Text style={[styles.TextiputHeader,{color:'rgba(255,255,255,1)', fontSize:13, paddingLeft:width*.1}]} >CONTINUE WITH GOOGLE</Text>
                    </TouchableOpacity>

                </View>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UserReg')} style={[styles.roundButton,{justifyContent:'flex-start', paddingLeft:width*.05, borderWidth:2, borderColor:'#FDC500', }]}>
                    <Icon name='email' size={30} type='material' color='#343434' />
                        <Text style={[styles.TextiputHeader,{color:'#343434', fontSize:13, paddingLeft:width*.1}]} >CONTINUE WITH EMAIL</Text>
                    </TouchableOpacity>

                </View>
				<View style={{justifyContent:'center', flexDirection:'row'}}>
                    <View style={{margin:20, width:width*0.15, height:width*0.15, borderWidth:2, borderColor:'#343434', borderRadius:width*.075, alignItems:'center', justifyContent:'center'}}>
                        <Icon name='facebook' size={30} type='fontisto' color='#343434' />
                    </View>
                    <View style={{margin:20, width:width*0.15, height:width*0.15, borderWidth:2, borderColor:'#343434', borderRadius:width*.075, alignItems:'center', justifyContent:'center'}}>
                        <Icon name='google-plus' size={40} type='material-community' color='#343434' />
                    </View>
                </View>
                <View style={{justifyContent:'center', alignItems:'baseline', flexDirection:'row'}}>
                <Text style={{fontFamily:'Montserrat-Regular',color:'rgba(0,0,0,.7)', fontSize:14}} >Already Have an Account?</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <Text style={{fontFamily:'Montserrat-Bold',color:'rgba(255,255,255,1)', fontSize:17}} > SignIn</Text>
                    </TouchableOpacity>
                   
                </View>
			</ImageBackground>
		);  
	} 
}