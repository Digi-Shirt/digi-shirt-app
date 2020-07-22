import * as React from 'react';
import { View, Text, Button, Modal, StyleSheet, Image, TextInput, ImageBackground } from 'react-native';

import StandardButton from '../atoms/StandardButton';
import ErrorMessage from '../atoms/ErrorMessage';
import styles from '../constants/defaultStyle';


const EnterInviteCodeModal = (props) => {

    return(
        <Modal
        animationType="slide"
        visible={props.visible} 
        presentationStyle="fullScreen"
        >
        <View style={styles.modalView}>
            <Text style={styles.h1}>Welcome to Digi-Shirt</Text>
        <Text style={styles.textBlock}>To get started you'll need to enter 
            your squadron's invite code. </Text>
        
        {
            props.inviteCodeError ? 
             <ErrorMessage 
                message="The invite code was not accepted."
            />
            : null
        }   
        
        <TextInput 
        style={styles.input}            
        placeholder='Invite Code'
        onChangeText={code => {props.onUpdate(code)}}
        
        />


        <StandardButton 
            title="Go!"
            onPress={props.buttonPressHandler}
        />
        </View>     
    </Modal>
    );
}

export default EnterInviteCodeModal;

