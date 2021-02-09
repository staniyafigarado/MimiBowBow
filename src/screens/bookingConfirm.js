import React from 'react';
import { Text, View, Dimensions, Image, TextInput, StatusBar } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
//import DatePicker from 'react-native-datepicker';
import { Container, Header, Content, DatePicker, Button } from 'native-base';
import styles from '../styles/styles';

const { width, height } = Dimensions.get('window')


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ItemSelector: '',
            date: "12-08-2020",
        };
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <StatusBar barStyle="dark-content" hidden={true} backgroundColor="#FDC500" translucent={true} />
                <View style={{ flexDirection: 'row', height: height * .15, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FDC500', width: '100%', padding: width * 0.06 }}>
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
                <View style={{ flexDirection: 'row', height: height * .43, alignItems: 'flex-end', justifyContent: 'center', backgroundColor: '#FFF', }}>
                    <Image
                        source={require('../assets/images/doctor.png')}
                        style={{ height: height * .4, width: width * 0.55, resizeMode: 'stretch', justifyContent: 'center', alignItems: 'center' }}
                    />
                    {/* <Image
                        source={require('../assets/images/dog2.png')}
                        style={{ height: width * 0.2, width: width * 0.3, resizeMode: 'stretch' }}
                    /> */}

                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.TitleText, { color: '#343434' }]}>Appoinment Fixed</Text>
                    <Text style={[styles.TitleText, { color: '#343434' }]}> 26 August 2020 </Text>
                    <Text style={[styles.TitleText, { color: '#343434', fontSize: 25 }]}> 11.00 am </Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: height * .07 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={[styles.textInput, { alignItems: 'center', borderWidth: 0, backgroundColor: '#FDC500', elevation: 3 }]}>
                        <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]} >Go To HomeScreen</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}