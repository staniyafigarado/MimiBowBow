import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, Linking, FlatList, Dimensions, Image, TouchableOpacity, TouchableHighlight, ImageBackground } from 'react-native';
const { width, height } = Dimensions.get('window')
import { StackActions, NavigationActions } from 'react-navigation';

export default class App extends React.Component {

//   onPress = async () => {
//     await AsyncStorage.removeItem('token');
//     const resetAction = StackActions.reset({
//           index: 0,
//           actions: [NavigationActions.navigate({ routeName: 'Login' })],
//         });
//         this.props.navigation.dispatch(resetAction);
//   }
//   webview(){
//     this.props.navigation.push('WebView')
//   }

  async componentDidMount() {
    
   
    try {
        await AsyncStorage.clear()
        console.log('Storage successfully cleared!')
        //this.props.navigation.navigate('Login')
    } catch (e) {
        console.log('Failed to clear the async storage.')
    }
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Registration' })],
      });
      this.props.navigation.dispatch(resetAction);
}
  
  render() {
    return (
    	<View>

        </View>
    );
  }
}