import React, {Component} from 'react';
import Filters from '../Filters';
import SearchBar from '../SearchBar';

class Header extends Component {
  render(){
    return(
      <header>
        <SearchBar />
        <Filters/>
      </header>
    )
  }
}
export default Header;