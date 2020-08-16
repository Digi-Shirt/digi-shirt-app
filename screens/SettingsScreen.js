import React, {useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Switch} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { changeInviteCode, updateSettings } from '../store/actions/settings';

import StandardButton from '../atoms/StandardButton';
import ENV from '../constants/Environment';

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

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        console.log("Toggle API");
        console.log(settings.productionApi);
        
        setIsEnabled((previousState) => 
        {
            settings.productionApi = !previousState;
            updateSettings(settings);
            return !previousState;
            
        });
        
    };
    
    return(
        <View style={styles.container}>
            <Text style={styles.messageText}>
                Version: {ENV.APP_VERSION} {'\n'}
                API: {ENV.API_URL}
            </Text>
            <View>
                <View>
                    <Text>Production</Text>
                </View>
                <View>
                    <Switch 
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>

            <Text style={styles.h2} >Change invite code </Text>
            <Text style={styles.info} >This code is provided by your squadron.</Text>
            <TextInput 
                style={styles.input}            
                placeholder='Invite Code'
                defaultValue={settings.inviteCode}
                onChangeText={code => {setInviteCode(code)}}
                
            />
            <StandardButton title="Save" onPress={saveSettings} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    h2: {
        fontSize: 30,
        textAlign: "justify",
        
    },
    info: {
        textAlign: "justify",
        fontSize: 18,
        color: '#777',
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
    h3:{
      fontSize:25,
     
    },
});