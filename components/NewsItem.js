import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { StackActions } from '@react-navigation/native';
import NewsItemScreen from '../screens/NewsItemScreen';

import styles from '../constants/defaultStyle';
import ENV from '../constants/Environment';

export default function NewsItem(props) {
  
  const API = props.productionApi ? ENV.API_URL : ENV.DEV_API_URL;

  const thumbnailExists = props.hasOwnProperty("images") &&
                          props.images.length > 0
                           ? true : false;

  
  const small = props.hasOwnProperty("images") &&
                props.images.length > 0 &&
                props.images[0].formats.hasOwnProperty("small")?
                props.images[0].formats.small.url.substr(1) : //substr(1) to remove leading '/'
                null;

  const original =  props.hasOwnProperty("images") &&
                    props.images.length > 0 &&
                    props.images[0].hasOwnProperty("url") ? 
                    props.images[0].url.substr(1) : //substr(1) to remove leading '/'
                    null;

  const smallSource = {uri: API + small };
  const originalSource = {uri: API + original };
  
  
  return (
    <TouchableOpacity onPress={() => {props.goTo(props);} } >
      <View style={styles.NewsItemContainer} >
        {
        thumbnailExists && 
         <Image 
         style={styles.thumbnail}
            source={small ? smallSource :  originalSource}
        />
        }
        <Text style={styles.NewsText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}




