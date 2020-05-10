import * as React from 'react';
import { View, Text,StyleSheet } from 'react-native';

export default function Status(props) { 
    return (
        <View style={styles.infoContainer}>
            <Text {...props} style={styles.info} />
        </View>
    );
}
const styles = StyleSheet.create({
    listContainer: {
      flex: 1,
      flexDirection: "column",
    },
    flatList: {
    },
    infoContainer: {
  
      backgroundColor: '#321'
    },
    info: {
      paddingHorizontal: 15,
      height: 20,
      backgroundColor: '#EEE',
      color:'#AAA'
    }
});
