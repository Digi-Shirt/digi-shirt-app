import React, { useState, useCallback } from 'react';
import { View, Text, Button, Modal, StyleSheet, Image, TextInput } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as settingActions from '../store/actions/settings';


export default function InviteCodeScreen ({ navigation }) {
    // set up hooks to manage state
    const settings = useSelector(state => state.settings);
    const [modalVisible, setModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [inviteCode, setInviteCode] = useState();

    console.log("SETTINGS: ");
    console.log({settings});
    console.log(settings.unitInfo.unit_name);
  
    // // If invite code has been set, navigate back to home screen
    // if(!settings.hasOwnProperty("inviteCode") || settings.inviteCode != ""){
    //     console.log("Invite Code was set.");
    //     setSuccessModalVisible(false);
    //     setModalVisible(false);
    //    // navigation.navigate('Home', {screen: 'News'});
    //     //navigation.navigate('Settings', { screen: 'Welcome' });

    // }
    
    // set up function to dispatch the button which saves the
    // invite code.
    const dispatch = useDispatch();
    const saveInviteCode = useCallback(() => {
        dispatch(settingActions.changeInviteCode(inviteCode));
    }, [dispatch, inviteCode]);

    // test invite code.  
    const testInviteCode = useCallback(() => {
        dispatch(settingActions.testInviteCode(inviteCode))
        .then(() => {
            setSuccessModalVisible(true);
        })
        .catch(error => console.log(error)); 
    }, [dispatch, inviteCode]);

    return(
        <View style={styles.container}>
            <Modal
                animationType="slide"
                visible={modalVisible} 
                presentationStyle="fullScreen"
            >
               <View style={styles.modalView}>
                    <Text style={styles.h1}>Welcome to Digi-Shirt</Text>
                    <Text style={styles.textBlock}>To get started you'll need to enter 
                    your squadron's invite code. </Text>
                    <TextInput 
                style={styles.input}            
                placeholder='Invite Code'
                onChangeText={code => {setInviteCode(code)}}
                
                />
                <Button 
                    title="Go!"
                    onPress={testInviteCode}    />
                </View>     
            </Modal>

            <Modal
                animationType="slide"
                visible={successModalVisible} 
                presentationStyle="fullScreen"
            >
               <View style={styles.modalView}>
                    <Text style={styles.h2}>Congratulations,</Text>
                    <Text style={styles.textBlock}>
                       you're ready to join the <Text style={styles.bold}>
                           {settings.unitInfo.unit_name_long}</Text>!
                                               
                     </Text>
                     <Text style={styles.messageText}>
                        Please confirm this is the unit you are intending to join.  
                     </Text>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <Button 
                                title="Confirm"
                                onPress={() => {
                                    console.log("Pressed Confirm");
                                    saveInviteCode(inviteCode);
                                    setSuccessModalVisible(false);
                                    setModalVisible(false);
                                    navigation.navigate('Home');
                                }}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Nope"
                                onPress={() => setSuccessModalVisible(false)}
                            />
                        </View>
                    </View>          
                </View>     
            </Modal>

            <Image
                style={styles.placeHolderImage}
                source={require('../assets/images/digi-shirt-logo-crop.png')}
            />
            <Button 
                title="Get Started!"
                onPress={() => {setModalVisible(true)}}
                
            />
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    modalView: {
        backgroundColor: '#FFF',
        padding: 40,   

    },
    h1: {
        fontSize: 50,
    },
    h2: {
        fontSize: 40,
    },
    bold: {
        fontWeight: 'bold'
    },
    textBlock: {
        //marginHorizontal: 20,
        marginVertical: 20,
        fontSize: 24,
        color: '#777',
    },
    placeHolderImage: {
        marginBottom: 20,
        width: 250,
        height: 250,
    },
    input: {
        fontSize: 24,
        borderColor: '#CCC',
        borderWidth: 2,
        marginVertical: 20,     
        padding: 5,   
    },  
    messageText: {
        color: '#777',
        marginVertical: 20,
        fontSize: 18,
        textAlign: "justify",
    },
    buttonsContainer: {
       
    }, 
    buttonContainer: {
       marginVertical: 10,
    },   
});