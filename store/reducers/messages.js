/**
 * This is a reducer for messages
 * 
 **/

import { GET_MESSAGES, DELETE_MESSAGE } from '../actions/messages';

const initialState =  {
    messages: {}
}

const messagesReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_MESSAGES:
            state.messages = action.messages;
            return state;
        default:
            return state;
    }
}

export default messagesReducer;