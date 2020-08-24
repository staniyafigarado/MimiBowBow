import React from 'react';
import { Text, View, Dimensions, Image, Alert, Modal, ImageBackground, Button } from 'react-native';
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
          isVisible: false,
        };
    }
    componentDidMount = async() => {
        const { navigation } = this.props;  
        const petData = navigation.getParam('petData', 'Null');  
        

        WooCommerce.get('products').then(response => {
            this.setState({
                productData : petData,
                isLoading : false,
            });
        }).catch(error => {
            console.log(error + "123");
        });
      }
      addToCart = async (item) =>{
        const existingCart = await AsyncStorage.getItem('cart')
        //console.log(item)
        this.setState({
            //cartData : [...this.state.cartData, item],
            btnValue : 2,
            isVisible: true
        });
        let newProduct = JSON.parse(existingCart);
        if( !newProduct ){
            newProduct = []
        }
        newProduct.push(item);
        await AsyncStorage.setItem('cart', JSON.stringify(newProduct) )
        .then( ()=>{
        console.log('It was saved successfully')
        } )
        .catch( ()=>{
        console.log('There was an error saving the product')
        } )
        //   try {
        //     await AsyncStorage.clear()
        //     console.log('Storage successfully cleared!')
        //   } catch (e) {
        //     console.log('Failed to clear the async storage.')
        //   }
    }
    goToCart = async () =>{
        const existingProducts = await AsyncStorage.getItem('cart')
        let newProduct = JSON.parse(existingProducts);
        console.log("newProduct")
        console.log(newProduct)
        
    }
    modalClose = () =>{
        console.log("Hi")
        this.setState({
            isVisible: false
        });
    }
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
        			<TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')}>
						<Icon name='cart' size={40} type='material-community' color='#343434' />
					</TouchableOpacity>
				</View>
                <View style={{flexDirection:'row', marginLeft:width*.05, alignItems:'center'}}>
                    <View>
                        <Text style={[styles.TitleText,{color:'rgba(255,255,255,1)', width:width*.7}]}>{this.state.productData.name}</Text>
                        <Text style={{fontFamily:'Montserrat-Medium', fontSize:12,color:'rgba(255,255,255,1)'}}>Lorem ipsum dolor sit amet, consetetur sadipscing</Text>
                    </View>
                    <Icon name='share-variant' size={25} type='material-community' color='rgba(255,255,255,1)' margin={20}/>
                </View>
                <ScrollView>
                    <View style={{borderRadius:5, width:width*.9, margin:width*.05, height:height*.7}}>
                        <Image
                            source={{uri : this.state.productData.images[0] ? this.state.productData.images[0].src: "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png"}}
                            style={{ width: width*.9, height: height*.35,borderRadius:2,resizeMode: 'stretch' }}
                            />
                        <View style={{height:height*.35, backgroundColor:'rgba(255,255,255,1)',padding:width*.05}}>
                            <Text style={{ fontSize:23,fontFamily:'Montserrat-Medium'}}>Price : ₹{this.state.productData.price}‎ </Text>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                <Rating
                                    type='custom'
                                    ratingColor='#f5c711'
                                    ratingBackgroundColor='white'
                                    ratingCount={5}
                                    imageSize={20}
                                    style={{ paddingVertical: 10 }}
                                    />
                                <Text style={{fontFamily:'Montserrat-Regular', fontSize:12}}>4/5 rating</Text>
                                <Text style={{fontFamily:'Montserrat-Regular', fontSize:12}}>(673 reviews)</Text>
                            </View>
                            <Text style={{fontFamily:'Montserrat-Regular', color:'rgba(0,0,0,1)'}}>Description</Text>
                            <Text style={{fontFamily:'Montserrat-Regular', fontSize:11, color:'rgba(0,0,0,.7)'}} numberOfLines={2}>{this.state.productData.description}</Text>
                            {this.state.btnValue === 1? 
                            <TouchableOpacity onPress={() => this.addToCart(this.state.productData)} style={{width:width*.8,marginTop:width*.05 ,alignItems:'center', justifyContent:'center', backgroundColor:'#343434',height:height*0.08, borderRadius:3}}>
                                <Text style={[styles.TextiputHeader,{ color:'rgba(255,255,255,1)'}]}>ADD TO CART</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')} style={{width:width*.8,marginTop:width*.05 ,alignItems:'center', justifyContent:'center', backgroundColor:'#343434',height:height*0.08, borderRadius:3}}>
                                <Text style={[styles.TextiputHeader,{ color:'rgba(255,255,255,1)'}]}>GO TO CART</Text>
                            </TouchableOpacity>}

                        </View>

                    </View>
                </ScrollView>
                <View style={{justifyContent:'center'}}>
                    <Modal            
                    animationType = {"fade"}  
                    transparent = {true}  
                    visible = {this.state.isVisible}  
                    onRequestClose = {() =>{ console.log("Modal has been closed.") }}>  
                        <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.8)'}}>
                            <ImageBackground source={require('../images/Alert1.png')} style={{width: width*1, height: width*1, justifyContent
                            :'flex-end', alignItems:'center', marginTop:height*.25}} >
                                {/* <TouchableOpacity onPress = {() => {this.setState({ isVisible:!this.state.isVisible})}} style={[styles.textInputLogin,{alignItems:'center',backgroundColor:'#343434', borderWidth:0}]}>
                        <Text style={[styles.TextiputHeader,{color:'rgba(255,255,255,1)'}]} >CLOSE</Text>
                    </TouchableOpacity> */}
                                <Button style={[styles.textInputLogin,{alignItems:'center',backgroundColor:'#343434', borderWidth:0}]} title="CLOSE" onPress = {() => {this.setState({ isVisible:!this.state.isVisible})}}/>
                            </ImageBackground> 
                        </View> 
                    </Modal>
                </View>
                
                
				
			</View>
		);  
	}} 
}