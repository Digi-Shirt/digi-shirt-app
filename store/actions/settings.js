import ENV from '../../constants/Environment';

export const CHANGE_INVITE_CODE = 'CHANGE_INVITE_CODE';
export const TEST_INVITE_CODE = 'TEST_INVITE_CODE';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';


export const changeInviteCode = (value) => {
    return { type: CHANGE_INVITE_CODE, inviteCode: value };
}

export const updateSettings = (settings) => {
    return {type: UPDATE_SETTINGS, settings: settings};
}

// Checks if the value is a valid invite code in the API
export const testInviteCode = (value) => {


    const url = ENV.API_URL + 'units?invite_code=' + value;

    return async dispatch => {
        try {
            
            const response = await fetch(url);
            
            if(!response.ok){
                // can parse response for additional info if needed.
                // throwing generic error now.
                throw new Error('Something went wrong reaching server.');  
            }
            const resData = await response.json();

            //if there is no data then return false
            if(Object.entries(resData).length === 0) {
                console.log("The invite code was not found");
                throw new Error('The invite code could not be verified.');  
            }
            
            console.log("INVITE CODE FOUND: " );
            console.log({resData});
            // if response did return an unit, dispatch that to save that info
            // in the data store
            if(resData[0].hasOwnProperty("id")){
                dispatch({ type: TEST_INVITE_CODE, unitInfo: resData[0] });
            }
        } catch(err) {
            // can do something here with error. 
            console.log("problem with the url: " + url);
            throw err;
        }
    }

}