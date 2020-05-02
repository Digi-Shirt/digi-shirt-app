/**
 * Action definitions to be used by Redux dispatcher
 */

export const SET_NEWS_ITEMS = 'SET_NEWS_ITEMS';
import ENV from '../../constants/Environment';

export const fetchNewsItems = () => {
    return async dispatch => {
        try {
            const url = ENV.API_URL + 'news-items?unit.invite_code=BYTEBACK';
            const response = await fetch(url);
            
            if(!response.ok){
                // can parse response for additional info if needed.
                // throwing generic error now.
                throw new Error('Something went wrong reaching server.');  
            }
            const resData = await response.json();
        
            dispatch({ type: SET_NEWS_ITEMS, newsItems: resData });
        } catch(err) {
            // can do something here with error. 
            throw err;
        }
    };
  };