import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'



export default function ResourceCategory(props) {
  return (
    <TouchableOpacity onPress={() => {props.goTo();} } props={props}>
      <View style={styles.NewsItemContainer}>
        <Text style={styles.NewsText}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    NewsItemContainer: {
      flex: 1,
      borderColor: '#333',
      minHeight: 150,
      marginHorizontal: 10,
      marginTop: 10,
      padding: 10,
      backgroundColor: '#16e',
            
    },
    NewsText: {
      flex:1,
      flexDirection: "column",
      fontSize: 30,
      textAlign: "right",
      textAlignVertical: "bottom",
      color: '#FFF',
    },
    container: {
      flex: 1,
      backgroundColor: '#fafafa',
    },
});