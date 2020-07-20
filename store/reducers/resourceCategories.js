/**
 * This is a reducer for resource categories
 */
import { FETCH_RESOURCE_CATEGORIES, 
         FETCH_CATEGORY_DETAILS  } from '../actions/resourceCategories';


// Assign initial state of the resources categories
const initialState =  {
    resourceCategories: [  ],
}

const resourceCategoriesReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_RESOURCE_CATEGORIES:
            // assign the categories passed from the action to the current
            // state to be managed by redux/thunk.
            state.resourceCategories = action.resourceCategories;
            return state;
            
        case FETCH_CATEGORY_DETAILS:
            // iterate through the current state resource categories, if
            // any of the categories match the category id category pass
            // in the action property, then add/replace the old resources 
            // array with the new one being passed
            const resourceCategories = state.resourceCategories.map((category) => {
                
                if(category.id == action.categoryId){
                    category.resources = action.categoryDetails;
                }
                return category;
            });

            return {...state, resourceCategories: resourceCategories };

        default:
            return state;
    }
}


export default resourceCategoriesReducer;