import React, {Component} from 'react';
import './body.css';
import '../Search/search.css';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {fetchArticles,incrementPage, decrementPage,changePage } from '../../articlesActions'
import {getArticles} from '../../articles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft,faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
class Body extends Component{

  fetchNewPage = this.fetchNewPage.bind(this)
  incrementPage = this.incrementPage.bind(this)
  handleFrom = this.handleFrom.bind(this)
  componentDidMount() {
    const {fetchArticles} = this.props;
    console.log(this.props)
    fetchArticles('beststories', 0)
  }
  fetchNewPage(e){
    const {fetchArticles, changePage} = this.props;
    let page = e.currentTarget.innerText;
    changePage(page)
    fetchArticles(this.props.articles.currentFilter, page);

  }
  incrementPage(){
    const {incrementPage, changePage , fetchArticles} = this.props
    const {page} = this.props.articles

    incrementPage()
    fetchArticles(this.props.articles.currentFilter, page+1);
    changePage(page+1)
  }
  decrementPage(){
    const {incrementPage, changePage , fetchArticles} = this.props
    const {page} = this.props.articles
    decrementPage()
    fetchArticles(this.props.articles.currentFilter, page-1);
    changePage(page-1)
  }

  handleFrom(e){
    const {fetchArticles} = this.props;
    let url = e.currentTarget.innerText.slice(1,e.currentTarget.innerText.length-1);
    console.log(url)
    fetchArticles(url,1)
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
       pages.push(<li key={i} className="pageNumber" onClick={this.fetchNewPage} style={parseInt(page)===i ? activePage : nonActivePage}>{i}</li>)
     }
     function splitted(url){
       let splitted = url.split('/');
       return splitted[2]
     }
     console.log(this.props)
    return(
      <div className="body">
        <div className="SearchResults">
          {articles.articles.map(item=>(

                      <article key={item.id} className="singleStory">
                        <div>
                          <div className="header">
                            <a href={'https://news.ycombinator.com/item?id=' + item.id}
                            className="storyTitle">{item['title']}</a>

                          <a href={item['url'] !== undefined ? `https://news.ycombinator.com/from?site=${splitted(item['url'])}` : "No url provided"} className="storyLink">({item['url'] !== undefined ? splitted(item['url']) : "No url provided"})</a>
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
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchArticles: fetchArticles,
    incrementPage: incrementPage,
    decrementPage: decrementPage,
    changePage:changePage,
  }, dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(Body);
