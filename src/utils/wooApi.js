'use strict';
import WooCommerceAPI from 'react-native-wc-api';
//import WooCommerceAPI from 'react-native-woocommerce-api';


const WooCommerce = new WooCommerceAPI({
    url: 'http://mimiandbowbow.com/test',  //Url
    consumerKey: 'ck_b34ef05e06c5ed2552985cecf0bcdb2b1d12980d',   //Your Consumer Key
    consumerSecret: 'cs_195a049ec42844c5e62aff632c40a6f8f51ca04c',  //Your Consumer Secret
    wpAPI: true,
    version: 'wc/v3',
    queryStringAuth: true,
    ssl: true,
  }); 
  // const WooCommerce = new WooCommerceAPI({
  //   url: 'http://mimiandbowbow.com/alpha',  //Url
  //   consumerKey: 'ck_246eaaebd2afd51c1e45db9699e8d6f984109b29',   //Your Consumer Key
  //   consumerSecret: 'cs_727cb9bfe9a5b3c1308cc446e178e62f8d5e6bbc',  //Your Consumer Secret
  //   wpAPI: true,
  //   version: 'wc/v3',
  //   queryStringAuth: true,
  //   ssl: true,
  // });

  export default WooCommerce;  
  


// 'use strict';
// import WooCommerceAPI from 'react-native-wc-api';

// const WooCommerce = new WooCommerceAPI({
//     url: 'http://mimiandbowbow.com/test',  //Url
//     consumerKey: 'ck_b34ef05e06c5ed2552985cecf0bcdb2b1d12980d',   //Your Consumer Key
//     consumerSecret: 'cs_195a049ec42844c5e62aff632c40a6f8f51ca04c',  //Your Consumer Secret
//     wpAPI: true,
//     version: 'wc/v3',
//     queryStringAuth: true
// }); 

// export default WooCommerce;  