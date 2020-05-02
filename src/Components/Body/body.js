import React, {Component} from 'react';
import './body.css';
import '../Search/search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';

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
  handleFilterChange = this.handleFilterChange.bind(this);

  // handleApiCall(){
  //   let url =
  //   fetch(this.state.url)
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       this.setState({
  //         isLoaded:true,
  //         items:result
  //       });
  //     },
  //     (error) =>{
  //       this.setState({
  //         isLoaded:true,
  //         error
  //       });
  //     }
  //   )
  // }
  handleFilterChange(){
    this.setState({
        timeOpen: false,
        storiesOpen:false,
        popularityOpen:false
      })
      var items = this.state.items
      this.props.callbackFromParent(items)
      console.log(items)
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
          <label
          onClick={this.handleStoriesDropdown}
          className="storiesLabel"
          style={{width:`${(6*this.state.stories.length)+50}px`}}>
          {this.state.stories} <FontAwesomeIcon icon={faChevronDown}/>
          </label>
        <ul className="storiesOpen" style={this.state.storiesOpen === true ? {display:'block'} : {display:'none'} } >
              <li onClick={this.handleStories}>All</li>
              <li onClick={this.handleStories}>Stories</li>
              <li onClick={this.handleStories}>Comments</li>
            </ul>
          </div>
          <span>by</span>
          <div className="dropdown">
          <label
          onClick={this.handlePopularityDropdown}
          style={{width:`${(6*this.state.popularity.length)+50}px`}}>
          {this.state.popularity} <FontAwesomeIcon icon={faChevronDown}/>
          </label>
        <ul className="popularityOpen" style={this.state.popularityOpen === true ? {display:'block'} : {display:'none'} }>
              <li onClick={this.handlePopularity}>Popularity</li>
              <li onClick={this.handlePopularity}>Date</li>
            </ul>
          </div>
        </div>
        <div className="category">
          <span>for</span>
          <div className="dropdown">
          <label
          onClick={this.handleTimeDropdown}
          style={{width:`${(6*this.state.time.length)+50}px`}}>
          {this.state.time} <FontAwesomeIcon icon={faChevronDown}/>
          </label>
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

class Body extends Component{
  constructor(props){
    super(props);
    this.state={
      url:'http://hn.algolia.com/api/v1/search_by_date?query=...',
      error:null,
      isLoaded:false,
      items:[]
    }
  }

  myCallback = (dataFromChild)=>{
    this.setState({ itemsFromChild: dataFromChild})
  }

  componentDidMount(){
    fetch(this.state.url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded:true,
          items:result
        });
      },
      (error) =>{
        this.setState({
          isLoaded:true,
          error
        });
      }
    )
  }
  render(){
    const {error, isLoaded, items } = this.state;

    if(error) {
      return <div>Błąd: {error.message}</div>;
    } else if(!isLoaded) {
      return <div>Ładowanie...</div>;
    } else{
      console.log(items.hits)
    return(
      <div>
      <Search
        callbackFromParent={this.myCallback}
        />
        <div className="SearchResults">
          {items.hits.map(item=> (

          <article key={item.objectID} className="singleStory">
            <div>
              <div className="header">
                <a href={'https://news.ycombinator.com/item?id=' + item.objectID}
                className="storyTitle">{item['story_title'] !== null ? item['story_title'] : item['title']}</a>
              <a href={item['story_url'] === null ? item['url'] : item['story_url']} className="storyLink">({item['story_url'] === null ? item['url'] : item['story_url']})</a>
              </div>
              <div className="bottom">
                <ul>
                  <li><a href={'https://news.ycombinator.com/item?id=' + item.objectID}>{item.points !== null ? item.points : 0} points,</a></li>
                  <li><a href={'https://news.ycombinator.com/item?id=' + item.objectID}>{item.author}</a></li>
                  <li><a href={'https://news.ycombinator.com/item?id=' + item.objectID}><Moment fromNow>{item['created_at']}</Moment></a></li>
                  <li><a href={'https://news.ycombinator.com/item?id=' + item.objectID}>{item['num_comments'] !== null ? item['num_comments'] : 0} Comments</a></li>
                </ul>
              </div>
            </div>
          </article>
        ))}
        </div>
      </div>
    )
  }
  }
}

export default Body;
