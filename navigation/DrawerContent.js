
/**
 * Custom Drawer Content Component
 * This component allows for the customization of the drawer-navigation body.
 * 
 */

import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import {useSelector} from 'react-redux';
import { DrawerContentScrollView } from '@react-navigation/drawer';

//Custom item list component (to allow hidden navigation items)
import CustomDrawerItemList from './CustomDrawerItemList'; 
import ENV from '../constants/Environment';

export function DrawerContent(props) {

    const user = useSelector(state => state.userInfo);
    const settings = useSelector(state => state.settings);
    
    
    // Break down some of the values from the use user state
    const loggedIn = user.userInfo !== undefined &&
                     user.userInfo.hasOwnProperty("user") ? 
                     true : false;

                     
    const userHasImage = loggedIn && 
                         user.userInfo.user.hasOwnProperty("profile_picture") ?
                         true : false;

    const username = loggedIn &&
                     user.userInfo.user.hasOwnProperty("username") ? 
                     user.userInfo.user.username :  false;

    const userRelativeSource =  userHasImage ?
                                user.userInfo.user.profile_picture.formats.thumbnail.url.substr(1) :
                                "";

    const userImageSource = {uri : ENV.API_URL + userRelativeSource };
    


    // Break down some of the values for unit info from 
    // settings state
    const imageExists = settings.hasOwnProperty("unitInfo") &&
                        settings.unitInfo.hasOwnProperty("image") ? true : false;

    const unitImageRelativeSource = imageExists ?
                                    settings.unitInfo.image.formats.small.url.substr(1) :
                                    "";
    
    const unitImageSource = { uri: ENV.API_URL + unitImageRelativeSource };
    
    return(
        <DrawerContentScrollView {...props}>

            <Text style={styles.navHeader}>Digi-Shirt</Text>
            <CustomDrawerItemList {...props} />
            {username && <Text style={styles.loggedIn}>
                You are logged in as {username}</Text>}

            {imageExists && 
            <Image
            style={styles.small}
            source={unitImageSource}
            />}

            {userHasImage &&
                <Image 
                    style={styles.avatar}
                    source={userImageSource}
                />
            }
        </DrawerContentScrollView>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: -75,
    marginRight: 5,
    alignSelf: 'flex-end',
    zIndex: 1,
},  

small: {
    height: 200,
    width: "100%",
    resizeMode: "contain",
},
navHeader:{
    fontSize: 30,
    
    marginVertical: 20,
    marginHorizontal: 5,
},
loggedIn:{
    margin: 20,
},
});