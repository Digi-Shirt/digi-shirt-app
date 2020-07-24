import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

import styles from '../constants/defaultStyle';

export default function ResourceCategory(props) {
  return (
    <TouchableOpacity onPress={() => {props.goTo();} } props={props}>
      <View style={styles.NewsItemContainer}>
        <Text style={styles.NewsText}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
}