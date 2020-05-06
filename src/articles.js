import {
  FETCH_ARTICLES_BEGINS,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_SUCCESS,
  CHANGE_STORIES_FILTER,
  CHANGE_POPULARITY_FILTER,
  CHANGE_TIME_FILTER,
  TOGGLE_STORIES_DROPDOWN,
  TOGGLE_POPULARITY_DROPDOWN,
  TOGGLE_TIME_DROPDOWN
} from './articlesActions';
import { combineReducers } from 'redux';

const initialState ={
  articles: [],
  loading: false,
  error:null
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

    default:
      return state
  }
  }

export const getArticles = state => state.articles;
export const getLoading = state => state.loading;
export const getError = state => state.error;


const initialFilters = {
  stories: 'Stories',
  popularity:'Popularity',
  time: 'All time',
  storiesOpen: false,
  popularityOpen:false,
  timeOpen:false
}
export function filter (state = initialFilters, action) {
  switch (action.type) {
    case CHANGE_STORIES_FILTER:

      return{
        ...state,
        stories:action.data
      }
    case CHANGE_POPULARITY_FILTER:
    console.log('pop')
      return{
        ...state,
        popularity:'Date'
      }
    case CHANGE_TIME_FILTER:
      return{
        ...state,
        time:'Last 24h'
      }
    case TOGGLE_STORIES_DROPDOWN:
    return{
      ...state,
      storiesOpen:!state.storiesOpen,
      popularityOpen:false,
      timeOpen:false,
    }
    case TOGGLE_POPULARITY_DROPDOWN:
      return{
        ...state,
        popularityOpen:!state.popularityOpen,
        storiesOpen:false,
        timeOpen:false
      }
    case TOGGLE_TIME_DROPDOWN:
    return{
      ...state,
      timeOpen:!state.timeOpen,
      storiesOpen:false,
      popularityOpen:false
    }
    default:
      return state
  }
}




export const getStories = state => state
export const getPopularity = state => state.popularity;
export const getTime = state => state.time;
  const rootReducer = combineReducers({
    articles,
    filter
  });

  export default rootReducer
