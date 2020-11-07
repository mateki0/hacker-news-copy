import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchArticles,incrementPage, decrementPage,changePage, fetchUserPosts, getUser } from '../../articlesActions'
import {getArticles} from '../../articles';
import SingleArticle from '../SingleArticle';
import ArticlesContainer from './styled/ArticlesContainer';
import Pages from '../Pages';
import LoadingIcon from '../LoadingIcon/LoadingIcon';


class Body extends Component{
  
  componentDidMount() {
    const {fetchArticles} = this.props;
    fetchArticles('beststories', 0);
  }

  fetchNewPage = (e) =>{
    const {fetchArticles, changePage} = this.props;
    let page = e.currentTarget.innerText;
    changePage(page)
    fetchArticles(this.props.articles.currentFilter, page);

  }
  incrementPage = ()=>{
    const {incrementPage, changePage , fetchArticles} = this.props
    const {page} = this.props.articles
    incrementPage()
    fetchArticles(this.props.articles.currentFilter, page+1);
    changePage(page+1)
  }
  decrementPage = () => {
    const {changePage, fetchArticles} = this.props
    const {page} = this.props.articles
    decrementPage()
    fetchArticles(this.props.articles.currentFilter, page-1);
    changePage(page-1)
  }
  render(){
    const {articles} = this.props;
    const {error, loading} = this.props.articles;
    const {page} = this.props.articles
    const totalPages = !articles.searched ? Math.ceil(articles.articles.length/20) : Math.ceil(articles.searchedPosts.length/20)
    if(error){
        return <div>Error! {error.message}</div>
    }
    if(loading === true){
        return <LoadingIcon/>
    }

    function splitted(url){
        let splitted = url.split('/');
        if(articles.searched === false){
        return splitted[2]
      } else{
          return url
      }
    }
    let sliced;
    function getSlicedArticles(){
      const sliceMin = 0 + (20*parseInt(page));
      const sliceMax = 20 + (20*parseInt(page));
        if(articles.searched === true && articles.searchedPosts.length >20){
          sliced = articles.searchedPosts.slice(sliceMin,sliceMax)
        } else if(articles.searched === true && articles.searchedPosts.length<20){
          sliced = articles.searchedPosts
        }
        if(articles.searched === false){
          sliced = articles.articles.slice(sliceMin,sliceMax)
        }
      }
      getSlicedArticles();
    return(
      <>
      <ArticlesContainer>
          {sliced.map(item=>(
            <SingleArticle 
            key={item.id}
            title={item['title']}
            link={`https://news.ycombinator.com/item?id=`} 
            source={item['url'] !== undefined ? splitted(item['url']) : "No url provided"}
            score={item.score !== null ? item.score : 0}
            author={item.by}
            time={item['time']}
            comments={item['kids'] !== undefined ? item['kids'].length : 0}
          />        
          ))}
      </ArticlesContainer>
      <Pages numberOfPages={totalPages} page={page} incrementPage={this.incrementPage} decrementPage={this.decrementPage} fetchNewPage={this.fetchNewPage}/>
      </>
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
    getUser:getUser,
  }, dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(Body);
