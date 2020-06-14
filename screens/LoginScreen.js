import React, {useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';

import ENV from '../constants/Environment';


/**
 * */

const LoginScreen = ({navigation}) => {
  //set up the hooks
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const[loginError, setLoginError] = useState("");

  //Set up header
  navigation.setOptions({
    headerTitle: 'Login',
    headerLeft: () => (
      <TouchableOpacity 
        style={{paddingLeft:16}}
        onPress={() => navigation.toggleDrawer()}>
          <Ionicons
            name="md-menu"
            size={30}
              />
      </TouchableOpacity>
    )
  });

  const loginButtonHandler = () => {
    console.log("LOGIN: " + username);
    console.log("PASS: " + password);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"identifier":{username},"password":{password}});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(ENV.API_URL +"auth/local", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => {
        setLoginError("Login Failed.");
        console.log('error', error)
      });

      //setLoginError("Login Failed.");
  };

  return (
    <View style={styles.container}>
      {loginError !="" && <ErrorMessage message={loginError} /> }  
            
      <TextInput 
          name='username'
          style={styles.input} 
          placeholder='User'
          placeholderTextColor='#CCC'
          onChange={event => setUsername(event.nativeEvent.text)}
      />
      <TextInput 
          name='password'
          style={styles.input} 
          placeholder='Password'
          secureTextEntry={true}
          placeholderTextColor='#CCC'
          onChange={event => setPassword(event.nativeEvent.text)}
      />
      <View style={styles.buttonContainer}>
         <Button 
              style={styles.loginButton} 
              title='Login'
              onPress={loginButtonHandler}
          />
      </View> 
      <Text style={styles.h3}>
        Only members of the command team will have login credentials.
        If you believe you should be able to login, please contact the 
        the Digi-Shirt Application development team. 
      </Text>     
    </View>
  );
};

const ErrorMessage = (props) => {
  return (      <View style={styles.errorMessageBox}>
    <Ionicons
           name="md-alert"
           size={30}
           color="#B55" />
    <Text style={styles.errorText}>{props.message}</Text>
  </View>);
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
    h3: {
    margin: 25,
    color: '#888',
    fontSize: 15,
    textAlign: 'justify',
  },
  input: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    borderColor: '#CCC',
    borderWidth: 2,
    height: 45,
    paddingHorizontal: 15,
  },
  loginButton: {
    
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
  errorMessageBox:{
    flexDirection: 'row',
    backgroundColor: '#F88',
    margin: 20,
    padding: 20,
    textAlignVertical: 'center',
  },
  errorText:{
    textAlignVertical: 'center',
    marginHorizontal: 20,
    fontSize: 18,
    color: '#222',
  },
});