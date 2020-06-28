import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as messageActions from '../store/actions/messages';

import Message from '../components/Message';


import ENV from '../constants/Environment';



export default function MessagesScreen({navigation}) {
    //Hooks manage state
    const[status, setStatus] = useState();
    const[isLoading, setIsLoading] = useState(false);
    const[isRefreshing, setIsRefreshing] = useState(false);
    const messages = useSelector(state => state.messages);
    
    // create dispatch helper to execute calls redux actions
    const dispatch = useDispatch();

    // get user info form redux store
    const user = useSelector(state => state.userInfo);
  

    // get the jwt security token from the userinfo
    const jwt =   user.userInfo !== undefined &&
                  user.userInfo.hasOwnProperty("jwt") ? 
                  user.userInfo.jwt :  false;

    const userId =  user.userInfo !== undefined &&
                    user.userInfo.hasOwnProperty("user") &&
                    user.userInfo.user.hasOwnProperty("id") ? 
                    user.userInfo.user.id :  false;
    
    console.log("==USERINFO==");
    console.log("jwt:  " +jwt);
    console.log("id: " + userId)


    //set up the stack header
    //title and the open drawer button
    navigation.setOptions({
        headerTitle: 'Messages',
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

    useEffect(() => {    
        loadMessages(userId, jwt);
    }, [dispatch]);

    //function which uses dispatch to call redux store action
    //to retrieve messages for a given user, with 
    const loadMessages = (uId, token) => {
      setIsLoading(true);
      setStatus("Loading...");
      dispatch(messageActions.getMessages(uId, token))
      .then(() => {
        console.log("Fetched " + Object.keys(messages.messages).length + " messages. ");
        //console.log(messages);
        setStatus("OK")
      })
      .catch((error) => {
        setStatus(error.message); 
      });
    };

    const deleteMessageHandler = (id) => {
      dispatch(messageActions.deleteMessage(id, jwt))
      .then(() => {
        console.log("Deleted message. ");
        //console.log(messages);
        setStatus("OK");
        loadMessages(userId, jwt);
      })
      .catch((error) => {
        console.log("ERROR: " + error.message);
        setStatus(error.message); 
      });
    }
    
    if(Object.keys(messages.messages).length === 0) {
      return(
        <View style={styles.container}>
          
                <Text style={styles.big}>¯\_(ツ)_/¯ </Text>
                <Text style={styles.h3}>There are no messages.</Text>
                <Text style={styles.messageText}>    
                If you believe that's impossible, you're welcome
                ask the server again.  Press the button below and
                I'll go get the manager. 

          </Text>
          <Button
                  title="Ask again"
                  onPress={() => loadMessages(userId, jwt)} 

                />
        </View>
      );
    }

    return (
        <View>
            <FlatList 
              onRefresh={() => {
                loadMessages(userId, jwt)
              }}
              refreshing={isRefreshing}
              data={messages.messages}
              keyExtractor={item => item.id.toString()}              
              renderItem={itemData => (
                  <Message
                      id={itemData.item.id}
                      deleteMessage={() => {
                        deleteMessageHandler(itemData.item.id)
                      }}
                      from={itemData.item.from}
                      text={itemData.item.text}
                      sentTime={itemData.item.created_at}
                  />
              )} />
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        
    },
    messageText: {
        color: '#777',
        marginVertical: 20,
        fontSize: 18,
        textAlign: "justify",
    },
    h3:{
      fontSize:25,
     
    },
    big: {
      fontSize: 50,
  
      textAlign: "center",
      marginVertical: 10,
    }

});