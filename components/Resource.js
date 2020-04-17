/**
 * Component which displays the resource item on the resource page
 */

 //TODO: Add iteration through email(s) to display them
 //TODO: Fix spacing between blocks
 //TODO: Fix title displaying ast a text above boxes

import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native'

import PhoneNumber from '../atoms/PhoneNumber'


export default function Resource(props) {
  const resource = props.resource;

  return (
    <View style={styles.ResourceContainer} >
      <Text style={styles.ResourceName}>{resource.name}</Text>
      {resource.phone.map(p => <PhoneNumber key={p} >{p}</PhoneNumber>)}  
    </View>
  );
}




const styles = StyleSheet.create({
    ResourceContainer: {
      flex: 1,
      borderColor: '#333',
      minHeight: 150,
      marginHorizontal: 10,
      marginTop: 10,
      padding: 10,
      backgroundColor: '#16e',
            
    },
    ResourceName: {
      flex:1,
      flexDirection: "column",
      fontSize: 30,
      textAlign: "left",
      textAlignVertical: "top",
      color: '#FFF',
    },
    container: {
      flex: 1,
      backgroundColor: '#fafafa',
    },
});