import ENV from '../../constants/Environment';

export const UPDATE_USER = 'UPDATE_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';



export const updateUser = (userInfo) => {
    return {type: UPDATE_USER, userInfo: userInfo};
}

export const login = (username, password) => {
    // Setup new request options with header and body information
    // to authenticate with REST API
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"identifier": username,"password": password});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

    return async dispatch => {
        const url = ENV.API_URL + "auth/local";
        try {
            console.log(url);
            const response = await fetch(url, requestOptions);            
            
            if(!response.ok){
                // Throw an error if a response is received but the
                // response is not status code 200 () -- Auth failure
                console.log("There was an error.");
                throw new Error('Authentication Failure.');  
                
            }
            const resData = await response.json();
            dispatch({ type: LOGIN, userInfo: resData });

        } catch(err) {
            // can do something here with error. 
            console.log("Problem logging in: " + url);
            throw err;
        }
    };
};

export const logout = () => {
    return {type: LOGOUT};
}