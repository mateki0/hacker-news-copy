import React from 'react';
import './App.css';
import Header from './Components/Header/header.js';
import Search from './Components/Search/search.js';
import Body from './Components/Body/body.js';
function App() {
  return (
    <div className="App">
      <Header/>
      <Search/>
      <Body/>
    </div>
  );
}

export default App;
