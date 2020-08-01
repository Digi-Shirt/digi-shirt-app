import * as React from 'react';
import { View, Text, Button, Modal, StyleSheet, Image, TextInput, ImageBackground } from 'react-native';
import StandardButton from '../atoms/StandardButton';
import {Picker} from '@react-native-community/picker';

import ENV from '../constants/Environment';
import styles from '../constants/defaultStyle';


const ComposeMessage = (props) => {

    const contactHasProfilePicture = props.contact.hasOwnProperty("user") &&
                                     props.contact.user?.hasOwnProperty("profile_picture") ?
                                     true : false;

    const profilePictureUrl = props?.contact?.user?.profile_picture?.formats.thumbnail.url.substr(1);

    const profilePictureSource = {uri: ENV.API_URL + profilePictureUrl };

    return(
    <View style={styles.container}>
        <ImageBackground 
        source={require('../assets/images/refueling.jpeg')}
        style={styles.backgroundImage}
        >
            <View style={{ paddingLeft:20, width:"100%"}}>
                <Text style={[styles.input, {fontSize: 28, backgroundColor: "#FFF", }]} >To: {props.contact.name}</Text>
                {contactHasProfilePicture &&
                    <Image 
                    style={[styles.avatar, {marginTop: -100}]}
                    source={profilePictureSource}
                    />
                }
            </View>            
            <TextInput 
                name='from'
                style={styles.input} 
                placeholder='Name (Not required)'
                placeholderTextColor='#CCC'
                onChange={event => props.setFrom(event.nativeEvent.text)}
            />
            <TextInput 
                name='message'
                style={styles.input}
                multiline
                numberOfLines={4}
                placeholder='Message'
                placeholderTextColor='#CCC'
                textAlignVertical='top'
                onChange={event => props.setMessage(event.nativeEvent.text)}
            />
      
             <View style={{width: "90%"}}>
            <StandardButton
                    title='Send' 
                    onPress={props.onPressSend}
                    />
                
              
                    <StandardButton
                    title='Cancel' 
                    onPress={props.onPressCancel}
                    />
                 
                 </View>        
              
            
        </ImageBackground>
    </View>
    );
};

export default ComposeMessage;