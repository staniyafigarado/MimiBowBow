import React from 'react'
import { View, SafeAreaView } from 'react-native';
import MainNav from './src/navigations/RootNavigation';
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <MainNav />
        </SafeAreaView>
      </View>
    );
  }
}