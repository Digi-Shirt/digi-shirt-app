
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {useSelector} from 'react-redux';
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';



export function DrawerContent(props) {

    const user = useSelector(state => state.userInfo);
    
    const username = user.userInfo !== undefined &&
                     user.userInfo.hasOwnProperty("user") &&
                     user.userInfo.user.hasOwnProperty("username") ? 
                     user.userInfo.user.username :  false;
    

    return(
        <DrawerContentScrollView {...props}>
            <Text style={styles.navHeader}>Digi-Shirt</Text>
            <DrawerItemList {...props} />
            {username && <Text style={styles.loggedIn}>You are logged in as {username}</Text>}
        </DrawerContentScrollView>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
navHeader:{
    marginVertical: 20,
    marginHorizontal: 5,
},
loggedIn:{
    margin: 20,
},
});