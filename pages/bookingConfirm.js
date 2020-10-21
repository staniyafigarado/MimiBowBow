import React from 'react';
import { Text, View, Dimensions, Image, TextInput, Picker } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
//import DatePicker from 'react-native-datepicker';
import { Container, Header, Content, DatePicker, Button } from 'native-base';
import styles from './styles';

const { width, height } = Dimensions.get('window')


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          ItemSelector : '',
          date:"12-08-2020",
        };
      }
      setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }
	render() {
		return (
			<View style={{ flex: 1, backgroundColor:'#f5c711'}}>
				<View style={{flexDirection:'row', height:height*.1, alignItems:'center', justifyContent:'space-between', margin:width*.05}}>
                    <TouchableOpacity 
                    //onPress={() => { this.props.navigation.toggleDrawer(); }}
                    >
						<Icon name='menu' size={40} type='material-icons' color='#343434'/>
					</TouchableOpacity>
					<Image
					source={require('../images/logo.png')}
					style={{ width: height*.07, height: height*.07}}
					/>  
					<Text style={{fontFamily:'Montserrat-Regular', fontSize:17}}>
					Mimi and Bow Bow
					</Text>
        			<Icon name='cart' size={40} type='material-community' color='#343434' />
				</View>
                <View style={{flexDirection:'row', height:height*.35, alignItems:'flex-end',justifyContent:'center', paddingBottom:height*0.05}}>
                    <Image
                        source={require('../images/doctor.png')}
                        style={{height:height*.3, width:width*0.2,resizeMode: 'stretch'}}
                        />
                    <Image
                        source={require('../images/dog2.png')}
                        style={{height:width*0.2, width:width*0.3,resizeMode: 'stretch'}}
                        />

                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={[styles.TitleText,{color:'rgba(255,255,255,1)'}]}>Appoinment Fixed</Text>
                    <Text style={[styles.TitleText,{color:'rgba(255,255,255,1)'}]}> 26 August 2020 </Text>
                    <Text style={[styles.TitleText,{color:'rgba(255,255,255,1)', fontSize:25}]}> 11.00 am </Text>
                </View>
                <View style={{alignItems:'center', marginTop:height*.1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={[styles.textInput,{alignItems:'center', borderWidth:0, backgroundColor:'#343434'}]}>
                            <Text style={[styles.TextiputHeader,{color:'rgba(255,255,255,1)'}]} >Go To HomeScreen</Text>
                        </TouchableOpacity>

                    </View>
			</View>
		);  
	} 
}