import fetch from 'cross-fetch';

export function fetchArticles(query, page, searchValue) {
  let arr = [];
  let sliceMin;

  if (page === 1) {
    sliceMin = 0;
  } else {
    sliceMin = 20 * (parseInt(page) - 1);
  }
  let sliceMax = 20 * parseInt(page);
  let totalPages = 0;
  return (dispatch) => {
    dispatch(fetchArticlesBegins());

    fetch(`https://hacker-news.firebaseio.com/v0/${query}.json?print=pretty`)
      .then(
        (res) => res.json(),
        (error) => {
          dispatch(fetchArticlesFailure);
          console.log('An error occurred', error);
        }
      )
      .then((result) => {
        if (searchValue) {
          result.map((a) => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${a}.json?print=pretty`)
              .then((res) => res.json())
              .then((item) => {
                if (
                  (item['by'] && item['by'].includes(searchValue)) ||
                  (item['title'] && item['title'].includes(searchValue)) ||
                  (item['url'] && item['url'].includes(searchValue))
                ) {
                  arr.push(item);
                }
                totalPages = Math.ceil(arr.length / 20);
                dispatch(
                  fetchArticlesSuccess(arr.slice(sliceMin, sliceMax), searchValue, totalPages)
                );
              });
          });
        } else {
          totalPages = Math.ceil(result.length / 20);
          result.slice(sliceMin, sliceMax).map((a) => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${a}.json?print=pretty`)
              .then((res) => res.json())
              .then((result) => {
                if (result !== null) {
                  arr.push(result);
                }

                dispatch(fetchArticlesSuccess(arr, '', totalPages));
              });
          });
        }
      });
  };
}

export const FETCH_ARTICLES_BEGINS = 'FETCH_ARTICLES_BEGINS';
export const fetchArticlesBegins = () => ({
  type: FETCH_ARTICLES_BEGINS,
});

export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const fetchArticlesSuccess = (articles, searchValue, totalPages) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: { articles },
  currentSearched: searchValue,
  totalPages: totalPages,
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
