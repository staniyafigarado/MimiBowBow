import React from 'react';
import { StatusBar, Text, View, Dimensions, Image, BackHandler, FlatList, SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, SearchBar, Badge } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-community/async-storage';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from './styles';
import WooCommerce from './wooApi';
const { width, height } = Dimensions.get('window')
const DataArray = require("./categoryData");



export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			cartAmount: 0,
			value: 0,
			search: [],
			cartCount: 0
		};
	}

	componentDidMount = async () => {
		WooCommerce.get('products', { per_page: 100 }).then(response => {
			this.setState({
				search: response.data,
			});
		}).catch(error => {
			console.log(error + "123");
		});
		this.getData();
		//setInterval(this.getData, 5000); 
		console.log(DataArray)
	}
	getData = async () => {
		const existingCart = await AsyncStorage.getItem('cart');

		this.setState({
			cartCount: JSON.parse(existingCart).length
		});
	}
	updateSearch = (search) => {
		this.setState({ search });
	};

	render() {
		const { navigate } = this.props.navigation;
		const { search } = this.state;
		return (
			<View style={{ flex: 1, backgroundColor: '#f5c711', paddingBottom: 55 }}>
				<StatusBar barStyle="dark-content" hidden={true} backgroundColor="rgba(255,255,255,1)" translucent={true} />
				<View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', margin: width * .05 }}>
					<TouchableOpacity onPress={() => { this.props.navigation.toggleDrawer(); }}>
						<Icon name='menu' size={40} type='material-icons' color='#343434' />
					</TouchableOpacity>
					<Image
						source={require('../images/logo.png')}
						style={{ width: height * .07, height: height * .07 }}
					/>
					<Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17 }}>
						Mimi and Bow Bow
					</Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')}>

						<Icon name='cart' size={40} type='material-community' color='#343434' />
						{this.state.cartCount != 0 ?
							<Badge value={this.state.cartCount} status="error" containerStyle={{ position: 'absolute', top: -1, right: -1 }} />
							: null
						}

					</TouchableOpacity>

				</View>
				<View style={[styles.textInput, { marginLeft: width * .05, borderWidth: 0, marginBottom: 3, elevation: 5, height: null }]}>
					<SearchableDropdown
						chip={true}
						onTextChange={text => console.log(text)}
						onItemSelect={item => this.props.navigation.navigate('PetDetails', { petData: item })}
						containerStyle={{ padding: 5 }}
						textInputStyle={styles.textinputText}
						itemStyle={styles.textinputText}
						itemTextStyle={{
							color: '#222',
						}}
						itemsContainerStyle={{
							maxHeight: '95%',
						}}
						items={this.state.search}
						defaultIndex={0}
						placeholder="Search Here"
						resetValue={false}
						underlineColorAndroid="transparent"
						listProps={
							{
								nestedScrollEnabled: true,
							}
						}
					/>
				</View>
				{/* Categories section */}
				<ScrollView>
					<View>
						<View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
							<Text style={[styles.TitleText, { color: 'rgba(255,255,255,1)' }]}>Categories</Text>
							<Icon name='arrow-right' size={30} type='material-community' color='white' onPress={() => this.props.navigation.navigate('Categories')} />
						</View>
						<View style={{ flexDirection: 'row' }}>
							<ScrollView horizontal>
								<FlatList
									horizontal={true}
									keyExtractor={(item, index) => index}
									data={DataArray}
									renderItem={({ item, index }) => (
										<TouchableOpacity onPress={() =>
											this.props.navigation.navigate('ProductList', {
												categoryValue: item.value,
											})}
											style={{ marginRight: 0, margin: width * .025, alignItems: 'center' }}>
											<View style={styles.homeCategoryView}>
												<Image
													source={{ uri: item.image }}
													style={styles.homeCategoryImage}
												/>
											</View>
											<Text style={[styles.textinputText, { marginLeft: 0 }]}>{item.name}</Text>
										</TouchableOpacity>
									)}
								/>
							</ScrollView>
						</View>
						{/* Membership */}
						<View style={{ flexDirection: 'row', alignItems: 'center', height: height * .08, backgroundColor: '#343434', padding: width * .05 }}>
							<Icon name='wallet-membership' size={25} type='material-community' color='white' />
							<Text style={{ fontFamily: 'Montserrat-Medium', color: 'white', fontSize: 17, marginLeft: width * .03 }}>Membership Account </Text>
							<TouchableOpacity onPress={() => this.props.navigation.navigate('Store')}>
								<Text style={{ fontFamily: 'Montserrat-Medium', color: '#FDC500', fontSize: 15, marginLeft: width * .15 }}>Join Now</Text>
							</TouchableOpacity>
						</View>
						{/* todays deal */}
						<Text style={[styles.TitleText, { color: 'rgba(255,255,255,1)', fontSize: 20, marginLeft: width * .05, marginTop: width * .03, }]}>Today's Deal</Text>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('PetDetails')} style={{ flexDirection: 'row', width: width * .95, height: height * .17, backgroundColor: 'white', margin: width * .025, borderRadius: 5 }}>
							<Image
								source={require('../images/labrador.png')}
								style={{ width: height * .14, height: height * .14, margin: height * .015 }}
							/>
							<View style={{ justifyContent: 'space-between', paddingBottom: 10 }}>
								<Rating
									type='custom'
									ratingColor='#f5c711'
									ratingBackgroundColor='white'
									ratingCount={5}
									imageSize={25}
									style={{ paddingVertical: 10 }}
								/>
								<Text style={{ fontSize: 23, fontFamily: 'Montserrat-Regular' }}>Labrador</Text>
								<View style={{ flexDirection: 'row' }}>
									<Text style={{ fontFamily: 'Montserrat-Regular' }}>₹7000</Text>
									<Text style={{ textDecorationLine: 'line-through', marginLeft: width * .07, fontFamily: 'Montserrat-Regular', color: '#707070' }}>₹10000</Text>

								</View>
							</View>
							<View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: width * .15 }}>
								<Icon name='chevron-right' size={50} type='material-community' color='rgba(52,52,52,.2)' />
							</View>
						</TouchableOpacity>
						<View style={{ flexDirection: 'row', width: width * .95, height: height * .17, backgroundColor: 'white', margin: width * .025, borderRadius: 5 }}>
							<Image
								source={require('../images/kitty.png')}
								style={{ width: height * .14, height: height * .14, margin: height * .015 }}
							/>
							<View style={{ justifyContent: 'space-between', paddingBottom: 10 }}>
								<Rating
									type='custom'
									ratingColor='#f5c711'
									ratingBackgroundColor='white'
									ratingCount={5}
									imageSize={25}
									style={{ paddingVertical: 10 }}
								/>
								<Text style={{ fontSize: 23, fontFamily: 'Montserrat-Regular' }}>Labrador</Text>
								<View style={{ flexDirection: 'row' }}>
									<Text style={{ fontFamily: 'Montserrat-Regular' }}>₹7000</Text>
									<Text style={{ textDecorationLine: 'line-through', marginLeft: width * .07, fontFamily: 'Montserrat-Regular', color: '#707070' }}>₹10000</Text>

								</View>
							</View>
							<View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: width * .15 }}>
								<Icon name='chevron-right' size={50} type='material-community' color='rgba(52,52,52,.2)' />
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}