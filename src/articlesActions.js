import fetch from 'cross-fetch'

export function fetchArticles(query, page) {
  let arr = [];
  let sliceMin;
  let sliceMax
  if(page > 0){
    sliceMin = 0 + ((20*page)+1);
    sliceMax = 20 + ((20*page)+1);
  } else{
    sliceMin = 0;
    sliceMax = 20;
  }
  return dispatch => {

    dispatch(fetchArticlesBegins());
    fetch(`https://hacker-news.firebaseio.com/v0/${query}`)
    .then(res => res.json())
    .then(result=>{

        result.slice(sliceMin,sliceMax).map(a=>{
    fetch(`https://hacker-news.firebaseio.com/v0/item/${a}.json?print=pretty`)
      .then(res=> res.json())
      .then(result => {
        arr.push(result)
        dispatch(fetchArticlesSuccess(arr))
        })
      })
    })
};
}

// export function fetchItems(query) {
//   return dispatch => {
//     dispatch (fetchItemsBegins());
//     fetch(`https://hacker-news.firebaseio.com/v0/item/${query}.json?print=pretty`)
//       .then(res=> res.json())
//       .then(result => {
//         dispatch(fetchItemsSuccess(result))
//       })
//   }
// }





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


export const PAGE_INCREMENT = 'PAGE_INCREMENT';
export const incrementPage = () => ({
  type: PAGE_INCREMENT,
})
export const PAGE_DECREMENT = 'PAGE_DECREMENT';
export const decrementPage = () => ({
  type: PAGE_DECREMENT,
})

export const PAGE_CHANGE = 'PAGE_CHANGE';
export const changePage = number => ({
  type: PAGE_CHANGE,
  number:number
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

export const CLICK_OUTSIDE = 'CLICK_OUTSIDE';
export const closeDropdowns = () =>{
  return{
    type: 'CLICK_OUTSIDE'
  }
}
