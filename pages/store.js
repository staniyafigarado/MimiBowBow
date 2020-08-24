
'use strict';
import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';
import WooCommerce from './wooApi';

//import WooCommerceAPI from 'react-native-woocommerce-api';
import WooCommerceAPI from 'react-native-wc-api';

// var WooCommerceAPI1 = new WooCommerceAPI({
//   url: 'https://mimiandbowbow.com/test', // Your store URL
//   ssl: true,
//   consumerKey: 'ck_b34ef05e06c5ed2552985cecf0bcdb2b1d12980d', // Your consumer secret
//   consumerSecret: 'cs_195a049ec42844c5e62aff632c40a6f8f51ca04c', // Your consumer secret
//   wpAPI: true, // Enable the WP REST API integration
//   version: 'wc/v3', // WooCommerce WP REST API version
//   queryStringAuth: true
// });

// const WooCommerce = new WooCommerceAPI({
//   url: 'http://mimiandbowbow.com/test',  //Url
//   consumerKey: 'ck_b34ef05e06c5ed2552985cecf0bcdb2b1d12980d',   //Your Consumer Key
//   consumerSecret: 'cs_195a049ec42844c5e62aff632c40a6f8f51ca04c',  //Your Consumer Secret
//   wpAPI: true,
//   version: 'wc/v3',
//   queryStringAuth: true,
//   ssl: true,
// }); 

export default class App extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    WooCommerce.get('products').then(response => {
      console.log(response.data[0].name);
        }).catch(error => {
            console.log(error + "123");
        });

  }

  

  render() {
    return (
      <View style={styles.container}>
       
        <View style={styles.CircleShapeView}>
        </View>


        <View style={styles.OvalShapeView} >

        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },

  CircleShapeView: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
    backgroundColor: '#00BCD4'
},

OvalShapeView: {
  marginTop: 20,
  width: 100,
  height: 100,
  backgroundColor: '#00BCD4',
  borderRadius: 50,
  transform: [
    {scaleX: 5}
  ]
},

});