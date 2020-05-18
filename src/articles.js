import {
  FETCH_ARTICLES_BEGINS,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_SUCCESS,
  FETCH_USERPOSTS_SUCCESS,
  CHANGE_FILTER,
  PAGE_INCREMENT,
  PAGE_DECREMENT,
  PAGE_CHANGE,
  GET_USER,
  SEARCH,
} from './articlesActions';
import { combineReducers } from 'redux';

export const initialState ={
  articles: [],
  searched:false,
  loading: false,
  error:null,
  page:1,
  currentFilter: 'beststories',
  currentSearched: '',
  searchedPosts:[],
}
export function articles(state = initialState, action){
  switch (action.type){
    case GET_USER:
    return{
        ...state,
        userName: 'action.data'
      }
    case SEARCH:
    return{
      ...state,
      loading:false,
      searched:true,
      searchedPosts: action.payload.data,
      currentSearched: action.currentSearched,
      page: 1
    }
    case FETCH_USERPOSTS_SUCCESS:
      return {
        ...state,
        user: action.payload.posts
      }

    case FETCH_ARTICLES_BEGINS:
      return  {
          ...state,
          loading:true,
          error:null
        }


    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading:false,
        articles: action.payload.articles,
        searchedPosts: [],
        searched:false,
      }


    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        loading:false,
        error:action.payload.error,
        articles: []
      }

    case PAGE_INCREMENT:
      return {
        ...state,
        page: state.page++
      }

    case PAGE_DECREMENT:
      return {
        ...state,
        page: state.page--
      }

    case PAGE_CHANGE:
      return {
        ...state,
        page:action.number
      }

    case CHANGE_FILTER:
      return{
        ...state,
        currentFilter:action.data
      }


    default:
      return state
  }
  }



export const getArticles = state => state.articles;


const rootReducer = combineReducers({
  articles
});

  export default rootReducer
