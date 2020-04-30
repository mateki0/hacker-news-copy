import React, {Component} from 'react';
import './search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import onClickOutside from 'react-onclickoutside';


class Search extends Component{
  constructor(props){
    super(props);
    this.state={
      stories: 'Stories',
      popularity:'Popularity',
      time: 'All time',
      storiesOpen: false,
      popularityOpen:false,
      timeOpen:false,
    }
  }
  handleStories = this.handleStories.bind(this);
  handlePopularity = this.handlePopularity.bind(this);
  handleTime = this.handleTime.bind(this);
  handleStoriesDropdown = this.handleStoriesDropdown.bind(this);
  handlePopularityDropdown = this.handlePopularityDropdown.bind(this);
  handleTimeDropdown = this.handleTimeDropdown.bind(this);
  handleFilterChange = this.handleFilterChange.bind(this)

  handleFilterChange(){
    this.setState({
        timeOpen: false,
        storiesOpen:false,
        popularityOpen:false
      })
  }
  handleClickOutside() {
    this.setState({
        timeOpen: false,
        storiesOpen:false,
        popularityOpen:false
      })
  }
    handleStories(e){
      this.setState({
        stories: e.currentTarget.innerText,
      })
      this.handleFilterChange()
    }
    handlePopularity(e){
      this.setState({
        popularity: e.currentTarget.innerText,
      })
      this.handleFilterChange()
    }
    handleTime(e){
      this.setState({
        time: e.currentTarget.innerText,
      })
      this.handleFilterChange()
    }
   handleStoriesDropdown(){
      this.setState({
        storiesOpen: !this.state.storiesOpen,
        popularityOpen:false,
        timeOpen: false,
      })
    };
    handlePopularityDropdown(){
      this.setState({
        popularityOpen: !this.state.popularityOpen,
        storiesOpen:false,
        timeOpen:false,
      })
    };
    handleTimeDropdown(){
      this.setState({
        timeOpen: !this.state.timeOpen,
        storiesOpen:false,
        popularityOpen:false,
      })
    };


  render(){
    return(
      <div className="filters">
        <div className="category">
          <span>Search</span>
        </div>
        <div className="category">

          <div className="dropdown"  >
          <label onClick={this.handleStoriesDropdown} class="storiesLabel" style={{width:`${(6*this.state.stories.length)+50}px`}}>{this.state.stories} </label>
        <ul className="storiesOpen" style={this.state.storiesOpen === true ? {display:'block'} : {display:'none'} } >
              <li onClick={this.handleStories}>All</li>
              <li onClick={this.handleStories}>Stories</li>
              <li onClick={this.handleStories}>Comments</li>
            </ul>
          </div>
          <span>by</span>
          <div className="dropdown">
          <label onClick={this.handlePopularityDropdown} style={{width:`${(6*this.state.popularity.length)+50}px`}}>{this.state.popularity}</label>
        <ul className="popularityOpen" style={this.state.popularityOpen === true ? {display:'block'} : {display:'none'} }>
              <li onClick={this.handlePopularity}>Popularity</li>
              <li onClick={this.handlePopularity}>Date</li>
            </ul>
          </div>
        </div>
        <div className="category">
          <span>for</span>
          <div className="dropdown">
          <label onClick={this.handleTimeDropdown} style={{width:`${(6*this.state.time.length)+50}px`}}>{this.state.time}</label>
        <ul className="timeOpen" style={this.state.timeOpen === true ? {display:'block'} : {display:'none'} }>
              <li onClick={this.handleTime}>All time</li>
              <li onClick={this.handleTime}>Last 24h</li>
              <li onClick={this.handleTime}>Past Week</li>
              <li onClick={this.handleTime}>Past Month</li>
              <li onClick={this.handleTime}>Past Year</li>
              <li onClick={this.handleTime}>Custom Range</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
// var clickOutsideConfig = {
//   handleClickOutisde: function(instance){
//     return instance.myClickOutsideHandler
//   }
// }
export default onClickOutside(Search);
