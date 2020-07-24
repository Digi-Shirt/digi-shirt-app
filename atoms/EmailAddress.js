/**
 * This is an Atom for displaying email contacts in a consistent manner
 */

import * as React from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../constants/defaultStyle';

const Email = (props) => {
  
  return (
    
    <TouchableOpacity
      onPress={() => {
        Linking.openURL("mailto:" + props.email)
      }}
    >
        <View style={styles.emailContainer}>
          <Ionicons
            name="md-mail"
            size={24}
            color='#FFF'
            style={styles.emailIcon}
          /><Text style={styles.email}>{props.email}</Text>
        </View>
    </TouchableOpacity>
  );
    
}

export default Email;