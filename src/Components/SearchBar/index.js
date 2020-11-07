import React, { Component } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getArticles } from '../../articles';
import { Search } from '../../articlesActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchWrapper from './styled/SearchWrapper';
import SearchBox from './styled/SearchBox';
import Icon from './styled/Icon';
class SearchBar extends Component {
  handleSearch = (e) => {
    e.preventDefault();
    const { Search } = this.props;
    const { articles } = this.props.articles;
    const input = document.querySelector('.searchInput').value;
    let arr = [];
    articles.map((a) => {
      if (
        (a['by'] !== undefined && a['by'].includes(input)) ||
        (a['title'] !== undefined && a['title'].includes(input)) ||
        (a['url'] !== undefined && a['url'].includes(input))
      ) {
        arr.push(a);
      }
    });
    Search(arr, input);
  };
  render() {
    return (
      <div>
        <SearchWrapper>
          <SearchBox placeholder="Search stories..." />
          <Icon onClick={this.handleSearch} icon={faSearch} />
        </SearchWrapper>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  articles: getArticles(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      Search: Search,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
