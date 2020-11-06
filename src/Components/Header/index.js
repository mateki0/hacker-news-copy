import React, {Component} from 'react';
import Filters from '../Filters';
import SearchBar from '../SearchBar';
import Logo from '../Logo/index.js';
class Header extends Component {
  render(){
    return(
      <header>
      <Logo />
        <SearchBar />
        <Filters/>
      </header>
    )
  }
}
export default Header;