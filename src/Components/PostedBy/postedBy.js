import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {fetchUserPosts } from '../../articlesActions'
import {getArticles} from '../../articles';
import './postedBy.css'

class PostedBy extends Component{


  // componentWillReceiveProps(nextProps){
  //   if(nextProps.articles.userName !== ''){
  //     window.location.reload()
  //   }
  // }

  componentDidMount(){
    const{fetchUserPosts} = this.props
    fetchUserPosts('vikram7')
    console.log(this.props.articles)
  }
  render(){

    return(
      <div className="body">

        <div className="container">
          <div className="leftColumn">
            <span>User:</span>
            <span>Created:</span>
            <span>Karma:</span>
            <span>About:</span>
          </div>
            <div className="rightColumn">
              <a className="secondChild name" href='/'>qweasd</a>
              <a className="secondChild link" href='/'> April 25, 2017</a>
              <span className="secondChild points">123</span>
              <div className="userAbout">
                  <a href="/">Submissions</a>
                  <a href="/">Comments</a>
                  <a href="/">Favorites</a>
              </div>
            </div>

          </div>
        </div>


    )
  }
  }

  const mapStateToProps = state => ({
    articles: getArticles(state),
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUserPosts:fetchUserPosts,
  }, dispatch)


export default connect(mapStateToProps,mapDispatchToProps)(PostedBy);
