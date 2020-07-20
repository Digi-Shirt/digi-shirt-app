/**
 * This is an Atom for created a standardized button style which can be used throughout
 * the application.  The Standard React Native button, is not very customizable out of
 * the box. 
 */

import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../constants/defaultStyle';

const StandardButton = (props) => {
    
  return (
    <TouchableOpacity
        style={styles.standardButton}
        onPress={props.onPress}
    >

       <Text style={styles.buttonText}>{props.title.toString().toUpperCase()}</Text>


        
    </TouchableOpacity>
  );
    
}

export default StandardButton;
