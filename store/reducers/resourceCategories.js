/**
 * This is a reducer for resource categories
 */
import { FETCH_RESOURCE_CATEGORIES, FETCH_CATEGORY_DETAILS  } from '../actions/resourceCategories';



//TODO: replace with redux store for initial state
// Test data

const initialState =  {
    resourceCategories: [  ],
}

const resourceCategoriesReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_RESOURCE_CATEGORIES:
            state.resourceCategories = action.resourceCategories;
            return state;
        case FETCH_CATEGORY_DETAILS:
            //console.log("CALLING FETCH_CATEGORY_DETAILS");
            const resourceCategories = state.resourceCategories.map((category) => {
             
              
                if(category.id == action.categoryId){
                  //console.log("MAP WAS TRUE!!!!!!!!!");
                  //console.log(action);
                  category.resources = action.categoryDetails;
                  //console.log(action.categoryDetails);
                }
                return category;
            });
            return {...state, 
              resourceCategories: resourceCategories
            };
        default:
            return state;
    }
}




export default resourceCategoriesReducer;