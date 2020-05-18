import React, {Component} from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {getArticles} from '../../articles';
import {Search} from '../../articlesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
class Header extends Component{
  handleSearch = (e) => {
    e.preventDefault()
    const {Search} = this.props
    const {articles} = this.props.articles;
    const input = document.querySelector('.searchInput').value
    let arr= [];
    articles.map(a=>{
      if((a['by'] !== undefined && a['by'].includes(input))
      || (a['title'] !== undefined && a['title'].includes(input))
      || (a['url'] !== undefined && a['url'].includes(input)))
      {
        arr.push(a)
      }
    })

    Search(arr, input)
    console.log(arr)
  }

  render(){

    return(
      <header >
        <div className="navBar">
          <div className="logo">
            <a href="/"><div className="logoH">H</div><span className="logoS">Search<br/> Hacker News</span></a>
          </div>
          <div className="searchBar">
            <input className="searchInput" placeholder="Search stories by title, url or author in current filter" />
            <div className="searchBy">
              <FontAwesomeIcon onClick={this.handleSearch} icon={faSearch}/>
            </div>
          </div>
          <div className="settings">
            {/* <FontAwesomeIcon icon={faCog}/>
            <span>Settings</span> */}
          </div>
        </div>
      </header>

    )
  }
}
const mapStateToProps = state => ({
  articles: getArticles(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  Search:Search
}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Header);
