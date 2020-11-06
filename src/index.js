
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Root from './Components/Root';
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
  margin: 0;
  font-family: 'Monda', sans-serif;
  padding: 0 20px;
  min-height: 100%;
  background-color:#F8F9F9;
  margin:0 auto;
  @media only screen and (min-width:768px){
    padding:0;
    width:85vw
  }
  @media only screen and (min-width:1024px){
    width:85vw;
    padding:0;
  }
  @media only screen and (min-width:1280px){
    width:65vw;
    }
}
`
ReactDOM.render(
  <>
  <GlobalStyle />
  <Root/>
  </>,
document.getElementById('root')
);


serviceWorker.unregister();
