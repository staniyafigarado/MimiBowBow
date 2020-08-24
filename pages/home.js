import React from 'react';
import { Text, View, Dimensions, Image, BackHandler, FlatList } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from './styles';

const { width, height } = Dimensions.get('window')
const DataArray = require("./categoryData"); 
  


export default class App extends React.Component {
	// componentDidMount() {
	// 	BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
	// 	console.log(DataArray[0].image); 
	// }
	// handleBackButton(){
	// 		  BackHandler.exitApp();
	// 	  }
	render() {
		const { navigate } = this.props.navigation;  
		return (
			<View style={{ flex: 1, backgroundColor:'#f5c711'}}>
				<View style={{flexDirection:'row', height:height*.1, alignItems:'center', justifyContent:'space-between', margin:width*.05}}>
					<TouchableOpacity onPress={() => { this.props.navigation.toggleDrawer(); }}>
						<Icon name='menu' size={40} type='material-icons' color='#343434'/>
					</TouchableOpacity>
					<Image
					source={require('../images/logo.png')}
					style={{ width: height*.07, height: height*.07}}
					/>  
					<Text style={{fontFamily:'Montserrat-Regular', fontSize:17}}>
					Mimi and Bow Bow
					</Text>
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
						<View style={{flexDirection:'row'}}>
							<ScrollView horizontal>
								<FlatList
									horizontal={true}
									keyExtractor={(item, index) => index}
									data={DataArray}
									renderItem={({ item, index }) => (
									<TouchableOpacity onPress={() =>  
										this.props.navigation.navigate('ProductList', {  
											categoryValue: item.value, })} 
											style={{marginRight:0,margin:width*.025, alignItems:'center'}}>
										<View style={styles.homeCategoryView}>
											<Image
												source={{uri:item.image}}
												style={styles.homeCategoryImage}
												/>
										</View>
										<Text style={[styles.textinputText,{marginLeft:0}]}>{item.name}</Text>
									</TouchableOpacity>
									)}
								/>
							</ScrollView>
						</View>
						<View style={{flexDirection:'row', alignItems:'center', height:height*.08, backgroundColor:'#343434', padding:width*.05}}>
							<Icon name='wallet-membership' size={25} type='material-community' color='white' />
							<Text style={{fontFamily:'Montserrat-Medium', color:'white', fontSize:17, marginLeft:width*.03}}>Membership Account </Text>
							<Text style={{fontFamily:'Montserrat-Medium',color:'#FDC500', fontSize:15, marginLeft:width*.15}}>Join Now</Text>
						</View>
						<Text style={[styles.TitleText,{color:'rgba(255,255,255,1)', fontSize:20, marginLeft:width*.05, marginTop:width*.03,}]}>Today's Deal</Text>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('PetDetails')} style={{flexDirection:'row', width:width*.95, height:height*.17, backgroundColor:'white', margin:width*.025, borderRadius:5}}>
							<Image
								source={require('../images/labrador.png')}
								style={{ width: height*.14, height: height*.14, margin:height*.015 }}
								/>
							<View style={{justifyContent:'space-between', paddingBottom:10}}>
								<Rating
									type='custom'
									ratingColor='#f5c711'
									ratingBackgroundColor='white'
									ratingCount={5}
									imageSize={25}
									style={{ paddingVertical: 10 }}
									/>
								<Text style={{ fontSize:23,fontFamily:'Montserrat-Regular'}}>Labrador</Text>
								<View style={{flexDirection:'row'}}>
									<Text style={{fontFamily:'Montserrat-Regular'}}>₹7000</Text>
									<Text style={{textDecorationLine: 'line-through', marginLeft:width*.07,fontFamily:'Montserrat-Regular', color:'#707070'}}>₹10000</Text>

								</View>
							</View>
							<View style={{justifyContent:'center', alignItems:'center', marginLeft:width*.15}}>
								<Icon name='chevron-right' size={50} type='material-community' color='rgba(52,52,52,.2)' />
							</View>
						</TouchableOpacity>
						<View style={{flexDirection:'row', width:width*.95, height:height*.17, backgroundColor:'white', margin:width*.025, borderRadius:5}}>
							<Image
									source={require('../images/kitty.png')}
									style={{ width: height*.14, height: height*.14, margin:height*.015 }}
									/>
							<View style={{justifyContent:'space-between', paddingBottom:10}}>
								<Rating
									type='custom'
									ratingColor='#f5c711'
									ratingBackgroundColor='white'
									ratingCount={5}
									imageSize={25}
									style={{ paddingVertical: 10 }}
									/>
								<Text style={{ fontSize:23,fontFamily:'Montserrat-Regular'}}>Labrador</Text>
								<View style={{flexDirection:'row'}}>
									<Text style={{fontFamily:'Montserrat-Regular'}}>₹7000</Text>
									<Text style={{textDecorationLine: 'line-through', marginLeft:width*.07,fontFamily:'Montserrat-Regular', color:'#707070'}}>₹10000</Text>

								</View>
							</View>
							<View style={{justifyContent:'center', alignItems:'center', marginLeft:width*.15}}>
								<Icon name='chevron-right' size={50} type='material-community' color='rgba(52,52,52,.2)' />
							</View>
						</View>	
					</View>
				</ScrollView>
			</View>
		);  
	} 
}