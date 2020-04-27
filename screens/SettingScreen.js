import React, {useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import { changeInviteCode, updateSettings } from '../store/actions/settings';

export default function ContactScreen(){
    const dispatch = useDispatch();

    //  const changeInviteCodeHandler = useCallback(() => {
    //      dispatch(changeInviteCode(inviteCode))
    //  }, [dispatch, inviteCode]);

    const settings = useSelector(state => state.settings);
    console.log(settings.inviteCode);

    const SaveHandler = () => {
        console.log("Save pressed");
    };

    return(
        <View style={styles.container}>
            <Text style={styles.h2}>CHANGE YOUR INVITE CODE </Text>
            <Text style={styles.info} >This code is provided by your squadron.</Text>
            <TextInput style={styles.input}
                placeholder='Invite Code'
                defaultValue={settings.inviteCode}
                onChangeText={code => {console.log(code)}}
                
            />
            <Button title="Save" onPress={SaveHandler()} />
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