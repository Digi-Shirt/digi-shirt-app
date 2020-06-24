
/**
 * Action definitions to be used by Redux dispatcher
 */

export const GET_MESSAGES = 'GET_MESSAGES';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
import ENV from '../../constants/Environment';

export const getMessages = (userId, token) => {
    

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = "";

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return async dispatch => {
      try {
          //console.log(ENV.API_URL + "messages?to.id=" + userId);
          const response = await fetch(ENV.API_URL + "messages?to.id=" + userId, requestOptions);
          
          if(!response.ok){
              // can parse response for additional info if needed.
              // throwing generic error now.
              throw new Error('Error reaching server to get messages.');  
          }
          const resData = await response.json();
      
          dispatch({ type: GET_MESSAGES, messages: resData });
      } catch(err) {
          // can do something here with error. 
          console.log("problem with the url: " + url);
          throw err;
      }
  }; 
}; 

export const deleteMessage = (id, token) => {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var raw = "";

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return async dispatch => {
    const url = ENV.API_URL + "messages/" + id;
    try {
        console.log(url);
        const response = await fetch(url, requestOptions);
        
        if(!response.ok){
            // can parse response for additional info if needed.
            // throwing generic error now.
            throw new Error('Error reaching server to delete messages.');  
        }
        const resData = await response.json();
    
        dispatch({ type: DELETE_MESSAGE, message: resData });
    } catch(err) {
        // can do something here with error. 
        console.log("problem with the url: " + url);
        throw err;
    }
  }; 


};