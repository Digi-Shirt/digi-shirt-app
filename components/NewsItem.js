import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { StackActions } from '@react-navigation/native';
import NewsItemScreen from '../screens/NewsItemScreen';

import styles from '../constants/defaultStyle';
import ENV from '../constants/Environment';

export default function NewsItem(props) {
  console.log(props);

  const thumbnailExists = props.hasOwnProperty("images") &&
                          props.images.length > 0
                           ? true : false;

  
  const thumbnail = props.hasOwnProperty("images") &&
                    props.images.length > 0 ?
                    props.images[0].formats.small.url.substr(1) : //substr(1) to remove leading '/'
                    "";
                    
  const thumbnailSource = { uri: ENV.API_URL + thumbnail };
  
  
  return (
    <TouchableOpacity onPress={() => {props.goTo();} } props={props}>
      <View style={styles.NewsItemContainer} >
        {
        thumbnailExists && 
         <Image 
         style={styles.thumbnail}
            source={thumbnailSource}
        />
        }
        <Text style={styles.NewsText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}




