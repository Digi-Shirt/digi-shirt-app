export const CHANGE_INVITE_CODE = 'CHANGE_INVITE_CODE';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';


export const changeInviteCode = (value) => {

    

    return { type: CHANGE_INVITE_CODE, inviteCode: value };
}

export const updateSettings = (settings) => {
    return {type: UPDATE_SETTINGS, settings: settings};
}