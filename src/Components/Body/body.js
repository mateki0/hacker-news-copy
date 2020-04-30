import React, {Component} from 'react';
import './body.css';

class Body extends Component{
  constructor(props){
    super(props);

    this.state={
      url:'http://hn.algolia.com/api/v1/search_by_date?query=...',
      error:null,
      isLoaded:false,
      items:[]
    }
  }
  componentDidMount(){
    fetch(this.state.url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded:true,
          items:result
        });
      },
      (error) =>{
        this.setState({
          isLoaded:true,
          error
        });
      }
    )
  }
  render(){
    const {error, isLoaded, items } = this.state;

    if(error) {
      return <div>Błąd: {error.message}</div>;
    } else if(!isLoaded) {
      return <div>Ładowanie...</div>;
    } else{
      console.log(items.hits)
    return(
      <div className="SearchResults">
        {items.hits.map(item=> (
        <article key={item.objectID} className="singleStory">
          <div>
            <div className="header">
              <span className="storyTitle">{item['story_title'] !== null ? item['story_title'] : item['title']}</span>
              <a href={item['story_url'] === '' ? item['url'] : item['story_url']} className="storyLink">({item['story_url'] === '' ? item['url'] : item['story_url']})</a>
            </div>
            <div className="bottom">
              <ul>
                <li><a href="#">{item.points !== null ? item.points : 0} points,</a></li>
                <li><a href="#">{item.author}</a></li>
                <li><a href="#">{item['created_at']}</a></li>
                <li><a href="#">{item['num_comments'] !== null ? item['num_comments'] : 0} Comments</a></li>
              </ul>
            </div>
          </div>
        </article>
      ))}
      </div>
    )
  }
  }
}

export default Body;
