import React, {Component} from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
class Header extends Component{


  render(){
    return(
      <header >
        <div className="navBar">
          <div className="logo">
            <a href="/"><div className="logoH">H</div><span className="logoS">Search<br/> Hacker News</span></a>
          </div>
          <div className="searchBar">
            <input placeholder="Search stories by title, url or author" />
            <div className="searchBy">
              <FontAwesomeIcon icon={faSearch}/>
            </div>
          </div>
          <div className="settings">
            <FontAwesomeIcon icon={faCog}/>
            <span>Settings</span>
          </div>
        </div>
      </header>

    )
  }
}

export default Header;
