import React from 'react';
import { StatusBar, Text, View, Dimensions, Image, BackHandler, FlatList, SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, SearchBar, Badge } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-community/async-storage';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from '../styles/styles';
import WooCommerce from '../utils/wooApi';
import RazorpayCheckout from 'react-native-razorpay';
import { ImageBackground } from 'react-native';
const { width, height } = Dimensions.get('window');
const DataArray = require("../screens/categoryData.json");
const labrador = require('../assets/images/labrador.png');
const kitty = require('../assets/images/kitty.png');
const data = [
	{
		id: '1',
		title: 'Labrador',
		image: labrador,
		price: 7000,
		discount: 10000
	},
	{
		id: '2',
		title: 'Kitty',
		image: kitty,
		price: 7000,
		discount: 10000
	},
	{
		id: '3',
		title: 'Labrador',
		image: labrador,
		price: 7000,
		discount: 10000
	},
	{
		id: '4',
		title: 'Kitty',
		image: kitty,
		price: 7000,
		discount: 10000
	},
	{
		id: '5',
		title: 'Labrador',
		image: labrador,
		price: 7000,
		discount: 10000
	},
	{
		id: '6',
		title: 'Kitty',
		image: kitty,
		price: 7000,
		discount: 10000
	},
];

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			cartAmount: 0,
			value: 0,
			search: [],
			cartCount: 0, dataSource: [],
			selectedCategory: '',
			DogData: [],
			banners: []
		};
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
	}

	async componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
		// this.categories();
		this.todaysDeal();
		this.dogCategory();
		WooCommerce.get('products?category=33,173,36,175,174,191&per_page=100').then(response => {
			this.setState({
				search: response.data,
			});
		}).catch(error => {
			console.log(error + "123");
		});
		// this.getData();
		this.banners();
		console.log(DataArray)
		const existingCart = await AsyncStorage.getItem('cart');
		this.setState({
			cartCount: JSON.parse(existingCart).length
		});
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	}
	handleBackButtonClick() {
		this.props.navigation.goBack(null);
		return true;
	}
	todaysDeal() {
		WooCommerce.get('products?category=252', { per_page: 100 }).then(response => {
			console.log(response.data + "123");
			this.setState({
				dataSource: response.data,
				isLoading: false,
			});
		}).catch(error => {
			console.log(error.message + "123");
		});
	}
	dogCategory() {
		// WooCommerce.get('products?per_page=100').then(response => {
		// 	console.log(response.data + "123");
		// 	this.setState({
		// 		DogData: response.data,
		// 		isLoading: false,
		// 		selectedCategory: 'Dogs'
		// 	});
		// 	this.arrayholder = response.data;
		// }).catch(error => {
		// 	console.log(error + "123");
		// });
		// console.log(this.state.DogData + "Hi")
		WooCommerce.get('products?category=33&per_page=100', { per_page: 100 }).then(response => {
			console.log(response.data + "Dogs");
			this.setState({
				DogData: response.data,
				isLoading: false,
				selectedCategory: 'Dogs'
			});
		}).catch(error => {
			console.log(error + "123");
		});
		console.log(this.state.dataSource + "Hi")
	}

	banners() {
		// return fetch('https://mimiandbowbow.com/alpha/wp-json/wp/v2/posts?_embed?consumer_key=ck_3dc8e609d9bf166cc09293bf3ebdb6a0c19bb46d&consumer_secret=cs_18122b00e28ea61f7560e0d0e16ad4075aa8f326')
		// 	.then((response) => response.json())
		// 	.then((json) => {
		// 		console.log(json);
		// 		this.setState({ banners: json })
		// 		console.log(JSON.stringify(json.images.medium[0]))
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});

		var myHeaders = new Headers();
		myHeaders.append("X-Shopify-Storefont-Access-Token", "18e4894f164b996610cbcb4f8690b6be");
		myHeaders.append("Accept", "application/json");
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
		};

		fetch("https://mimiandbowbow.com/alpha/wp-json/wp/v2/posts?_embed&consumer_key=ck_3dc8e609d9bf166cc09293bf3ebdb6a0c19bb46d&consumer_secret=cs_18122b00e28ea61f7560e0d0e16ad4075aa8f326", requestOptions)
			// .then(response => response.text())
			// .then(result => {
			// 	console.log(result)

			// })
			.then(response => response.json())
			.then((data) => {
				console.log(data)
				this.setState({ banners: data })
				console.log(this.state.banners[0].images.medium)
			})
			.catch(error => console.log('error', error));
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

	handlePayment() {
		var options = {
			description: 'Credits towards',
			image: 'https://i.imgur.com/3g7nmJC.png',
			currency: 'INR',
			key: 'rzp_test_mEZUIlmpj11S15',
			amount: '5000',
			name: 'Acme Corp',
			// order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
			prefill: {
				email: 'staniyafigarado@gmail.com',
				contact: '9656039412',
				name: 'staniya figarado'
			},
			theme: { color: '#f5c711' }
		}
		RazorpayCheckout.open(options).then((data) => {
			// handle success
			alert(`Success: ${data.razorpay_payment_id}`);
		}).catch((error) => {
			// handle failure
			alert(`Error: ${error.code} | ${error.description}`);
		});
	}
	render() {
		const { navigate } = this.props.navigation;
		const { search } = this.state;
		return (
			<View style={{ flex: 1, backgroundColor: '#f5c711' }}>
				<StatusBar barStyle="dark-content" hidden={true} backgroundColor="rgba(255,255,255,1)" translucent={true} />
				<View style={{ flexDirection: 'row', height: height * .07, alignItems: 'center', justifyContent: 'space-between', margin: width * .05 }}>
					<TouchableOpacity onPress={() => { this.props.navigation.toggleDrawer(); }}>
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
						{this.state.cartCount != 0 ?
							/* {this.state.cartCount = 0 ? */
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
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ paddingBottom: height * 0.1, backgroundColor: '#FFF' }}>
						<View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
							<Text style={[styles.TitleText]}>Categories</Text>
							<Icon name='arrow-right' size={30} type='material-community' color='#343434' onPress={() => this.props.navigation.navigate('Categories')} />
						</View>
						<View style={{ flexDirection: 'row' }}>
							<ScrollView horizontal showsHorizontalScrollIndicator={false}>
								<FlatList
									horizontal={true}
									keyExtractor={(item, index) => index}
									data={DataArray}
									renderItem={({ item, index }) => (
										<TouchableOpacity onPress={() =>
											this.props.navigation.navigate('ProductList', {
												categoryValue: item.value,
											})}
											style={{ marginRight: 0, margin: width * .025, alignItems: 'center', }}>
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
						<View style={{ flexDirection: 'row', alignItems: 'center', height: height * .08, backgroundColor: '#FDC500', padding: width * .05 }}>
							<Icon name='wallet-membership' size={25} type='material-community' color='white' />
							<Text style={{ fontFamily: 'Montserrat-Medium', color: 'white', fontSize: 17, marginLeft: width * .03 }}>Membership Account </Text>
							<TouchableOpacity
								// onPress={() => this.handlePayment()}
								onPress={() => this.props.navigation.navigate('MemebershipAccount')}
							>
								<Text style={{ fontFamily: 'Montserrat-Medium', color: '#343434', fontSize: 15, marginLeft: width * .15 }}>Join Now</Text>
							</TouchableOpacity>
						</View>
						{/* Horizontal scroll options */}
						<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
							<View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'column' }}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('PetSitter')}>
									<View style={{ width: 65, height: 65, borderRadius: 10, backgroundColor: '#FDC500', justifyContent: 'center', alignItems: 'center' }}>
										<Image source={require('../assets/images/petsitterIcon.png')} style={{ width: 34, height: 43 }}></Image>
										{/* <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14', marginTop: 5 }}>Pet Sitter</Text> */}
									</View>
									<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginTop: 5, textAlign: 'center' }}>Pet Sitter</Text>
								</TouchableOpacity>
							</View>
							<View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'column' }}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('DogWalker')}>
									<View style={{ width: 65, height: 65, borderRadius: 10, backgroundColor: '#FEF24E', justifyContent: 'center', alignItems: 'center' }}>
										<Image source={require('../assets/images/dogwalker.png')} style={{ width: 45, height: 43 }}></Image>
										{/* <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14', marginTop: 5 }}>Pet Sitter</Text> */}
									</View>
									<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginTop: 5, textAlign: 'center' }}>Dog Walker</Text>
								</TouchableOpacity>
							</View>
							<View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'column' }}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('Shipping')}>
									<View style={{ width: 65, height: 65, borderRadius: 10, backgroundColor: '#FDFD66', justifyContent: 'center', alignItems: 'center' }}>
										<Image source={require('../assets/images/shipping.png')} style={{ width: 44, height: 26 }}></Image>
										{/* <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14', marginTop: 5 }}>Pet Sitter</Text> */}
									</View>
									<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginTop: 5, textAlign: 'center' }}>Shipping</Text>
								</TouchableOpacity>
							</View>
							<View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'column' }}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('Events')}>
									<View style={{ width: 65, height: 65, borderRadius: 10, backgroundColor: '#FDFD96', justifyContent: 'center', alignItems: 'center' }}>
										<Image source={require('../assets/icons/eventIcon.png')} style={{ width: 31, height: 31 }}></Image>
										{/* <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14', marginTop: 5 }}>Pet Sitter</Text> */}
									</View>
									<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginTop: 5, textAlign: 'center' }}>Events</Text>
								</TouchableOpacity>
							</View>
							<View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'column' }}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('DoctorsList')}>
									<View style={{ width: 65, height: 65, borderRadius: 10, backgroundColor: '#FDFD96', justifyContent: 'center', alignItems: 'center' }}>
										<Image source={require('../assets/icons/doctorIcon.png')} style={{ width: 22, height: 32 }}></Image>
										{/* <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14', marginTop: 5 }}>Pet Sitter</Text> */}
									</View>
									<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginTop: 5, textAlign: 'center' }}>Doctor</Text>
								</TouchableOpacity>
							</View>
							<View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'column' }}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('BiddingList')}>
									<View style={{ width: 65, height: 65, borderRadius: 10, backgroundColor: '#FEFEBE', justifyContent: 'center', alignItems: 'center' }}>
										<Image source={require('../assets/images/bidding.png')} style={{ width: 36, height: 35 }}></Image>
										{/* <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: '14', marginTop: 5 }}>Pet Sitter</Text> */}
									</View>
									<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginTop: 5, textAlign: 'center' }}>Bidding</Text>
								</TouchableOpacity>
							</View>
						</ScrollView>
						{/* offers */}
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<ImageBackground
								source={require('../assets/images/pug.png')}
								style={{ width: width * .5, height: 225 }}>
								<View style={{ padding: 15 }}>
									<Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, color: '#343434' }}>PUG</Text>
									<Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 10, color: '#343434' }}>20% OFF</Text>
								</View>
							</ImageBackground>
							<ImageBackground source={require('../assets/images/fighter.png')}
								style={{ width: width * .5, height: 225 }}>
								<View style={{ padding: 15, position: 'absolute', bottom: 0, right: 0 }}>
									<Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, color: '#343434', textAlign: 'right' }}>FIGHTER FISH</Text>
									<Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 10, color: '#343434', textAlign: 'right' }}>40% FLAT OFF</Text>
								</View>
							</ImageBackground>
						</View>
						{/* todays deal */}
						<Text style={[styles.TitleText, { color: '#343434', fontSize: 20, marginLeft: width * .05, marginTop: width * .03, }]}>Today's Deal</Text>
						<View>
							<FlatList
								data={this.state.dataSource}
								renderItem={({ item }) => (
									<TouchableOpacity
										activeOpacity={.9}
										onPress={() => this.props.navigation.navigate('PetDetails', { petData: item })}>
										{/* <View style={{ flexDirection: 'row', width: width * .95, height: height * .17, backgroundColor: 'white', margin: width * .025, borderRadius: 5, elevation: 7 }}>
											<Image
												// source={item.image}
												source={{ uri: item.images[0] ? item.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
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
												<Text style={{ fontSize: 23, fontFamily: 'Montserrat-Regular' }}>{item.name}</Text>
												<View style={{ flexDirection: 'row' }}>
													<Text style={{ fontFamily: 'Montserrat-Regular' }}>₹{item.price}</Text>
													<Text style={{ textDecorationLine: 'line-through', marginLeft: width * .07, fontFamily: 'Montserrat-Regular', color: '#707070' }}>₹{item.regular_price}</Text>

												</View>
											</View>
											{/* <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: width * .15 }}>
												<Icon name='chevron-right' size={50} type='material-community' color='rgba(52,52,52,.2)' />
											</View> */}
										{/* </View> */}
										<View style={{ width: width * .95, backgroundColor: 'white', margin: width * .025, borderRadius: 5, elevation: 5, height: 90, flexDirection: 'row', alignItems: 'center' }}>
											<View style={{ width: '27%' }}>
												<Image source={{ uri: item.images[0] ? item.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
													style={{ height: '100%', width: 80, borderRadius: 5 }}></Image>
											</View>
											<View style={{ width: '73%' }}>
												<View style={{ flexDirection: 'row', marginBottom: 5 }}>
													<Rating
														type='custom'
														ratingBackgroundColor='white'
														ratingColor='#f5c711'
														ratingCount={5}
														imageSize={15}
													/>
													<Text style={[styles.TitleText, { color: '#343434', fontSize: 12, marginLeft: 5, color: '#343434' }]}>{item.rating_count}/5 rating</Text>
												</View>
												<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>{item.name}</Text>
												<View style={{ flexDirection: 'row' }}>
													<Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13 }}>₹{item.price}</Text>
													<Text style={{ textDecorationLine: 'line-through', marginLeft: width * .07, fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#707070' }}>₹{item.regular_price}</Text>

												</View>
											</View>
										</View>
									</TouchableOpacity>
								)}
								keyExtractor={item => item.id}
							// extraData={selected}
							/>
						</View>


						{/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Categories')} style={{ flexDirection: 'row', width: width * .95, height: height * .17, backgroundColor: 'white', margin: width * .025, borderRadius: 5 }}>
							<Image
								source={require('../assets/images/labrador.png')}
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
						</TouchableOpacity> */}
						{/* pets */}
						<View style={{ alignItems: 'center' }}>
							<ImageBackground source={require('../assets/images/pets.png')}
								style={{ width: '100%', height: 125 }}>
								<View style={{ paddingHorizontal: 30, paddingVertical: 10, right: 0, position: 'absolute' }}>
									<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, color: '#FFF', textAlign: 'right' }}>All Category</Text>
									<Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#FFF', textAlign: 'right' }}>Available</Text>
									<View style={{ borderWidth: 1, borderColor: '#FFF', borderRadius: 4, width: 86, height: 27, justifyContent: 'center', right: 0, marginTop: 5 }}>
										<TouchableOpacity onPress={() => this.props.navigation.navigate('Categories')} >
											<Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 10, color: '#FFF', textAlign: 'center' }}>Explore Now</Text>
										</TouchableOpacity>
									</View>
								</View>
							</ImageBackground>
						</View>
						{/* Dog category list */}
						<Text style={[styles.TitleText, { color: '#343434', fontSize: 20, marginLeft: width * .05, marginTop: width * .03, }]}>Dogs</Text>
						<View>
							<FlatList
								// data={this.state.dataSource.filter(item => {
								// 	return item.categories[0].name === this.state.selectedCategory;
								// })}
								data={this.state.DogData}
								renderItem={({ item }) => (
									<TouchableOpacity
										activeOpacity={.9}
										onPress={() => this.props.navigation.navigate('PetDetails', { petData: item })}>
										<View style={{ width: width * .95, backgroundColor: 'white', margin: width * .025, borderRadius: 5, elevation: 5, height: 90, flexDirection: 'row', alignItems: 'center' }}>
											<View style={{ width: '27%' }}>
												<Image source={{ uri: item.images[0] ? item.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
													style={{ height: '100%', width: 80, borderRadius: 5 }}></Image>
											</View>
											<View style={{ width: '73%' }}>
												<View style={{ flexDirection: 'row', marginBottom: 5 }}>
													<Rating
														type='custom'
														ratingBackgroundColor='white'
														ratingColor='#f5c711'
														ratingCount={5}
														imageSize={15}
													/>
													<Text style={[styles.TitleText, { color: '#343434', fontSize: 12, marginLeft: 5, color: '#343434' }]}>{item.rating_count}/5 rating</Text>
												</View>
												<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>{item.name}</Text>
												<View style={{ flexDirection: 'row' }}>
													<Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13 }}>₹{item.price}</Text>
													<Text style={{ textDecorationLine: 'line-through', marginLeft: width * .07, fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#707070' }}>₹{item.regular_price}</Text>

												</View>
											</View>
										</View>
									</TouchableOpacity>
								)}
								keyExtractor={item => item.id}
							/>
						</View>
						{/* Banner */}
						<View style={{ alignItems: 'center' }}>
							<ImageBackground source={require('../assets/images/banner.png')}
								style={{ width: '100%', height: 250 }}>
								<View style={{ paddingHorizontal: 30, paddingVertical: 10, right: 0, position: 'absolute', marginTop: 5 }}>
									<Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, color: '#FFF', textAlign: 'right' }}>Are you a pet seller ?</Text>
									<Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#FFF', textAlign: 'right' }}>ship your products</Text>
									<Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#FFF', textAlign: 'right' }}>through us</Text>
									<View style={{ borderWidth: 1, borderColor: '#FFF', borderRadius: 4, width: 86, height: 27, justifyContent: 'center', right: 0, marginTop: 5 }}>
										<TouchableOpacity onPress={() => this.props.navigation.navigate('Shipping')} >
											<Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 10, color: '#FFF', textAlign: 'center' }}>Ship Now</Text>
										</TouchableOpacity>
									</View>
								</View>
							</ImageBackground>
						</View>
					</View>

				</ScrollView>
			</View>
		);
	}
}