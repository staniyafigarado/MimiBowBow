import React from 'react';
import { Text, View, Dimensions, Image, FlatList } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import styles from '../styles/styles';
// import Apps from '../App';
const DataArray = require("../screens/categoryData.json");
const { width, height } = Dimensions.get('window')

export default class App extends React.Component {

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#f5c711' }}>
				<View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', margin: width * .05 }}>

					<Icon name='menu' size={40} type='material-community' color='#343434' />

					<Image
						source={require('../assets/images/logo.png')}
						style={{ width: height * .07, height: height * .07 }}
					/>
					<Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 17 }}>
						Mimi and Bow Bow
					</Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')}>
						<Icon name='cart' size={40} type='material-community' color='#343434' />
					</TouchableOpacity>
				</View>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ paddingLeft: 4 }}>
						<FlatList
							numColumns={2}
							keyExtractor={(item, index) => index}
							data={DataArray}
							renderItem={({ item, index }) => (
								<TouchableOpacity onPress={() =>
									this.props.navigation.navigate('ProductList', {
										categoryValue: item.value,
									})}
									style={{ flexDirection: 'row', paddingLeft: width * .025, paddingBottom: width * .025 }}>
									<View style={styles.categoryView}>
										<Image
											source={{ uri: item.image }}
											style={styles.categoryImage}
										/>
										<Text style={[styles.textinputText, { marginLeft: 0 }]}>{item.name}</Text>
									</View>
								</TouchableOpacity>
							)}
						/>
					</View>
					{/* <View style={{flexDirection:'row', paddingLeft:width*.025, paddingBottom:width*.025}}>
					<View style={styles.categoryView}>
						<Image
							source={require('../images/dog.png')}
							style={styles.categoryImage}
						/>
						<Text style={[styles.textinputText,{marginLeft:0}]}>Dog</Text>	
					</View>
                    <View style={[styles.categoryView,{ marginLeft:width*.05}]}>
						<Image
							source={require('../images/cat.png')}
							style={styles.categoryImage}
						/>
						<Text style={[styles.textinputText,{marginLeft:0}]}>Cat</Text>	
					</View>
                </View>
                <View style={{flexDirection:'row', paddingLeft:width*.025, paddingBottom:width*.025}}>
					<View style={styles.categoryView}>
						<Image
							source={require('../images/fish.png')}
							style={styles.categoryImage}
						/>
						<Text style={[styles.textinputText,{marginLeft:0}]}>Fish</Text>	
					</View>
                    <View style={[styles.categoryView,{ marginLeft:width*.05}]}>
						<Image
							source={require('../images/smallpet.png')}
							style={styles.categoryImage}
						/>
						<Text style={[styles.textinputText,{marginLeft:0}]}>Small Pet</Text>	
					</View>
                </View>
                <View style={{flexDirection:'row', paddingLeft:width*.025, paddingBottom:width*.025}}>
					<View style={styles.categoryView}>
						<Image
							source={require('../images/bird.png')}
							style={styles.categoryImage}
						/>
						<Text style={[styles.textinputText,{marginLeft:0}]}>Bird</Text>	
					</View>
                    <View style={[styles.categoryView,{ marginLeft:width*.05}]}>
						<Image
							source={require('../images/others.png')}
							style={styles.categoryImage}
						/>
						<Text style={[styles.textinputText,{marginLeft:0}]}>Others</Text>	
					</View>
                </View> */}
				</ScrollView>


			</View>
		);
	}
}