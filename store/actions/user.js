export const UPDATE_USER = 'UPDATE_USER';
export const LOGOUT = 'LOGOUT';


export const updateUser = (userInfo) => {
    return {type: UPDATE_USER, userInfo: userInfo};
}


export const logout = () => {
    return {type: LOGOUT};
}