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