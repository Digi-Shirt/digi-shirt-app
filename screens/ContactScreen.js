import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as contactsActions from '../store/actions/contacts';
import {Picker} from '@react-native-community/picker';
import { set } from 'react-native-reanimated';

export default function ContactScreen({navigation}){

    // Hooks setup for this component
    const[isLoading, setIsLoading] = useState(false);
    const[isRefreshing, setIsRefreshing] = useState(false);
    const[status, setStatus] = useState("");
    const[requestDispatched, setRequestDispatched] = useState(false);
    const contacts = useSelector(state => state.unitContacts.unitContacts);
    const[contact, setContact] = useState(null);

    
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

     const cancelButtonHandler = () => {
         setContact(null);
     };
    

    console.log(contacts);

    //If you have an addressee has not been chosen display the picker
    if(contact === null){
        return(
            <View style={styles.container}>
                <Text style={styles.h2} >Who would you like to contact?</Text>
                <Picker
                    style={styles.input}
                    selectedValue={contact}
                    onValueChange={(itemValue, itemIndex) => 
                        {
                            //console.log(itemValue);
                            
                            contacts.map(contactItem => {
                                if(contactItem.id == itemValue){
                                    setContact(contactItem);
                                }
                            })
                           // setContact(itemValue);
                        }
                    }
                >
                    <Picker.Item label="Choose a contact" value={null} />
                    {
                        contacts.map(contactItem => {
                            return <Picker.Item key={contactItem.id.toString()} label={contactItem.name + " (" + contactItem.role + ")"} value={contactItem.id} />
                        })

                    }
                </Picker>
            </View>
        );
    }
    
    return(
        <View style={styles.container}>
            <Text style={styles.addressee} >To: {contact.name}</Text>
            <TextInput 
                name='from'
                style={styles.input} 
                placeholder='Name (Not required)'
                placeholderTextColor='#CCC'
            />
            <TextInput 
                name='message'
                style={styles.input}
                multiline
                numberOfLines={4}
                placeholder='Message'
                placeholderTextColor='#CCC'
                textAlignVertical='top'
            />
            <View style={styles.buttons}>
                <Button
                    style={styles.button} 
                    title='Send' 
                    
                />
                <View style={styles.buttonContainer}>               
                     <Button 
                     title='Cancel' 
                     onPress={cancelButtonHandler}
                     />
                </View>

            </View>

        </View>
    );

} 

const styles = StyleSheet.create({
    container: {
        flex: .8,
        marginHorizontal: 20,
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
        alignItems: 'flex-start',
        
    },
    buttonContainer:{
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#900',
        marginVertical: 15,
        marginHorizontal: 20,
    },
    addressee: {
        fontSize: 20,
        marginTop: 10,
    }
});