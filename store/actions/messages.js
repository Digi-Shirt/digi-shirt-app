
/** 
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTkxODk1NzIyLCJleHAiOjE1OTQ0ODc3MjJ9.xblRFwvbpAjztB8W0-K0wzDPj0dSYj_bMiikd04cv_4");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://dev.shirt.services/messages", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  */