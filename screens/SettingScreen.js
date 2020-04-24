import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useSelector} from 'react-redux';

export default function ContactScreen(){
    const settings = useSelector(state => state.settings);
    console.log(settings.inviteCode);
    return(
        <View>
            <Text>{'Current Invite Code: ' + settings.inviteCode}</Text>
        </View>
    );
}