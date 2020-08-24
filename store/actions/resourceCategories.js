/**
 * Action definitions to be used by Redux dispatcher
 */


export const FETCH_RESOURCE_CATEGORIES = 'FETCH_RESOURCE_CATEGORIES';
export const FETCH_CATEGORY_DETAILS = 'FETCH_CATEGORY_DETAILS';



import ENV from '../../constants/Environment';


export const fetchResourceCategories = (inviteCode = "", productionApi = true) => {

    const API = productionApi ? ENV.API_URL : ENV.DEV_API_URL;

    const url = API + 'resource-categories?unit.invite_code=' + inviteCode;
    
    
    return async dispatch => {
        try {
            
            const response = await fetch(url);
            
            if(!response.ok){
                // can parse response for additional info if needed.
                // throwing generic error now.
                throw new Error('Something went wrong reaching server.');  
            }
            const resData = await response.json();
        
            dispatch({ type: FETCH_RESOURCE_CATEGORIES, resourceCategories: resData });
        } catch(err) {
            // can do something here with error. 
            console.log("problem with the url: " + url);
            throw err;
        }
    };
  }; 

export const fetchCategoryDetails = (categoryId = "", productionApi = true) => {

    const API = productionApi ? ENV.API_URL : ENV.DEV_API_URL;
    const url = API + 'resources?resource_category=' + categoryId;
    
      return async dispatch => {
        try {
            
            const response = await fetch(url);
            
            if(!response.ok){
                // can parse response for additional info if needed.
                // throwing generic error now.
                throw new Error('Something went wrong reaching server.');  
            }
            const resData = await response.json();
        
            dispatch({ 
                        type: FETCH_CATEGORY_DETAILS, 
                        categoryDetails: resData, 
                        categoryId: categoryId, 
                    });
        } catch(err) {
            // can do something here with error. 
            console.log("problem with the url: " + url);
            throw err;
        }
    };
};