import React, {Component} from 'react';
import './search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import onClickOutside from 'react-onclickoutside';
import {storiesChange, popularityChange, timeChange, storiesDropdown,popularityDropdown,timeDropdown} from '../../articlesActions'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../articlesActions'
import {getStories,getPopularity,getTime} from '../../articles'
class Search extends Component{
  constructor(props){
    super(props);

  }
  handleStories = this.handleStories.bind(this);
  handlePopularity = this.handlePopularity.bind(this);
  handleTime = this.handleTime.bind(this);
  handleStoriesDropdown = this.handleStoriesDropdown.bind(this);
  handlePopularityDropdown = this.handlePopularityDropdown.bind(this);
  handleTimeDropdown = this.handleTimeDropdown.bind(this);
  handleFilterChange = this.handleFilterChange.bind(this);
  handleClickOutside = this.handleClickOutside.bind(this)
  componentDidMount(){
    window.addEventListener('mousedown', this.handleClickOutside)
  }
  handleFilterChange(){

  }
    handleClickOutside(e) {
      console.log(e.currentTarget.parentElement.className)
    }
    handleStories(e){
      const {storiesChange} = this.props;
      storiesChange(e.currentTarget.innerText);
      //console.log(e.currentTarget.parentElement.className)
    }
    handlePopularity(e){
      const {popularityChange} = this.props;
      popularityChange(e.currentTarget.innerText);
    }
    handleTime(e){
      const {timeChange} = this.props;
      timeChange(e.currentTarget.innerText);
    }
   handleStoriesDropdown(){
      const {storiesDropdown} = this.props;
      storiesDropdown();
    };
    handlePopularityDropdown(){
      const {popularityDropdown} = this.props;
      popularityDropdown();
    };
    handleTimeDropdown(){
      const {timeDropdown} = this.props;
      timeDropdown();
    };


  render(){
    const {stories,popularity,time, storiesOpen, popularityOpen, timeOpen} = this.props.stories.filter
    return(
      <div className="filters">
        <div className="category">
          <span>Search</span>
        </div>
        <div className="category">

          <div className="dropdown"  >
          <label onClick={this.handleStoriesDropdown} className="storiesLabel" style={{width:`${(6*stories.length)+50}px`}}>{stories}</label>
        <ul className="storiesOpen" style={storiesOpen === true ? {display:'block'} : {display:'none'} }  >
              <li onClick={this.handleStories}>All</li>
              <li onClick={this.handleStories}>Stories</li>
              <li onClick={this.handleStories}>Comments</li>
            </ul>
          </div>
          <span>by</span>
          <div className="dropdown">
          <label onClick={this.handlePopularityDropdown} style={{width:`${(6*popularity.length)+50}px`}}>{popularity}</label>
        <ul className="popularityOpen" style={popularityOpen === true ? {display:'block'} : {display:'none'} } >
              <li onClick={this.handlePopularity}>Popularity</li>
              <li onClick={this.handlePopularity}>Date</li>
            </ul>
          </div>
        </div>
        <div className="category">
          <span>for</span>
          <div className="dropdown">
          <label onClick={this.handleTimeDropdown} style={{width:`${(6*time.length)+50}px`}}>{time}</label>
        <ul className="timeOpen" style={timeOpen === true ? {display:'block'} : {display:'none'} } >
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
/// handle click outside !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const mapStateToProps = state => ({
    stories: getStories(state),
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
    storiesChange: storiesChange,
    popularityChange: popularityChange,
    timeChange: timeChange,
    storiesDropdown:storiesDropdown,
    popularityDropdown:popularityDropdown,
    timeDropdown:timeDropdown,
  }, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Search);
