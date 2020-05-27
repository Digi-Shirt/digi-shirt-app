import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as contactsActions from '../store/actions/contacts';

export default function ContactScreen(){

    // Hooks setup for this component
    const[isLoading, setIsLoading] = useState(false);
    const[isRefreshing, setIsRefreshing] = useState(false);
    const[status, setStatus] = useState("");
    const[requestDispatched, setRequestDispatched] = useState(false);
    const contacts = useSelector(state => state.unitContacts.unitContacts);
    
    const dispatch = useDispatch();

    useEffect(() => {
        loadContacts();
     }, [dispatch]);
   
     const loadContacts = () => {
       setIsLoading(true);
       setStatus("Loading...");
       dispatch(contactsActions.fetchUnitContacts())
       .then(() => {
         setIsLoading(false);
         setStatus("");
       })
       .catch( (error) => {
         setStatus(error.message);
       });
     };

    console.log(contacts);
    return(
        <View>
            <Text>This is a stub for contact.</Text>
        </View>
    );
}