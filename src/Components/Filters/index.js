import React, { Component } from 'react';
import { fetchArticles, filterChange } from '../../articlesActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArticles } from '../../articles';
import FiltersContainer from './styled/FiltersContainer';
import SingleFilterBox from './styled/SingleFilterBox';

class Filters extends Component {
  state = {
    query: 'beststories',
  };
  handleFilter = (story) => {
    const { fetchArticles, filterChange } = this.props;
    this.setState({ query: story });
    filterChange(story);
    fetchArticles(story, 1);
  };
  render() {
    return (
      <FiltersContainer>
        <SingleFilterBox
          type="button"
          isActive={this.state.query === 'beststories'}
          onClick={() => this.handleFilter('beststories')}
        >
          Best
        </SingleFilterBox>
        <SingleFilterBox
          type="button"
          isActive={this.state.query === 'newstories'}
          onClick={() => this.handleFilter('newstories')}
        >
          New
        </SingleFilterBox>
        <SingleFilterBox
          type="button"
          isActive={this.state.query === 'topstories'}
          onClick={() => this.handleFilter('topstories')}
        >
          Top
        </SingleFilterBox>
        <SingleFilterBox
          type="button"
          isActive={this.state.query === 'askstories'}
          onClick={() => this.handleFilter('askstories')}
        >
          Ask
        </SingleFilterBox>
        <SingleFilterBox
          type="button"
          isActive={this.state.query === 'showstories'}
          onClick={() => this.handleFilter('showstories')}
        >
          Show
        </SingleFilterBox>
        <SingleFilterBox
          type="button"
          isActive={this.state.query === 'jobstories'}
          onClick={() => this.handleFilter('jobstories')}
        >
          Jobs
        </SingleFilterBox>
      </FiltersContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: getArticles(state),
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      filterChange: filterChange,
      fetchArticles: fetchArticles,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
