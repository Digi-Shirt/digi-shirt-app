import React, {useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';

import StandardButton from '../atoms/StandardButton';

import {updateUser, login, logout} from '../store/actions/user';


const LoginScreen = ({navigation}) => {
  //set up the hooks
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const[loginError, setLoginError] = useState("");
  const[loginSuccess, setLoginSuccess] = useState(false);
  const[loginInfo, setLoginInfo] = useState();

  //set up to save user info in the datastore
  const user = useSelector(state => state.userInfo);

  const dispatch = useDispatch();
  const saveUserInfo = useCallback(() => {
      dispatch(updateUser(loginInfo))
  }, [dispatch, loginInfo]);
  
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
    dispatch(login(username, password))
    .then(() => {
        setLoginError("");
        setLoginSuccess(true);
      }
    )
    .catch(error => {
      console.log("Error in logging in");
      setLoginError("Authentication Error.");
    });
   
  };

  const logoutButtonHandler = useCallback(()  => {
    console.log("called logout");
    dispatch(logout());
   }, [dispatch]);

  // If user is defined an it has a user property... then everything has worked,
  // and we should show a login success message.
  if(user.userInfo !== undefined && user.userInfo.hasOwnProperty("user")){
    const username = user.userInfo.user.hasOwnProperty("username") ? 
                     user.userInfo.user.username :  "null";

  
    return (
      <View style={styles.container}>
        {loginSuccess && <SuccessMessage>You have successfully logged in.</SuccessMessage>}
      <Text style={styles.h3}>You are currently logged in as: {username}</Text>
        <View style={styles.buttonContainer}>
          <StandardButton 
            title='Logout'
            onPress={logoutButtonHandler}
          />
        </View>
      </View>
    );
  }

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
         <StandardButton 
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



const SuccessMessage = (props) => {
  return (<View style={styles.successMessageBox}>
    <Ionicons 
        name="md-checkmark-circle-outline" 
        size={30} 
        color="#090" />
    <Text style={styles.errorText}>Login Successful!</Text>
  </View>)
}

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
    width: "90%",
    alignSelf: "center",
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
  successMessageBox: {
    flexDirection: 'row',
    backgroundColor: '#BFB',
    margin: 20,
    padding: 20,
    textAlignVertical: 'center',
  },
});