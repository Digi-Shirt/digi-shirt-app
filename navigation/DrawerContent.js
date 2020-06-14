
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';


export function DrawerContent(props) {

    return(
        <DrawerContentScrollView {...props}>
            <Text style={styles.navHeader}>Digi-Shirt</Text>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
navHeader:{
    marginVertical: 20,
    marginHorizontal: 5,
},
});