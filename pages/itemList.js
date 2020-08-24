import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from './styles';

const { width, height } = Dimensions.get('window')

export default class App extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, backgroundColor:'#f5c711'}}>
				<View style={{flexDirection:'row', height:height*.1, alignItems:'center', justifyContent:'space-between', margin:width*.05}}>
					<Icon name='menu' size={40} type='material-icons' color='#343434'/>
        			<TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')}>
						<Icon name='cart' size={40} type='material-community' color='#343434' />
					</TouchableOpacity>
				</View>
				<View style={[styles.textInput,{marginLeft:width*.05, borderWidth:0, marginBottom:3, elevation:5}]}>
					<SearchBar
						//ref="searchBar"
						placeholder="Search Here"
						//onChangeText={...}
						//onSearchButtonPress={...}
						//onCancelButtonPress={...}
						/>
				</View>
				<ScrollView>
					<View>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Categories')} style={{flexDirection:'row', height:height*.1, alignItems:'center', justifyContent:'space-between', marginLeft:width*.05, marginRight:width*.05 }}>
							<Text style={[styles.TitleText,{color:'rgba(255,255,255,1)'}]}>Categories</Text>
							<Icon name='arrow-right' size={30} type='material-community' color='white' />
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);  
	} 
}