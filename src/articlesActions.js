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
    fetch(`https://hacker-news.firebaseio.com/v0/${query}.json?print=pretty`)
    .then(res => res.json())
    .then(result=>{
      result.slice(sliceMin,sliceMax).map(a=>{
        //console.log(a)
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${a}.json?print=pretty`)
      .then(res=> res.json())
      .then(result => {
        //console.log(result)
        if(result !== null){
          arr.push(result)
        }
        dispatch(fetchArticlesSuccess(arr))
        })
      })
    })
};
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

export const CHANGE_FILTER = 'CHANGE_FILTER'
export const filterChange = data =>{
  return{
    type: CHANGE_FILTER,
    data: data
  }
}
