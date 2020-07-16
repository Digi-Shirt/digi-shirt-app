import { UPDATE_USER, LOGIN, LOGOUT } from "../actions/user";

const initialState = {
    userInfo: {}
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_USER:
            console.log("dispatched update user: " + action.userInfo);
            return {...state, userInfo: action.userInfo};
        case LOGIN:
            return {...state, userInfo: action.userInfo};
        case LOGOUT:
            console.log("logout action called");
            return {...state, userInfo: {}};
        default:
            return state;
    }
}

export default userReducer;