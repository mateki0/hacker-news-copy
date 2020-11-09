import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArticles, incrementPage, decrementPage, changePage } from '../../articlesActions';
import { getArticles } from '../../articles';
import SingleArticle from '../SingleArticle';
import ArticlesContainer from './styled/ArticlesContainer';
import Pages from '../Pages';
import LoadingIcon from '../LoadingIcon/LoadingIcon';

class Body extends Component {
  componentDidMount() {
    const { fetchArticles } = this.props;
    fetchArticles('beststories', 0);
  }

  fetchNewPage = (e) => {
    const { fetchArticles, changePage } = this.props;
    let page = e.currentTarget.innerText;
    changePage(page);
    fetchArticles(this.props.articles.currentFilter, page);
  };
  incrementPage = () => {
    const { incrementPage, changePage, fetchArticles } = this.props;
    const { page } = this.props.articles;
    incrementPage();
    fetchArticles(this.props.articles.currentFilter, page + 1);
    changePage(page + 1);
  };
  decrementPage = () => {
    const { changePage, fetchArticles } = this.props;
    const { page } = this.props.articles;
    decrementPage();
    fetchArticles(this.props.articles.currentFilter, page - 1);
    changePage(page - 1);
  };

  render() {
    const { articles, searchedPosts, page, error, loading, searched } = this.props.articles;
    const totalPages = articles.searched
      ? Math.ceil(articles.length / 20)
      : Math.ceil(searchedPosts.length / 20);
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    function splitted(url) {
      let splitted = url.split('/');
      if (searched === false) {
        return splitted[2];
      } else {
        return url;
      }
    }
    console.log(loading);
    if (loading === true) {
      return <LoadingIcon />;
    }
    return (
      <>
        <ArticlesContainer>
          {articles.map((item) => (
            <SingleArticle
              key={item.id}
              title={item['title']}
              id={item.id}
              link={`https://news.ycombinator.com/item?id=`}
              source={item['url'] !== undefined ? splitted(item['url']) : 'No url provided'}
              score={item.score !== null ? item.score : 0}
              author={item.by}
              time={item['time']}
              comments={item['kids'] !== undefined ? item['kids'].length : 0}
            />
          ))}
        </ArticlesContainer>
        <Pages
          numberOfPages={totalPages}
          page={page}
          incrementPage={this.incrementPage}
          decrementPage={this.decrementPage}
          fetchNewPage={this.fetchNewPage}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: getArticles(state),
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchArticles: fetchArticles,
      incrementPage: incrementPage,
      decrementPage: decrementPage,
      changePage: changePage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Body);
