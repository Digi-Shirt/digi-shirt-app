import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux';


import * as messageActions from '../store/actions/messages';


export default function Message(props) {
    const user = useSelector(state => state.userInfo);
    

    // get the jwt security token from the userinfo
    const jwt =   user.userInfo !== undefined &&
    user.userInfo.hasOwnProperty("jwt") ? 
    user.userInfo.jwt :  false;

    const dateObj = new Date(props.sentTime);
    const displayDate = dateObj.toDateString();
    const time = dateObj.toLocaleTimeString();
    return (
        <View style={styles.messageContainer}>
            <View style={styles.innerMessageContainer}>
                <Text style={styles.from}>From: {props.from}</Text>
                <Text style={styles.sentTime}>Sent: {displayDate + " @ " + time}</Text>
                <Text style={styles.messageText}>{props.text}</Text>
            </View>
            <View style={styles.deleteContainer}>
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={props.deleteMessage}
                    >
                    <Ionicons
                        name="md-trash"
                        size={30}
                        />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        flexDirection: 'row',
        shadowColor: '#222',        
        borderColor: '#DDD',
        borderWidth: 2,        
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        marginVertical: 5,

    },
    deleteContainer: {
        width: 40,
        alignContent: 'center',
        backgroundColor: '#FFF',
        borderLeftWidth: 2,
        borderColor: '#DDD',

    },
    deleteButton:{
        margin:10,
        
 
    },
    innerMessageContainer: {
        flex: 1,
        padding: 15,
      
    },
    from: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    sentTime: {
        fontSize: 18,
        fontStyle: 'italic',
    },
    messageText: {
        flex:1,
        marginTop: 15,
        flexDirection: "column",
        fontSize: 20,
        color: '#333',
    },

});