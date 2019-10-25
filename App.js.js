import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import { YellowBox } from 'react-native';


import { View } from 'react-native';
import AppChild from "./src/AppChild";
import store from './src/store/index.js';
import { Provider } from 'react-redux';
import { Toast } from 'react-native-redux-toast';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


export default class App extends Component {



  constructor() {
    super();
    this.state = {
      isReaddy: false
    };

     //global.apiurl = 'http://innorade.in/seller/location/';
  }




  render() {
    return (
      <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AppChild />
        <Toast messageStyle={{ color: 'white' }} />
        </View>
      </Provider>

    );
  }
}
