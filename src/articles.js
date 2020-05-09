import {
  FETCH_ARTICLES_BEGINS,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_SUCCESS,
  CHANGE_FILTER,
  PAGE_INCREMENT,
  PAGE_DECREMENT,
  PAGE_CHANGE
} from './articlesActions';
import { combineReducers } from 'redux';

const initialState ={
  articles: [],
  loading: false,
  error:null,
  page:1,
  currentFilter: 'beststories'
}

function articles(state = initialState, action){
  switch (action.type){
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
        articles: action.payload.articles
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