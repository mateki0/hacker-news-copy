import React, {Component} from 'react';
import {fetchArticles, filterChange } from '../../articlesActions'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {getArticles} from '../../articles'
import FiltersContainer from './styled/FiltersContainer';
import SingleFilterBox from './styled/SingleFilterBox';
class Filters extends Component{


  handleFilter = (e) => {
    let query = '';
    console.log(this.props)
    const {fetchArticles,filterChange} = this.props;
    switch(e.currentTarget.innerText){
      case 'New':
      query = 'newstories';
      break;
      case 'Top':
      query = 'topstories';
      break;
      case 'Ask':
      query = 'askstories';
      break;
      case 'Show':
      query = 'showstories';
      break;
      case 'Jobs':
      query = 'jobstories';
      break;
      default:
      query = ''
    }
      filterChange(query)
      fetchArticles(query, 1)
  }

  render(){
    return(
      <FiltersContainer>
        <SingleFilterBox onClick={this.handleFilter}>New</SingleFilterBox>
        <SingleFilterBox onClick={this.handleFilter}>Top</SingleFilterBox>
        <SingleFilterBox onClick={this.handleFilter}>Ask</SingleFilterBox>
        <SingleFilterBox onClick={this.handleFilter}>Show</SingleFilterBox>
        <SingleFilterBox onClick={this.handleFilter}>Jobs</SingleFilterBox>
      </FiltersContainer>
    )
  }
}

  const mapStateToProps = state => ({
    articles: getArticles(state),
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
    filterChange: filterChange,
    fetchArticles: fetchArticles,
  }, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Filters);
