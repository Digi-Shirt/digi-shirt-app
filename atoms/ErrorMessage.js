import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../constants/defaultStyle';

export default function ErrorMessage (props) {
    return (      
    <View 
        style={styles.errorMessageBox}
        visible={false}
    >
      <Ionicons
             name="md-alert"
             size={30}
             color="#B55" />
      <Text style={styles.errorText}>{props.message}</Text>
    </View>);
  };

