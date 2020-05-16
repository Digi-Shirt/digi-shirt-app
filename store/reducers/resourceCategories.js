/**
 * This is a reducer for resource categories
 */
import { SET_RESOURCE_CATEGORIES  } from '../actions/resourceCategories';



//TODO: replace with redux store for initial state
// Test data

const initialState =  {
    resourceCategories: [
            {
              id: '1',
              title: "Mental Health",
              resources: [
                {
                  id: '1',
                  name: "MH res 1",
                  details: "This is a description of a service", 
                  email: ["email1@email.com", "email2@email2.com"],
                  phone: ["123456789", "123121234"],
                }, 
                {
                  id: '2',
                  name: "Resource 2",
                  details: "This is the full text for Commander's Call",
                  email: ["email1@email.com", "email2@email2.com"],
                  phone: ["123456789"],
                },
                {
                  id: '3',
                  name: "Resource 3",
                  details: "This is the full text for Data Burst",
                  email: ["email1@email.com", "email2@email2.com"],
                  phone: ["123456789"],
                },
              ],
            }, 
            {
              id: '2',
              title: "Sexual Assault",
              resources: [
                {
                  id: '1',
                  name: "JBSA Sexual Assault Response Hotline",
                  details: "Serving Army, Navy & Air Force",
                  phone: ["210-808-7272 (SARC)"],        }, 
                {
                  id: '2',
                  name: "BAMC Emergency Room",
                  phone: ["1210-916-0808"],        },
                {
                  id: '3',
                  name: "Rape Crisis Center Hotline",
                  phone: ["210-349-7273"],        },
              ],
            },
            {
              id: '3',
              title: "Finance",
            },
            {
              id: '4',
              title: "Career Development",
            },
            {
              id: '5',
              title: "Other",
            },
          ]
}

const resourceCategoriesReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_RESOURCE_CATEGORIES:
            state.resourceCategories = action.resourceCategories;
            return state;
        default:
            return state;
    }
}




export default resourceCategoriesReducer;