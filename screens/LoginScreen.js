import React, {useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';



/**
 * var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"identifier":"Shirt","password":"byteback"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://dev.shirt.services/auth/local", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));*/

