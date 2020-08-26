import * as React from 'react';
import { View, Text, Button, Modal, StyleSheet, Image, TextInput, ImageBackground } from 'react-native';
import StandardButton from '../atoms/StandardButton';
import {Picker} from '@react-native-community/picker';

import ENV from '../constants/Environment';
import styles from '../constants/defaultStyle';



const SelectContact = (props) => {

    return(
        <View style={styles.container}>
            <ImageBackground 
                source={require('../assets/images/refueling.jpg')}
                style={styles.backgroundImage}
                >
           
                <Text style={[styles.h1, {backgroundColor: "#FFF", paddingLeft: 15,}]} >Who would you like to contact?</Text>
                <Picker
                    style={styles.input}
                    selectedValue={props.contact}
                    onValueChange={(itemValue, itemIndex) => 
                        {
                            props.contacts.map(contactItem => {
                                if(contactItem.id == itemValue){
                                    props.setContact(contactItem);
                                }
                            })
                        }
                    }
                >
                    <Picker.Item label="Choose a contact" value={null} />
                    {
                        props.contacts.map(contactItem => {
                            return <Picker.Item key={contactItem.id.toString()} label={contactItem.name + " (" + contactItem.role + ")"} value={contactItem.id} />
                        })

                    }
                </Picker>
             
            
            </ImageBackground>
        </View>
    );
};
export default SelectContact;
