import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as messageActions from '../store/actions/messages';

import Message from '../components/Message';


import ENV from '../constants/Environment';



export default function MessagesScreen({navigation}) {
    //Hooks manage state
    const[status, setStatus] = useState();
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
    }, [dispatch, jwt, userId]);

    //function which uses dispatch to call redux store action
    //to retrieve messages for a given user, with 
    const loadMessages = (id, token) => {
      //setIsLoading(true);
      //setStatus("Loading...");
      dispatch(messageActions.getMessages(id, token))
      .then(() => {
        console.log("Fetched " + Object.keys(messages.messages).length + " messages. ");
        console.log(messages);
      })
      .catch((error) => {
        setStatus(error.message); 
      });
    };
    
    if(messages == false) {
      return(
        <View style={styles.container}>
          <Text style={styles.messageText}>
                No messages!
          </Text>
        </View>
      );
    }

    return (
        <View>
            <FlatList 
                data={messages.messages}                
                renderItem={itemData => (
                    <Message
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
        padding: 20,
    },
    messageText: {
        color: '#333',
    },

});