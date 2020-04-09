import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native'



export default function NewsItem(props) {
  return (
    <View style={styles.NewsItemContainer}>
      <Text>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    NewsItemContainer: {
      flex: 1,
      borderColor: '#333',
      borderWidth: '2',
      minHeight: '150',
      backgroundColor: '#16e'      
    },
    container: {
      flex: 1,
      backgroundColor: '#fafafa',
    }
});