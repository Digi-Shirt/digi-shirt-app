import * as React from 'react';
import { View, Text, Button, Modal, StyleSheet, Image, TextInput, ImageBackground } from 'react-native';
import StandardButton from '../atoms/StandardButton';

import styles from '../constants/defaultStyle';

const ConfirmInviteCodeModal = (props) => {

    return(
        <Modal
            animationType="slide"
            visible={props.visible} 
            presentationStyle="fullScreen"
        >
        <View style={styles.modalView}>
                <Text style={styles.h2}>Congratulations!</Text>
                <Text style={styles.textBlock}>
                You're ready to join the <Text style={styles.bold}>
                    {props.unitNameLong}</Text>!
                                        
                </Text>
                <Text style={styles.messageText}>
                    Please confirm this is the unit you are intending to join.  
                </Text>
                
                    
                        <StandardButton 
                            title="Confirm"
                            onPress={props.confirmHandler}
                        />
                   
                    
                        <StandardButton
                            title="Nope"
                            onPress={props.cancelHandler} />

                    
                     
            </View>     
        </Modal>
    );
}

export default ConfirmInviteCodeModal;
