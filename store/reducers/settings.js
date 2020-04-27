import { CHANGE_INVITE_CODE, UPDATE_SETTINGS } from "../actions/settings";

const initialState = {
    inviteCode: 'BYTEBACK',
}

const settingsReducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_INVITE_CODE:
            console.log("dispatched change_invite_code reducer changing invite coded to: " + action.inviteCode);
            return {...state, inviteCode: action.inviteCode}
        case UPDATE_SETTINGS:
            const settings = action.settings; 
            return {...state, settings}
        default:
            return state;
    }
    return state;
}

export default settingsReducer;