import React, { Component } from 'react'
import {Provider} from 'react-redux';
import Header from './Header/header.js';

import Body from './Body/body.js';
import PostedBy from './PostedBy/postedBy.js';
import configureStore from '../configureStore';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();
const store = configureStore();

export default class Root extends Component{
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter history={history}>
            <Header/>
            <Switch>
              <Route exact path="/" component={Body}/>
              <Route path='/postedBy' component={PostedBy} />
            </Switch>
          </BrowserRouter>
      </Provider>
    );
  }
}
