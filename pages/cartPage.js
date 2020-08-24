import React from 'react';
import { Text, View, Dimensions, Image, Alert, FlatList } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from './styles';
import WooCommerce from './wooApi';
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
    constructor(props) {
        super(props);
        this.state = {
          listView: 1,
          isLoading: true,
          gridView : true,
          productData: [],
          cartData:[],
          btnValue: 1,
          qnty: 1,
        };
    }
    componentDidMount = async() => {
        const { navigation } = this.props;  
        const petData = navigation.getParam('petData', 'Null');  
        const existingCart = await AsyncStorage.getItem('cart')
        

        WooCommerce.get('products').then(response => {
            this.setState({
                productData : JSON.parse(existingCart),
                isLoading : false,
            });
        }).catch(error => {
            console.log(error + "123");
        });
      }
    //   addToCart = async (item) =>{
    //     const existingCart = await AsyncStorage.getItem('cart')
    //     //console.log(item)
    //     this.setState({
    //         //cartData : [...this.state.cartData, item],
    //         btnValue : 2,
    //     });
    //     let newProduct = JSON.parse(existingCart);
    //     if( !newProduct ){
    //         newProduct = []
    //     }
    //     newProduct.push(item);
    //     await AsyncStorage.setItem('cart', JSON.stringify(newProduct) )
    //     .then( ()=>{
    //     console.log('It was saved successfully')
    //     } )
    //     .catch( ()=>{
    //     console.log('There was an error saving the product')
    //     } )
    //     //   try {
    //     //     await AsyncStorage.clear()
    //     //     alert('Storage successfully cleared!')
    //     //   } catch (e) {
    //     //     alert('Failed to clear the async storage.')
    //     //   }
    // }
    // goToCart = async () =>{
    //     const existingProducts = await AsyncStorage.getItem('cart')
    //     let newProduct = JSON.parse(existingProducts);
    //     console.log("newProduct")
    //     console.log(newProduct)
        
    // }
	render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor:'#f5c711'}}>
                    <PacmanIndicator
                        count={5}
                        color='black'
                        animationDuration={600}
                        size={100}
                    />
              </View>
            );
        }
        else{
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
        			<Icon name='cart' size={40} type='material-community' color='#343434' />
				</View>
                <View style={{flexDirection:'row', height:height*.1, alignItems:'center', justifyContent:'space-between', marginLeft:width*.05, marginRight:width*.05 }}>
                        <Text style={[styles.TitleText,{fontFamily:'Montserrat-SemiBold', fontSize:20}]}>My Cart</Text>
                        
                    </View>
                <ScrollView>
                        <FlatList
                            keyExtractor={(item, index) => index}
                            data={this.state.productData}
                            renderItem={({ item, index }) => (
                            item !=null?
                            <View style={{flexDirection:'row', width:width*.95, height:height*.2, backgroundColor:'white', margin:width*.025, borderRadius:5}}>
							<Image
								source={{uri : item.images[0] ? item.images[0].src: "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
								style={{ width: height*.12, height: height*.12, margin:height*.015, }}
								/>
							<View style={{padding:height*.015}}>
								<Text style={{ fontFamily:'Montserrat-Regular', width:width*.5,paddingBottom:height*.015}} numberOfLines={1}>{item.name}</Text>
								<Text style={{fontFamily:'Montserrat-Regular', color:'#00AE51',paddingBottom:height*.015, fontSize:13}}>{item.stock_status.toUpperCase()}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontFamily:'Montserrat-Regular',paddingBottom:height*.015}}>Quantity      </Text>
                                    <Text style={{fontFamily:'Montserrat-Bold',paddingBottom:height*.015, fontSize:12}}>-      </Text>
                                    <Text style={{fontFamily:'Montserrat-Bold',paddingBottom:height*.015, fontSize:12}}>{this.state.qnty}      </Text>
                                    <TouchableOpacity onPress = {() => {this.setState({ qnty:this.state.qnty+1})}}>
                                        <Text style={{fontFamily:'Montserrat-Bold',paddingBottom:height*.015}}>+    </Text>
                                    </TouchableOpacity>
                                </View>
							</View>
							<View style={{justifyContent:'center', alignItems:'center', marginLeft:width*.15}}>
								<Icon name='chevron-right' size={50} type='material-community' color='rgba(52,52,52,.2)' />
							</View>
						</View>
                            : <View><Text>Nothing To Show</Text></View>
                            )}
						/>    
                    </ScrollView>
			</View>
		);  
	}} 
}