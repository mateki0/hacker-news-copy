import React, {Component} from 'react';
import './body.css';
import '../Search/search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {fetchArticles } from '../../articlesActions'
import {getArticles, getError,getLoading} from '../../articles'

class Body extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
    const {fetchArticles} = this.props;
    fetchArticles('search?query=...')
  }
  handleChange(){
    const {fetchArticles} = this.props;
    fetchArticles('search_by_date?query=...')
  }

  render(){
    const {articles, loading,  error } = this.props;

    if(articles.articles.hits === undefined){
       return <div>Loading..</div>
     }
     if(error){
       return <div>Error! {error.message}</div>
     }
    return(
      <div>
        <button onClick={this.handleChange}>change!</button>
        <div className="SearchResults">
            {articles.articles.hits.map(item=> (

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

  const mapStateToProps = state => ({
    articles: getArticles(state),
    loading: getLoading(state),
    error: getError(state)
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchArticles: fetchArticles
  }, dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(Body);
