import React from 'react';
import { Text, View, Dimensions, Image, Alert, FlatList, TextInput } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from '../styles/styles';
import WooCommerce from '../utils/wooApi';
import AsyncStorage from '@react-native-community/async-storage'
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
					<Icon name='cart' size={40} type='material-community' color='#343434' />
				</View>
				<View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
					<Text style={[styles.TitleText, { fontFamily: 'Montserrat-SemiBold', fontSize: 20 }]}>Coming Soon....</Text>

				</View>
			</View>
		);
	}
}