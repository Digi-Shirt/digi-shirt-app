/**
 * Component which displays the resource item on the resource page
 */

 //TODO: Add a slide out button which show/hides details for resources

import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';

import PhoneNumber from '../atoms/PhoneNumber';
import EmailAddress from '../atoms/EmailAddress';


export default function Resource(props) {
  const resource = props.resource;

  return (
    <View style={styles.ResourceContainer} >
      <Text style={styles.ResourceName}>{resource.name}</Text>
      <View>
        <Text style={styles.ResourceDetails}>{resource.details}</Text>
        {resource.phone.map(p => <PhoneNumber key={p} >{p}</PhoneNumber>)}
        {resource.email.map(p => <EmailAddress key={p} >{p}</EmailAddress>)}
      </View>  
    </View>
  );
}


const styles = StyleSheet.create({
    ResourceContainer: {
      flex: 1,
      borderColor: '#333',
      minHeight: 150,
      marginHorizontal: 10,
      marginBottom: 0,
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
    ResourceDetails:{
      fontSize: 24,
      color: '#FFF',
    },
    container: {
      flex: 1,
      backgroundColor: '#fafafa',
    },
});