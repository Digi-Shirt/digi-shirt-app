/**
 * This is a reducer for news Items
 */
import { UPDATE_NEWS_ITEMS } from '../actions/newsItems';
import MockNewsData from '../../components/__mock__/newsItems';

//TODO: replace with accessing local SQLite database for initial state
// Test data
//import MockNewsData from '../components/__mock__/newsItems';
//const newsData =
const initialState =  {
    newsItems: [
        {
          id: '1',
          title: "PAWS Day",
          article: "This is the full text for PAWS Day. \n\n This is the full text for PAWS Day. This is the full text for PAWS Day. This is the full text for PAWS Day. This is the full text for PAWS Day. This is the full text for PAWS Day. This is the full text for PAWS Day. This is the full text for PAWS Day.This is the full text for PAWS Day"
        }, 
        {
          id: '2',
          title: "Commander's Call",
          article: "This is the full text for Commander's Call"
        },
        {
          id: '3',
          title: "Data Burst",
          article: "This is the full text for Data Burst"
        },
    ]
}

const newsItemsReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_NEWS_ITEMS:
            //access database
            //return the updated state
            return state;
        default:
            return state;
    }
}

export default newsItemsReducer;