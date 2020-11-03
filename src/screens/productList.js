import React from 'react';
import { Text, View, Dimensions, Image, BackHandler, FlatList } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Badge } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'
import styles from '../styles/styles';
import WooCommerce from '../utils/wooApi';
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

const DataArray = require("../screens/categoryData.json");

const { width, height } = Dimensions.get('window')

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listView: 1,
            isLoading: true,
            gridView: true,
            selectedCategory: '',
            dataSource: [], isSelected: true,
        };
        this.arrayholder = []
    }

    updateTitleStatus = () =>
        this.setState({
        }, () => {
            //this.ButtonState();
            if (this.state.isSelected == true) {
                this.setState({
                    isSelected: false
                });
            } else {
                this.setState({
                    isSelected: true
                });
            }
        });

    // componentDidMount = async () => {
    //     const { navigation } = this.props;
    //     const categoryValue = navigation.getParam('categoryValue', 'Dog');
    //     console.log(categoryValue);
    //     WooCommerce.get('products?per_page=100', { per_page: 100 }).then(response => {
    //         console.log(response.data + "123");
    //         this.setState({
    //             dataSource: response.data,
    //             isLoading: false,
    //             selectedCategory: categoryValue
    //         });
    //         this.arrayholder = response.data;
    //     }).then(()=>{
    //         WooCommerce.get('products/categories?per_page=100', { per_page: 100 }).then((responseData) => {
    //          this.setState({
    //             state: responseData.location.state,
    //             isFinish: true
    //          });
    //      }).done();
    //     }).catch(error => {
    //         console.log(error + "123");
    //     });
    //     console.log(this.state.dataSource + "Hi")
    //     // WooCommerce.get('products')
    //     //     .then(data => {
    //     //         console.log("gjnhmh", data);
    //     //         this.setState({
    //     //             data: data
    //     //         })
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error);
    //     //     });
    //     const existingCart = await AsyncStorage.getItem('cart');
    //     this.setState({
    //         cartCount: JSON.parse(existingCart).length
    //     });
    // }
    componentDidMount = async () => {
        const { navigation } = this.props;
        const categoryValue = navigation.getParam('categoryValue', 'Dogs');
        console.log(categoryValue);
        WooCommerce.get('products?per_page=100', { per_page: 100 }).then(response => {
            console.log(response.data + "123");
            this.setState({
                dataSource: response.data,
                isLoading: false,
                selectedCategory: categoryValue
            });
            this.arrayholder = response.data;
        }).catch(error => {
            console.log(error + "123");
        });
        console.log(this.state.dataSource + "Hi")
        // WooCommerce.get('products')
        //     .then(data => {
        //         console.log("gjnhmh", data);
        //         this.setState({
        //             data: data
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        const existingCart = await AsyncStorage.getItem('cart');
        this.setState({
            cartCount: JSON.parse(existingCart).length
        });
    }
    categoryChange = (value) => {
        this.setState({
            selectedCategory: value
        })
    }
    viewType = (value) => {
        if (value === 2) {
            this.setState({
                listView: 2,
                gridView: false
            });
        }
        else {
            this.setState({
                listView: 1,
                gridView: true
            });

        }
    }
    // List View
    renderItemList = ({ item }) => {
        return <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PetDetails', { petData: item })}
            style={{ padding: width * .025, backgroundColor: 'rgba(255,255,255,1)', borderTopWidth: 2, borderTopColor: '#f5c711', flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '35%' }}>
                <Image
                    source={{ uri: item.images[0] ? item.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
                    style={{ width: height * .17, height: height * .17, }}
                /></View>
            <View style={{ width: '65%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Rating
                        type='custom'
                        ratingColor='#f5c711'
                        ratingBackgroundColor='white'
                        ratingCount={5}
                        imageSize={20}
                        style={{ paddingVertical: 0 }}
                    />
                    <Text style={[styles.TitleText, { color: '#343434', fontSize: 12 }]}>4.5/5 rating</Text>
                    <Icon name='arrow-right' size={20} type='material-community' color='#343434' />
                </View>
                <Text style={[styles.TitleText, { color: '#343434', fontSize: 16 }]}>{item.name}</Text>
                <Text style={[styles.TitleText, { color: '#343434', fontSize: 12 }]}>₹{item.price}</Text>
                <Text style={[styles.textinputTextSmall, { color: '#343434', marginLeft: 0, width: '95%', fontSize: 10, textAlign: 'justify' }]}>{item.short_description}</Text>
            </View>
        </TouchableOpacity>
    }
    // Grid view
    renderItemGrid = ({ item }) => {
        return <View>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('PetDetails', { petData: item })}
                style={{ width: width * .5, backgroundColor: 'rgba(255,255,255,1)', borderRightWidth: .7, height: height * .37 }}>
                <Image
                    source={{ uri: item.images[0] ? item.images[0].src : "https://www.aiimsnagpur.edu.in/sites/default/files/inline-images/no-image-icon_27.png" }}
                    // source={{ uri: item.image }}
                    style={{ width: width * .5, height: width * .5, }}
                />
                <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-between', width: '100%' }}>
                    <Text style={[styles.TitleText, { color: '#343434', fontSize: 14, width: '55%' }]} numberOfLines={1}>{item.name}</Text>
                    <Rating imageSize={15} style={{ width: '45%' }} readonly startingValue={item.rating_count} />
                </View>
                <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-between', width: '100%' }}>
                    <Text style={[styles.TitleText, { color: '#343434', fontSize: 12, width: '70%' }]}>₹{item.price}</Text>
                    <Text style={[styles.TitleText, { color: '#343434', fontSize: 12, width: '30%' }]}>{item.rating_count}/5 rating</Text>
                </View>
            </TouchableOpacity>
        </View>
    }
    // filter = () => {
    //     const newData = this.state.dataSource.filter(item => {
    //         return item.categories[0].name === this.state.selectedCategory;
    //     })
    //     this.setState({
    //         dataSource: newData
    //     }); this.renderItem();
    // }

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData,
        });
    };
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
        return (
            <View style={{ flex: 1, backgroundColor: '#f5c711' }}>
                <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', margin: width * .05 }}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.toggleDrawer(); }}
                    >
                        <Icon name='menu' size={40} type='material-icons' color='#343434' />
                    </TouchableOpacity>
                    {/* <Icon name='menu' size={40} type='material-icons' color='#343434' /> */}
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
                <View style={[styles.textInput, { marginLeft: width * .05, borderWidth: 0, marginBottom: 3, elevation: 5 }]}>
                    <SearchBar
                        // ref="searchBar"
                        placeholder="Search Here"
                        textColor={'black'}
                        lightTheme
                        onChangeText={text => this.searchFilterFunction(text)}
                        autoCorrect={false}
                        value={this.state.value}
                        lightTheme={true}
                    //onSearchButtonPress={...}
                    //onCancelButtonPress={...}
                    />
                </View>
                {/* categories */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
                        <Text style={[styles.TitleText, { color: 'rgba(255,255,255,1)' }]}>Categories</Text>
                        {/* <Icon name='arrow-right' size={30} type='material-community' color='white' onPress={() => this.props.navigation.navigate('Categories')} /> */}
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: width * .025 }}>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                            data={DataArray}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => { this.categoryChange(item.value); }} style={{ marginLeft: width * .025, marginRight: 0, margin: width * .025, alignItems: 'center' }}>
                                    <View style={[styles.homeCategoryViewSmall, { backgroundColor: item.name == this.state.selectedCategory ? '#C49500' : 'rgba(255,255,255,1)' }]}>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={styles.homeCategoryImageSmall}
                                        />
                                    </View>
                                    <Text style={[styles.textinputTextSmall, { marginLeft: 0 }]}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', height: height * .1, alignItems: 'center', justifyContent: 'space-between', marginLeft: width * .05, marginRight: width * .05 }}>
                        <Text style={[styles.TitleText, { color: '#343434', width: width * .6 }]}>{this.state.selectedCategory}</Text>
                        <TouchableOpacity onPress={this.updateTitleStatus}>
                            <Icon name='view-grid' size={30} type='material-community' color='#343434' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.updateTitleStatus}>
                            <Icon name='view-list' size={30} type='material-community' color='#343434' />
                        </TouchableOpacity>

                        {/* <Icon name='arrow-right' size={30} type='material-community' color='#343434' /> */}
                    </View>
                    {/* pet list */}
                    {this.state.isSelected ? <View>
                        <FlatList
                            style={{ marginBottom: height * .1 }}
                            keyExtractor={(item, index) => index}
                            numColumns={this.state.gridView ? 2 : 1}
                            data={this.state.dataSource.filter(item => {
                                return item.categories[0].name === this.state.selectedCategory;
                            })}
                            extraData={this.state}
                            renderItem={this.renderItemGrid}
                        />
                    </View> : <View>
                            <FlatList
                                style={{ marginBottom: height * .1 }}
                                keyExtractor={(item, index) => index}
                                numColumns={this.state.gridView ? 2 : 1}
                                data={this.state.dataSource.filter(item => {
                                    return item.categories[0].name === this.state.selectedCategory;
                                })}
                                extraData={this.state}
                                renderItem={this.renderItemList}
                            />
                        </View>}

                </ScrollView>
            </View>
        );

    }
}