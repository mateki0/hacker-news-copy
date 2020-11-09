import React, { Component } from 'react';
import PageListItem from './styled/PageListItem';
import PagesList from './styled/PagesList';
import PaginationContainer from './styled/PaginationContainer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { incrementPage, decrementPage, changePage, fetchArticles } from '../../articlesActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { getArticles } from '../../articles';
class Pages extends Component {
  fetchNewPage = (e) => {
    const { fetchArticles, changePage } = this.props;
    let page = e.currentTarget.innerText;
    changePage(page);
    fetchArticles(this.props.articles.currentFilter, page, this.props.articles.currentSearched);
  };
  incrementPage = () => {
    const { incrementPage, changePage, fetchArticles } = this.props;
    const { page } = this.props.articles;
    incrementPage();
    fetchArticles(this.props.articles.currentFilter, page + 1, this.props.articles.currentSearched);
    changePage(page + 1);
  };
  decrementPage = () => {
    const { changePage, fetchArticles } = this.props;
    const { page } = this.props.articles;
    decrementPage();
    fetchArticles(this.props.articles.currentFilter, page - 1, this.props.articles.currentSearched);
    changePage(page - 1);
  };

  render() {
    let pages = [];
    let howMany = 0;
    if (this.props.articles.page + this.props.articles.totalPages > 5) {
      howMany = 5;
    } else {
      howMany = this.props.articles.totalPages - this.props.articles.page;
    }
    for (var i = 1; i <= parseInt(this.props.articles.page) + howMany; i++) {
      const page = (
        <PageListItem
          key={i}
          isActive={parseInt(this.props.articles.page) === i}
          onClick={this.fetchNewPage}
        >
          {i}
        </PageListItem>
      );
      pages.push(page);
    }

    return (
      <PaginationContainer>
        <PagesList>
          {this.props.articles.page > 1 ? (
            <PageListItem key="backward" onClick={this.decrementPage}>
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </PageListItem>
          ) : (
            ''
          )}
          {pages}
          {this.props.articles.page < this.props.articles.totalPages ? (
            <PageListItem key="forward" onClick={this.incrementPage}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </PageListItem>
          ) : (
            ''
          )}
        </PagesList>
      </PaginationContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
