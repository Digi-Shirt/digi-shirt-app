import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as contactsActions from '../store/actions/contacts';

import { set } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import ENV from '../constants/Environment';

import StandardButton from '../atoms/StandardButton';
import styles from '../constants/defaultStyle';
import SelectContact from '../components/SelectContact';
import ComposeMessage from '../components/ComposeMessage';

export default function ContactScreen({navigation}){

    // Hooks setup for this component
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [status, setStatus] = useState("");
    const [requestDispatched, setRequestDispatched] = useState(false); 
    const [contact, setContact] = useState(null);
    const [message, setMessage] = useState("");
    const [from, setFrom] = useState("");
    const [messageSent, setMessageSent] = useState(false);
    const settings = useSelector(state => state.settings);
    const contacts = useSelector(state => state.unitContacts.unitContacts); 

    //Set up header
    navigation.setOptions({
        headerTitle: 'Contact',
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
    
    const dispatch = useDispatch();

    useEffect(() => {
        loadContacts();
     }, [dispatch]);
   
     const loadContacts = () => {
       setIsLoading(true);
       setStatus("Loading...");
       dispatch(contactsActions.fetchUnitContacts(settings.inviteCode))
       .then(() => {
         setIsLoading(false);
         setStatus("");
       })
       .catch( (error) => {
         setStatus(error.message);
       });
     };

     const cancelButtonHandler = () => {
         setMessageSent(false);
         setContact(null);
     };

     const sendButtonHandler = () => {
        //put the message together...
        //console.log("called send!");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            "id":null,
            "from": from,
            "text": message,
            "to": contact.id
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(ENV.API_URL + "messages", requestOptions)
          .then(response => {
              if(response.ok){
                  setMessageSent(true);
              }
          })
          .catch(error => console.log('error', error));
                
    }
    
    //If you have an addressee has not been chosen display the picker
    if(contact === null){
        return(
            <SelectContact
                contacts={contacts} //the array of contacts
                contact={contact} //currently selected contact (if one)
                setContact={(c) => setContact(c)}
                
            />
        );
    }
    
    /**
     *  Displays the form to compose a message
     */
    if(messageSent === false && contact.hasOwnProperty("user")){
        return (
            <ComposeMessage
                contact={contact}
                onPressSend={sendButtonHandler}
                onPressCancel={cancelButtonHandler}
                setMessage={setMessage}
                setFrom={setFrom}

            />
        );
    }

    return(
        <View style={[styles.container, {padding: 20}]}>
                <Text style={styles.h2} >Thank you, your message to {contact.name} been sent.</Text>
                <View style={styles.buttonContainer}>               
                        <StandardButton 
                        title='Back' 
                        onPress={cancelButtonHandler}
                        />
                </View>
        </View>
    );

} 

const stylesOld = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        height: "100%",
    },
    h2: {
        fontSize: 40,
        textAlign: "center",
        margin: 20,
    },
    info: {
        textAlign: "center",
        fontSize: 18,
    },
    input: {
        fontSize: 24,
        borderColor: '#CCC',
        borderWidth: 2,
        marginVertical: 20,     
        padding: 5,   
    },
    buttons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-end',
        height: 100,
        marginRight: -10,
        marginTop: -10,
    },
    buttonContainer:{
        flex: .4,
        height: 100,
    },
    cancelButton: {
        backgroundColor: '#900',
        marginVertical: 15,
        marginHorizontal: 20,
    },
    addressee: {
        fontSize: 30,
        marginTop: 10,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginTop: -75,
        marginRight: 5,
        alignSelf: 'flex-end',
        zIndex: 1,
    },  
    backgroundImage:{
        flex: 1,
        width: "100%",
        paddingTop: 20,
        alignItems: "center",
    },
});