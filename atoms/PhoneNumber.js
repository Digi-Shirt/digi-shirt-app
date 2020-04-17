/**
 * This is an Atom for displaying phone numbers in a consistant manner
 */

import * as React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PhoneNumber(props) {
    
  return (
  <View style={styles.phoneContainer}>
    <Ionicons
      name="md-call"
      size={30}
      color='#FFF'
      style={styles.phoneIcon}
    /><Text {...props} style={styles.number} />
  </View>
  );
    
}

const styles = StyleSheet.create({
  phoneContainer: {
    flex: 1,
    flexDirection: 'row',
    textAlignVertical: 'center'
  },
  phoneIcon: {
    marginRight: 10,
  },
  number: {
    fontSize: 24,
    color: '#FFF',
  }
});