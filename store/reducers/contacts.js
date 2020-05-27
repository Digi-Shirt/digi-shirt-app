/**
 * This is a reducer for contacts
 * 
 **/

import { GET_UNIT_CONTACTS } from '../actions/contacts';

const initialState =  {
    unitContacts: [
    ]
}

const contactsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_UNIT_CONTACTS:
            state.unitContacts = action.unitContacts;
            return state;
        default:
            return state;
    }
}

export default contactsReducer;