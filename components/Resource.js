/**
 * Component which displays the resource item on the resource page
 */

 //TODO: Add a slide out button which show/hides details for resources

import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';

import PhoneNumber from '../atoms/PhoneNumber';
import EmailAddress from '../atoms/EmailAddress';

import styles from '../constants/defaultStyle';

export default function Resource(props) {
  const resource = props.resource;
  
  const hasPhones = (resource.hasOwnProperty("phones") && 
                    resource.phones.length > 0) ?
                    true : false;
  
  const hasEmails = resource.hasOwnProperty("resource_emails") &&
                    resource.resource_emails.length > 0 ?
                    true: false;

  return (
    <View style={styles.itemContainer} >
      <Text style={styles.ResourceName}>{resource.name}</Text>
      <View>
        { hasPhones ? 
          resource.phones.map(p => <PhoneNumber key={p.id} number={p.phone_number} />) 
         : null 
        }

        { hasEmails ? 
          resource.resource_emails.map(p => <EmailAddress key={p.id} email={p.email} />) 
          : null 
        }
        
        <Text style={styles.ResourceDetails}>{resource.details }</Text>
        
      </View>  
    </View>
  );
 }
