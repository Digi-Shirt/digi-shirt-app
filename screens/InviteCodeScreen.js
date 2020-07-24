import React, { useState, useCallback } from 'react';
import { View, Text, Button, Modal, StyleSheet, Image, TextInput, ImageBackground } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as settingActions from '../store/actions/settings';
import EnterInviteCodeModal from '../components/EnterInviteCodeModal';
import ConfirmInviteCodeModal from '../components/ConfirmInviteCodeModal';
import StandardButton from '../atoms/StandardButton';

import styles from '../constants/defaultStyle';

export default function InviteCodeScreen ({ navigation }) {
    // set up hooks to manage state
    const settings = useSelector(state => state.settings);
    const [modalVisible, setModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [inviteCode, setInviteCode] = useState();
    const [inviteCodeError, setInviteCodeError] = useState(false);

    const unitInfo = settings.hasOwnProperty("unitInfo")                      
                     ? settings.unitInfo : "";

    const unitName = settings.hasOwnProperty("unitInfo") 
                     && settings.unitInfo.hasOwnProperty("unit_name") 
                     ? settings.unitInfo.unit_name : "";

    const unitNameLong = settings.hasOwnProperty("unitInfo") 
                     && settings.unitInfo.hasOwnProperty("unit_name_long") 
                     ? settings.unitInfo.unit_name_long : "";

             
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
        .catch(error => {
            setInviteCodeError(true);
            console.log(error)
        }); 
    }, [dispatch, inviteCode]);

    //
    // 
    
    const confirmButtonHandler = () => {
        console.log("Pressed Confirm");
        saveInviteCode(inviteCode);
        setSuccessModalVisible(false);
        setModalVisible(false);
        navigation.navigate('Home');
    };

    const cancelButtonHandler = () => {
        console.log("Pressed Cancel");
        setSuccessModalVisible(false);
    };


    return(
        <View style={styles.container}>
            
            <ImageBackground 
                source={require('../assets/images/elephant_walk.jpeg')}
                style={styles.backgroundImage}
                >
                <EnterInviteCodeModal 
                    visible={modalVisible}
                    buttonPressHandler={testInviteCode} 
                    onUpdate={setInviteCode}
                    inviteCodeError={inviteCodeError}/>

                <ConfirmInviteCodeModal 
                    visible={successModalVisible}
                    unitNameLong={unitNameLong}
                    confirmHandler={confirmButtonHandler}
                    cancelHandler={cancelButtonHandler}
                    unitInfo={unitInfo}
                /> 
                <Image
                    style={styles.placeHolderImage}
                    source={require('../assets/images/digi-shirt-logo-thick-stroked.png')}
                />
                <View style={styles.buttonsContainer}>
                    <StandardButton 
                        title="Get Started!"
                        onPress={() => {setModalVisible(true)}}
                    />
                </View>
            </ImageBackground>
        </View>


    );
}
