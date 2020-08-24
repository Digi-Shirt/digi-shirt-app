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

    //
    const defaultState = settings.hasOwnProperty("productionApi") ?
                         settings.productionApi : true;
    const [isEnabled, setIsEnabled] = useState(defaultState);
    
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
                Application Version: {ENV.APP_VERSION} 
               
            </Text>
            <View style={styles.toggleTable}>
                <View>
                    {isEnabled ? 
                    <Text style={styles.developmental}>Developmental</Text> :
                    <Text style={styles.production}>Production</Text>
                    }
                    <Text>API: {ENV.API_URL}</Text>
                </View>
                <View style={styles.switchView}>
                    <Switch 
                        onValueChange={toggleSwitch}
                        trackColor={{ false: "#767577", true: "#999900" }}
                        thumbColor={isEnabled ? "#FFBF00" : "#f4f3f4"}
                        //ios_backgroundColor="#3e3e3e"
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
    production:{
        fontSize:18,
        color: 'green',
        fontWeight: 'bold',
    },
    developmental:{
        fontSize:18,
        color: '#997900',
        fontWeight: 'bold',
    },
    switchView: {
        flex: 1,
        alignContent: 'center',
        alignSelf: 'center',
    
    },
    toggleTable: {
        flexDirection: 'row',
        alignContent: 'center',
        marginVertical: 15,
        
    },
});