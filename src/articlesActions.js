import fetch from 'cross-fetch'

export function fetchArticles(query) {
  return dispatch => {

    dispatch(fetchArticlesBegins());
    fetch(`http://hn.algolia.com/api/v1/${query}`)
    .then(res => res.json())
    .then(result=>{
      dispatch(fetchArticlesSuccess(result));
    })
    .catch(error=>
      dispatch(fetchArticlesFailure(error))
  );

};
}

function handleErrors(response) {
  if(!response.ok){
    throw Error(response.statusText)
  }
  return response
}



export const FETCH_ARTICLES_BEGINS = 'FETCH_ARTICLES_BEGINS';
export const fetchArticlesBegins = () => ({
  type: FETCH_ARTICLES_BEGINS
});

export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const fetchArticlesSuccess = articles => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: {articles}
})

export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';
export const fetchArticlesFailure = error => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: {error}
})

// SEARCH COMPONENT

export const CHANGE_STORIES_FILTER = 'CHANGE_STORIES_FILTER'
export const storiesChange = data =>{
  return{
    type: CHANGE_STORIES_FILTER,
    data: data
  }
}


export const CHANGE_POPULARITY_FILTER = 'CHANGE_POPULARITY_FILTER';
export const popularityChange = data => {
  return{
    type: CHANGE_POPULARITY_FILTER,
    data:data

  }
}


export const CHANGE_TIME_FILTER = 'CHANGE_TIME_FILTER';
export const timeChange = data => {
  return{
    type: CHANGE_TIME_FILTER,
    data:data
  }
}

export const TOGGLE_STORIES_DROPDOWN = 'TOGGLE_STORIES_DROPDOWN';
export const storiesDropdown = () => {
  return{
    type: TOGGLE_STORIES_DROPDOWN
  }
}

export const TOGGLE_POPULARITY_DROPDOWN = 'TOGGLE_POPULARITY_DROPDOWN';
export const popularityDropdown = () => {
  return{
    type: TOGGLE_POPULARITY_DROPDOWN
  }
}
export const TOGGLE_TIME_DROPDOWN = 'TOGGLE_TIME_DROPDOWN';
export const timeDropdown = () => {
  return{
    type: TOGGLE_TIME_DROPDOWN
  }
}
