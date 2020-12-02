/**
 * This is an Atom for displaying phone numbers in a consistent manner
 */

import * as React from 'react';
import { View, Text, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../constants/defaultStyle';

const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return null
}

const dialCall = (number) => {
  let phoneNumber = "";

  if (Platform.OS === 'android') {
    phoneNumber = "tel:" + number;
  }
  else {
    phoneNumber = "telprompt:" + number;
 
  }

  Linking.openURL(phoneNumber);
}

const PhoneNumber = (props) => {


  const formattedPhoneNumber = formatPhoneNumber(props.number);
  
  return (
    <TouchableOpacity
      onPress={() => {dialCall(props.number);}}
    >
      <View style={styles.phoneContainer}>
        <Ionicons
          name="md-call"
          size={24}
          color='#FFF'
          style={styles.phoneIcon}
        /><Text style={styles.number} >{formattedPhoneNumber}</Text>
      </View>
  </TouchableOpacity>
  );
    
}

export default PhoneNumber;

