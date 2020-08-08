import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  StyleSheet, Text, TouchableOpacity, View, FlatList, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NewsItem from '../components/NewsItem'
import Status from '../atoms/status';
import * as newsItemActions from '../store/actions/newsItems';

export default function HomeScreen({ navigation }) {

  // Hooks setup for this component
  const[isLoading, setIsLoading] = useState(false);
  const[isRefreshing, setIsRefreshing] = useState(false);
  const[status, setStatus] = useState("");
  const newsItems = useSelector(state => state.newsItems.newsItems);
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  // If invite code is not set, then goto invite code screen
  if(!settings.hasOwnProperty("inviteCode") || settings.inviteCode == ""){
      console.log("inviteCode not set.");
      navigation.navigate('Welcome');
  }

  // Set up header
  navigation.setOptions({
    headerTitle: 'News',
    headerLeft: () => (
      <TouchableOpacity 
        style={{paddingLeft:16}}
        onPress={() => navigation.toggleDrawer()}>
         <Ionicons
            name="md-menu"
            size={30}
             />
      </TouchableOpacity>
    )
  });
  
  //Load News Items REST API
  useEffect(() => {
     loadNewsItems();
  }, [dispatch]);

  const loadNewsItems = () => {
    setIsLoading(true);
    setStatus("Loading...");
    dispatch(newsItemActions.fetchNewsItems(settings.inviteCode))
    .then(() => {
      setIsLoading(false);
      setStatus("");
    })
    .catch( (error) => {
      setStatus(error.message);
    });
  };
  
 
  
  if(!isLoading && newsItems.length === 0){
    return (
      <View style={styles.container}>
          
                <Text style={styles.big}>¯\_(ツ)_/¯ </Text>
                <Text style={styles.h3}>There are no news items.</Text>
                <Text style={styles.messageText}>    
                If you just joined a unit, it's possible that you just need
                to ask the server again.
          </Text>
          <Button
                  title="Ask again"
                  onPress={() => loadNewsItems()} 

                />
        </View>
    );
  }

  return (
    // Data uses either the API data or Stored data
    <View style={styles.listContainer}>
    <FlatList 
      onRefresh={loadNewsItems}
      refreshing={isRefreshing}
      style={styles.flatList}
      data={newsItems}
      keyExtractor={item => item.id.toString()}
      renderItem={itemData => (
         <NewsItem 
            goTo={() => { 
              navigation.navigate('NewsItem',  
                                  { title: itemData.item.title, 
                                    story: itemData.item }
                                  );
          }} 
            //title={itemData.item.title}
            //images={itemData.item.images} 
            {...itemData.item} />
      )} />
      {status !=""  &&  <Status>{status}</Status>}
    </View>
  );
}


const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: "column",
  },

  container: {
    flex: 1,
    padding: 50,
    
},
messageText: {
    color: '#777',
    marginVertical: 20,
    fontSize: 18,
    textAlign: "justify",
},
h3:{
  fontSize:25,
 
},
big: {
  fontSize: 50,

  textAlign: "center",
  marginVertical: 10,
}
})


