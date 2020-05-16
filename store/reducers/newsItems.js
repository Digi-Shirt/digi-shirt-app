/**
 * This is a reducer for news Items
 */
import { UPDATE_NEWS_ITEMS, SET_NEWS_ITEMS } from '../actions/newsItems';
import MockNewsData from '../../components/__mock__/newsItems';

//TODO:  make this pull the hydrated redux instead of some fake news
const initialState =  {
    newsItems: [
    ]
}

const newsItemsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_NEWS_ITEMS:
            state.newsItems = action.newsItems;
            return state;
        default:
            return state;
    }
}




export default newsItemsReducer;