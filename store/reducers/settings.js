import {    CHANGE_INVITE_CODE, 
            UPDATE_SETTINGS,
            TEST_INVITE_CODE } from "../actions/settings";

const initialState = {
    inviteCode: "",
    unitInfo: [],
    productionApi: true,
}

const settingsReducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_INVITE_CODE:
            console.log("dispatched change_invite_code reducer changing invite coded to: " + action.inviteCode);
            return {...state, inviteCode: action.inviteCode}
        case TEST_INVITE_CODE:
            console.log("dispatched TEST_INVITE_CODE, saving unit info to store.")
            return {...state, unitInfo: action.unitInfo}
        case UPDATE_SETTINGS:
            console.log("made it here...");
            const settings = action.settings; 
            console.log("Reducer settting prodapi to " + settings.productionApi);
            return {...state, settings}
        default:
            return state;
    }
}

export default settingsReducer;