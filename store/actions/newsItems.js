/**
 * Action definitions to be used by Redux dispatcher
 */

export const SET_NEWS_ITEMS = 'SET_NEWS_ITEMS';
import ENV from '../../constants/Environment';

export const fetchNewsItems = () => {
    return async dispatch => {
        const url = ENV.API_URL + 'news-items?unit.invite_code=BYTEBACK';
        const response = await fetch(url);
        const resData = await response.json();
    
        dispatch({ type: SET_NEWS_ITEMS, newsItems: resData });
    };
  };