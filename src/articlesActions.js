import fetch from 'cross-fetch';

export function fetchArticles(query, page) {
  let arr = [];
  let sliceMin;
  if (page === 1) {
    sliceMin = 0;
  } else {
    sliceMin = 20 * parseInt(page);
  }
  const sliceMax = 20 + 20 * parseInt(page);
  return (dispatch) => {
    dispatch(fetchArticlesBegins());
    fetch(`https://hacker-news.firebaseio.com/v0/${query}.json?print=pretty`)
      .then(
        (res) => res.json(),
        (error) => console.log('An error occurred', error)
      )
      .then((result) => {
        result.map((a) => {
          return fetch(`https://hacker-news.firebaseio.com/v0/item/${a}.json?print=pretty`)
            .then((res) => res.json())
            .then((result) => {
              if (result !== null) {
                arr.push(result);
              }
              dispatch(fetchArticlesSuccess(arr.slice(sliceMin, sliceMax)));
            });
        });
      });
  };
}

export const GET_USER = 'GET_USER';
export const getUser = (name) => ({
  type: GET_USER,
  data: name,
});
export const SEARCH = 'SEARCH';
export const Search = (data, currentSearched) => ({
  type: SEARCH,
  payload: { data },
  currentSearched: currentSearched,
});
export const FETCH_ARTICLES_BEGINS = 'FETCH_ARTICLES_BEGINS';
export const fetchArticlesBegins = () => ({
  type: FETCH_ARTICLES_BEGINS,
});

export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const fetchArticlesSuccess = (articles) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: { articles },
});

export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';
export const fetchArticlesFailure = (error) => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: { error },
});

export const PAGE_INCREMENT = 'PAGE_INCREMENT';
export const incrementPage = () => ({
  type: PAGE_INCREMENT,
});
export const PAGE_DECREMENT = 'PAGE_DECREMENT';
export const decrementPage = () => ({
  type: PAGE_DECREMENT,
});

export const PAGE_CHANGE = 'PAGE_CHANGE';
export const changePage = (number) => ({
  type: PAGE_CHANGE,
  number: number,
});

export const CHANGE_FILTER = 'CHANGE_FILTER';
export const filterChange = (data) => {
  return {
    type: CHANGE_FILTER,
    data: data,
  };
};
