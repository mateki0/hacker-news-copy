import React, { Component } from 'react'
import {Provider} from 'react-redux';
import Header from './Header';
import Body from './Body/body.js';
import configureStore from '../configureStore';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Logo from './Logo/index.js';

const history = createBrowserHistory();
const store = configureStore();

export default class Root extends Component{
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter history={history}>
        <Logo/>
            <Header/>
            <Switch>
              <Route exact path="/" component={Body}/>
            </Switch>
          </BrowserRouter>
      </Provider>
    );
  }
}
