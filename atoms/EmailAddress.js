/**
 * This is an Atom for displaying email contacts in a consistant manner
 */

import * as React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PhoneNumber(props) {
    
  return (
  <View style={styles.emailContainer}>
    <Ionicons
      name="md-mail"
      size={24}
      color='#FFF'
      style={styles.emailIcon}
    /><Text {...props} style={styles.email} />
  </View>
  );
    
}

const styles = StyleSheet.create({
  emailContainer: {
    flex: 1,
    flexDirection: 'row',
    textAlignVertical: 'center'
  },
  emailIcon: {
    marginRight: 10,
  },
  email: {
    fontSize: 20,
    color: '#FFF',
  }
});