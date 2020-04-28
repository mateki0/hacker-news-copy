import React, {Component} from 'react';
import './search.css';

class Search extends Component{
  render(){
    return(
      <div className="searchBar">
        <div>
          <span>Search</span>
          <div className="dropdown">
            <ul>
              <li>All</li>
              <li>Stories</li>
              <li>Comments</li>
            </ul>
          </div>
        </div>
        <div>
          <span>by</span>
          <div className="dropdown">
            <ul>
              <li>Popularity</li>
              <li>Date</li>
            </ul>
          </div>
        </div>
        <div>
          <span>for</span>
          <div className="dropdown">
            <ul>
              <li>All time</li>
              <li>Last 24h</li>
              <li>Past Week</li>
              <li>Past Month</li>
              <li>Past Year</li>
              <li>Custom Range</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
