import React, {useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { changeInviteCode, updateSettings } from '../store/actions/settings';

export default function SettingsScreen({navigation}){
    
    // get all of the settings from the store with useSelector,
    // use hooks to capture changes to the settings
    const settings = useSelector(state => state.settings);
    const [inviteCode, setInviteCode] = useState(settings.inviteCode);

    //Set up header
    navigation.setOptions({
        headerTitle: 'Settings',
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
    
    //create a callback function to have dispatched when save button is pressed
    const dispatch = useDispatch();
    const saveSettings = useCallback(() => {
        dispatch(changeInviteCode(inviteCode))
    }, [dispatch, inviteCode]);


    return(
        <View style={styles.container}>
            <Text style={styles.h2}>CHANGE YOUR INVITE CODE </Text>
            <Text style={styles.info} >This code is provided by your squadron.</Text>
            <TextInput 
                style={styles.input}            
                placeholder='Invite Code'
                defaultValue={settings.inviteCode}
                onChangeText={code => {setInviteCode(code)}}
                
            />
            <Button title="Save" onPress={saveSettings} />
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
});