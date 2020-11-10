import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArticles, incrementPage, decrementPage, changePage } from '../../articlesActions';
import { getArticles } from '../../articles';
import SingleArticle from '../SingleArticle';
import ArticlesContainer from './styled/ArticlesContainer';
import Pages from '../Pages';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import SearchingContainer from './styled/SearchingContainer';

class Body extends Component {
  state = {
    isSearching: true,
  };

  componentDidMount() {
    const { fetchArticles } = this.props;
    fetchArticles('beststories', 1);
  }

  render() {
    const { articles, error, currentSearched } = this.props.articles;
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    function splitted(url) {
      let splitted = url.split('/');
      return splitted[2];
    }

    if (articles.length === 0) {
      return (
        <SearchingContainer>
          <LoadingIcon />
          {currentSearched ? <h3>Or requested phrase is not found</h3> : ''}
        </SearchingContainer>
      );
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
        <Pages />
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
