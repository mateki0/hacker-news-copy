import React, {Component} from 'react';
import './body.css';

import Moment from 'react-moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {fetchArticles,incrementPage, decrementPage,changePage, fetchUserPosts, sendUserName } from '../../articlesActions'
import {getArticles} from '../../articles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft,faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import {Link, BrowserRouter, Route,Router} from 'react-router-dom';
import Search from '../Search/search.js';
class Body extends Component{

  fetchNewPage = this.fetchNewPage.bind(this)
  incrementPage = this.incrementPage.bind(this)
  decrementPage = this.decrementPage.bind(this)
  handleFrom = this.handleFrom.bind(this)
  handleBy = this.handleBy.bind(this)
  componentDidMount() {
    const {fetchArticles} = this.props;
    fetchArticles('beststories', 0);
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
    const {changePage, fetchArticles} = this.props
    const {page} = this.props.articles
    decrementPage()
    fetchArticles(this.props.articles.currentFilter, page-1);
    changePage(page-1)
  }

  handleFrom(e){
    const {fetchArticles} = this.props;
    let url = e.currentTarget.innerText.slice(1,e.currentTarget.innerText.length-1);
    console.log(url);
    fetchArticles(url,1);
  }
  handleBy(e){
    const {sendUserName} = this.props
    console.log(sendUserName)
    sendUserName(e.currentTarget.innerText)
    //window.location.reload()
  }

  render(){
    const {articles} = this.props;
    const {error, loading} = this.props.articles;
    const {page} = this.props.articles
    console.log(loading)

     if(error){
       return <div>Error! {error.message}</div>
     }
     if(loading === true){
       return <div>Loading...</div>
     }

     function splitted(url){
       let splitted = url.split('/');
       if(articles.searched === false){
       return splitted[2]
     } else{
       return url
     }
     }

     let arr = [];
     let sliceMin;
     let sliceMax
     let sliced;
     switch(parseInt(page)){
       case 1:
       sliceMin = 0;
       sliceMax = 20;
       break;
       case 2:
       sliceMin = 20;
       sliceMax = 40;
       break;
       case 3:
       sliceMin = 40;
       sliceMax = 60;
       break;
       case 4:
       sliceMin = 60;
       sliceMax = 80;
       break;
       case 5:
       sliceMin = 80;
       sliceMax = 100;
       break;
       case 6:
       sliceMin = 100;
       sliceMax = 120;
       break;
       case 7:
       sliceMin = 120;
       sliceMax = 140;
       break;
       case 8:
       sliceMin = 140;
       sliceMax = 160;
       break;
       case 9:
       sliceMin = 160;
       sliceMax = 180;
       break;
       case 10:
       sliceMin = 180;
       sliceMax = 200;
       break;

     }
       if(articles.searched === true && articles.searchedPosts.length >20){
         sliced = articles.searchedPosts.slice(sliceMin,sliceMax)
       } else if(articles.searched === true && articles.searchedPosts.length<20){
         sliced = articles.searchedPosts
       }
       if(articles.searched === false){
         sliced = articles.articles.slice(sliceMin,sliceMax)
       }
     // if((articles.articles.length > 20 && sliced.length !== 20 && articles.searched === false) || (articles.searchedPosts.length>20 && sliced.length !== 20) ){
     //    return <div>Loading..</div>
     //  }
      let pages = [];

      if(page>1){
        pages.push(<li key="backward" className="pageNumber" onClick={this.decrementPage}> <FontAwesomeIcon icon={faAngleDoubleLeft}/> </li>)
      }
      const activePage = {color:'#FF742B', border:'1px solid #FF742B'}
      const nonActivePage = {color:'rgba(0,0,0,0.5)', border:'1px solid rgba(0,0,0,0.5)'}
      let totalPages;
      if(articles.searched === false){
        totalPages = Math.ceil(articles.articles.length/20);
      } else{
        totalPages = Math.ceil(articles.searchedPosts.length/20);
      }
      let howMany = 0;
      let nextPage;
      if (totalPages === 1){
        nextPage = false;
        howMany = 0;
      } else if(totalPages > 1 && parseInt(page)+5 > totalPages){
        nextPage = true
        howMany = totalPages - page;
      } else{
        nextPage = true
        howMany = 5;
      }
      console.log(totalPages)
      console.log(howMany)

      for(var i=1; i<=parseInt(page)+howMany; i++){
        pages.push(<li key={i} className="pageNumber" onClick={this.fetchNewPage} style={parseInt(page)===i ? activePage : nonActivePage}>{i}</li>)
          if(i===totalPages){
            nextPage=false;
          }
      }
      if(nextPage===true){
        pages.push(<li key="forward" className="pageNumber" onClick={this.incrementPage}><FontAwesomeIcon icon={faAngleDoubleRight}/></li>)
      }
    return(
      <div className="body">
      <Search/>
        <div className="SearchResults">
          {sliced.map(item=>(

                      <article key={item.id} className="singleStory">
                        <div>
                          <div className="header">
                            <a href={'https://news.ycombinator.com/item?id=' + item.id}
                            className="storyTitle">{item['title']}</a>

                          <a href={item['url'] !== undefined ? `https://news.ycombinator.com/from?site=${splitted(item['url'])}` : "No url provided"}
                          className="storyLink">({item['url'] !== undefined ? splitted(item['url']) : "No url provided"})</a>
                          </div>
                          <div className="bottom">

                            <ul>
                              <li><a href={'https://news.ycombinator.com/item?id=' + item.id}>{item.score !== null ? item.score : 0} points,</a></li>
                              <BrowserRouter>
                              <li onClick={this.handleBy} ><Link to='/postedBy' >{item.by}</Link></li>
                          </BrowserRouter>
                          <li><a href={'https://news.ycombinator.com/item?id=' + item.id}><Moment fromNow unix>{item['time']}</Moment></a></li>
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
    fetchUserPosts:fetchUserPosts,
    sendUserName:sendUserName,
  }, dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(Body);
