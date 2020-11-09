import React, { Component } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getArticles } from '../../articles';
import { fetchArticles } from '../../articlesActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchWrapper from './styled/SearchWrapper';
import SearchBox from './styled/SearchBox';
import Icon from './styled/Icon';
class SearchBar extends Component {
  state = {
    searchValue: '',
  };
  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };
  handleChangeValue = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  handleSearch = () => {
    const { fetchArticles } = this.props;
    const input = this.state.searchValue;
    fetchArticles(this.props.articles.currentFilter, 1, input);
  };
  render() {
    return (
      <div>
        <SearchWrapper>
          <SearchBox
            placeholder="Search stories..."
            onChange={this.handleChangeValue}
            onKeyDown={this.handleEnter}
            value={this.state.searchValue}
          />
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
      fetchArticles: fetchArticles,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
