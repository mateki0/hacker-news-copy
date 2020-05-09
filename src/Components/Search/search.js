import React, {Component} from 'react';
import './search.css';
import {fetchArticles, filterChange } from '../../articlesActions'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {getArticles} from '../../articles'
class Search extends Component{

  handleFilter = this.handleFilter.bind(this)
  handleFilter(e){
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
    }
      filterChange(query)
      fetchArticles(query, 1)
  }

  render(){
    const active = {color:'#FF742B'};
    const nonActive = {color:'#000'};
    return(
      <div className="filters">
        <ul>
          <li className="filter" style={this.props.articles.currentFilter === 'newstories' ? active : nonActive} onClick={this.handleFilter}>New</li>
          <li className="filter" style={this.props.articles.currentFilter === 'topstories' ? active : nonActive} onClick={this.handleFilter}>Top</li>
          <li className="filter" style={this.props.articles.currentFilter === 'askstories' ? active : nonActive} onClick={this.handleFilter}>Ask</li>
          <li className="filter" style={this.props.articles.currentFilter === 'showstories' ? active : nonActive} onClick={this.handleFilter}>Show</li>
          <li className="filter" style={this.props.articles.currentFilter === 'jobstories' ? active : nonActive} onClick={this.handleFilter}>Jobs</li>
        </ul>
      </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Search);
