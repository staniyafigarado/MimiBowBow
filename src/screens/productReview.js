import React from 'react';
import { Text, View, Dimensions, Image, BackHandler, FlatList, Alert } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
//import { Rating, AirbnbRating } from 'react-native-ratings';
import { Rating, AirbnbRating } from 'react-native-elements';
import styles from '../styles/styles';
import WooCommerce from '../utils/wooApi';
import AsyncStorage from '@react-native-community/async-storage';
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
import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('window')

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            ratingValue: 0,
            reviewComment: '',
            productId: null,
        };
    }
    componentDidMount() {
        const { navigation } = this.props;
        const productId = navigation.getParam('productId', 'Null');
        console.log(productId)
        // WooCommerce.get('products/reviews').then(response => {
        //     console.log(response.data + "123");
        //     this.setState({
        //         dataSource: response.data,
        //         isLoading : false,
        //     });
        // }).catch(error => {
        //     console.log(error + "123");
        // });
        // console.log(this.state.dataSource + "Hi")
        this.setState({
            productId: productId,
            isLoading: false,
        });
    }
    submitReview = async () => {
        const userData = (JSON.parse(await AsyncStorage.getItem('userData')));
        WooCommerce.post('products/reviews', {
            product_id: this.state.productId,
            review: this.state.reviewComment,
            reviewer: userData.username,
            reviewer_email: userData.email,
            rating: this.state.ratingValue
        }).then(response => {
            console.log(response);
            Alert.alert("Information", "Thank You..");
            this.props.navigation.navigate('Home')
        }).catch(error => {
            console.log(error);
        });
    }
    ratingCompleted = (rating) => {
        this.setState({
            ratingValue: rating,
        });
        console.log("Rating is: " + rating)
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
                    <PacmanIndicator
                        count={5}
                        color='black'
                        animationDuration={600}
                        size={100}
                    />
                </View>
            );
        }
        else {
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CartPage')}>
                            <Icon name='cart' size={40} type='material-community' color='#343434' />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.textInput, { marginLeft: width * .05, borderWidth: 0, marginBottom: 3, elevation: 5 }]}>
                        <SearchBar
                            //ref="searchBar"
                            placeholder="Search Here"
                        //onChangeText={...}
                        //onSearchButtonPress={...}
                        //onCancelButtonPress={...}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
                        <Text style={[styles.TitleText, { color: '#343434', fontSize: 20 }]}>Order Review</Text>

                    </View>
                    <View style={{ width: width * .90, height: height * .5, backgroundColor: 'white', marginLeft: width * .05, marginRight: width * .05, borderRadius: 5, padding: width * .05, alignItems: 'flex-start' }}>
                        <Rating imageSize={25} onFinishRating={this.ratingCompleted} startingValue={0} />
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: '#343434', paddingTop: 10 }}> {this.state.ratingValue}/5 rating</Text>
                        <TextInput style={{ height: height * .08, width: width * .8, backgroundColor: 'white', fontFamily: 'Montserrat-Regular', }}
                            placeholder={this.state.reviewComment ? this.state.reviewComment : "Write a review"}
                            keyboardType='email-address'
                            returnKeyType={"next"}
                            onChangeText={reviewComment => this.setState({ reviewComment })}
                        />
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={reviewComment => this.setState({ reviewComment: "Very Good" })} style={styles.reviewBtn}>
                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: '#343434', paddingTop: 10 }}>Very Good</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={reviewComment => this.setState({ reviewComment: "Good" })} style={styles.reviewBtn}>
                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: '#343434', paddingTop: 10 }}>Good</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={reviewComment => this.setState({ reviewComment: "Good Quality" })} style={styles.reviewBtn}>
                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: '#343434', paddingTop: 10 }}>Good Quality</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={reviewComment => this.setState({ reviewComment: "Average" })} style={styles.reviewBtn}>
                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: '#343434', paddingTop: 10 }}>Average</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={reviewComment => this.setState({ reviewComment: "Satisfied" })} style={styles.reviewBtn}>
                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: '#343434', paddingTop: 10 }}>Satisfied</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={reviewComment => this.setState({ reviewComment: "Bad" })} style={styles.reviewBtn}>
                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 14, color: '#343434', paddingTop: 10 }}>Bad</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', paddingBottom: height * .025 }}>
                        <TouchableOpacity
                            onPress={() => { this.submitReview() }}
                            style={{ width: width * .9, marginTop: width * .05, alignItems: 'center', justifyContent: 'center', backgroundColor: '#343434', height: height * 0.08, borderRadius: 3 }}>
                            <Text style={[styles.TextiputHeader, { color: 'rgba(255,255,255,1)' }]}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}