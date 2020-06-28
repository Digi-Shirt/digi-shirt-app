/**
 * Action definitions to be used by Redux dispatcher
 */

export const SET_NEWS_ITEMS = 'SET_NEWS_ITEMS';
import ENV from '../../constants/Environment';

export const fetchNewsItems = () => {
    //TODO: make this use dynamic invite code
    const url = ENV.API_URL + 'news-items?unit.invite_code=BYTEBACK';
    return async dispatch => {
        try {
            
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
            console.log("problem with the url: " + url);
            throw err;
        }
    };
  }; 