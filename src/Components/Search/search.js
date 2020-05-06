import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {fetchArticles } from '../../articlesActions'
//import onClickOutside from 'react-onclickoutside';
import {storiesChange, popularityChange, timeChange, storiesDropdown,popularityDropdown,timeDropdown,closeDropdowns} from '../../articlesActions'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {getStories} from '../../articles'
class Search extends Component{

  handleStories = this.handleStories.bind(this);
  handlePopularity = this.handlePopularity.bind(this);
  handleTime = this.handleTime.bind(this);
  handleStoriesDropdown = this.handleStoriesDropdown.bind(this);
  handlePopularityDropdown = this.handlePopularityDropdown.bind(this);
  handleTimeDropdown = this.handleTimeDropdown.bind(this);
  handleClickOutside = this.handleClickOutside.bind(this);
  handleChange = this.handleChange.bind(this)
  handleChange(){
    const {fetchArticles} = this.props;

    fetchArticles('search_by_date?query=...')
  }
    componentDidMount(){
      window.addEventListener('click', this.handleClickOutside,true)
    }
    componentWillUnmount(){
      window.removeEventListener('click', this.handleClickOutside, true)
    }
    handleClickOutside(e) {
      const domNode = ReactDOM.findDOMNode(this);
      console.log(e.currentTarget.innerText)
      const {closeDropdowns} = this.props;
      //if(domNode.contains(e.target) || domNode.className==="filters"){
        closeDropdowns()
      //}
    }
    handleStories(e) {
      const {storiesChange} = this.props;
      const {filters} = this.props.stories.filter;
      storiesChange(e.currentTarget.innerText);
      console.log(this.props.stories.filter)

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

          <span>Search</span>

        <div className="category">

          <div className="dropdown" style={{width:`${(6*stories.length)+50}px`}}>
          <label onClick={this.handleStoriesDropdown} className="storiesLabel" >{stories}<FontAwesomeIcon icon={faChevronDown}/></label>
        <ul className="storiesOpen" style={storiesOpen === true ? {display:'block'} : {display:'none'} }  >
              <li onClick={this.handleStories}>All</li>
              <li onClick={this.handleStories}>Stories</li>
              <li onClick={this.handleStories}>Comments</li>
            </ul>
          </div>
          </div>
          <span>by</span>
        <div  className="category">
          <div className="dropdown" style={{width:`${(6*popularity.length)+50}px`}}>
          <label onClick={this.handlePopularityDropdown} >{popularity}<FontAwesomeIcon icon={faChevronDown}/></label>
            <ul className="popularityOpen" style={popularityOpen === true ? {display:'block'} : {display:'none'} } >
              <li onClick={this.handlePopularity}>Popularity</li>
              <li onClick={this.handlePopularity}>Date</li>
            </ul>
          </div>
        </div>
        <span>for</span>
        <div className="category">

          <div className="dropdown" style={{width:`${(6*time.length)+50}px`}}>
          <label onClick={this.handleTimeDropdown} >{time}<FontAwesomeIcon icon={faChevronDown}/></label>
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
        <div>
          <button onClick={this.handleChange}>Change!</button>
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
    closeDropdowns:closeDropdowns,
    fetchArticles: fetchArticles,
  }, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Search);
