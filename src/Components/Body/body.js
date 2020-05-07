import React, {Component} from 'react';
import './body.css';
import '../Search/search.css';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {fetchArticles,incrementPage, decrementPage,changePage } from '../../articlesActions'
import {getArticles, getError,getLoading, getPage} from '../../articles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft,faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
class Body extends Component{
  constructor(props){
    super(props);

  }
  fetchNewPage = this.fetchNewPage.bind(this)
  incrementPage = this.incrementPage.bind(this)
  componentDidMount() {
    const {fetchArticles} = this.props;
    fetchArticles('newstories.json?print=pretty', 0)
  }
  fetchNewPage(e){
    const {fetchArticles, changePage} = this.props;
    let page = e.currentTarget.innerText
    fetchArticles('newstories.json?print=pretty', page);

  }
  incrementPage(){
    const {incrementPage, changePage , fetchArticles} = this.props
    const {page} = this.props.articles
    incrementPage()
    fetchArticles('newstories.json?print=pretty', page+1);
    changePage(page+1)
    console.log(this.props)
  }

  render(){
    const {articles, error} = this.props;
    const {page} = this.props.articles

    if(articles.articles.length !== 20){
       return <div>Loading..</div>
     }
     if(error){
       return <div>Error! {error.message}</div>
     }
     let pages = [];

     if(page>1){
       pages.push(<li key="backward" className="pageNumber" onClick={this.decrementPage}> <FontAwesomeIcon icon={faAngleDoubleLeft}/> </li>)
     }
     const activePage = {color:'#FF742B', border:'1px solid #FF742B'}
     const nonActivePage = {color:'rgba(0,0,0,0.5)', border:'1px solid rgba(0,0,0,0.5)'}
     for(var i=parseInt(page); i<=parseInt(page)+5; i++){
       pages.push(<li key={i} className="pageNumber" onClick={this.fetchNewPage} style={page===i ? activePage : nonActivePage}>{i}</li>)
     }

     console.log(pages)
    return(
      <div className="body">
        <div className="SearchResults">
          {articles.articles.map(item=> (

                      <article key={item.id} className="singleStory">
                        <div>
                          <div className="header">
                            <a href={'https://news.ycombinator.com/item?id=' + item.id}
                            className="storyTitle">{item['title']}</a>
                          <a href={item['url']} className="storyLink">({item['url']})</a>
                          </div>
                          <div className="bottom">
                            <ul>
                              <li><a href={'https://news.ycombinator.com/item?id=' + item.id}>{item.score !== null ? item.score : 0} points,</a></li>
                            <li><a href={'https://news.ycombinator.com/item?id=' + item.id}>{item.by}</a></li>
                          <li><a href={'https://news.ycombinator.com/item?id=' + item.id}><Moment fromNow>{item['time']}</Moment></a></li>
                        <li><a href={'https://news.ycombinator.com/item?id=' + item.id}>{item['kids'] !== undefined ? item['kids'].length : 0} Comments</a></li>
                            </ul>
                          </div>
                        </div>
                      </article>
                    ))}
          </div>
          <div className="choosePage">
            <ul>
                {pages}
                <li key="forward" className="pageNumber" onClick={this.incrementPage}><FontAwesomeIcon icon={faAngleDoubleRight}/></li>
            </ul>
          </div>
      </div>
    )
  }
  }

  const mapStateToProps = state => ({
    articles: getArticles(state),
    loading: getLoading(state),
    error: getError(state),
    page: getPage(state)
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchArticles: fetchArticles,
    incrementPage: incrementPage,
    decrementPage: decrementPage,
    changePage:changePage,
  }, dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(Body);
