import React, { Component } from 'react'
import {Provider} from 'react-redux';
import Header from './Header/header.js';
import Search from './Search/search.js';
import Body from './Body/body.js';
import configureStore from '../configureStore';

const store = configureStore();

export default class Root extends Component{
  render(){
    return (
      <Provider store={store}>
          <Header/>
          <Search/>
          <Body/>
      </Provider>
    );
  }
}
