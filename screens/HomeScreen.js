import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, Button, View, FlatList, ShadowPropTypesIOS } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import NewsItem from '../components/NewsItem'
import Loading from '../atoms/loading';
import Status from '../atoms/status';

import ENV from '../constants/Environment';


import * as newsItemActions from '../store/actions/newsItems';

export default function HomeScreen({navigation}) {

  // Hooks setup for this component
  const[isLoading, setIsLoading] = useState(false);
  const[isRefreshing, setIsRefreshing] = useState(false);
  const[status, setStatus] = useState("");
  const[requestDispatched, setRequestDispatched] = useState(false);
  const newsItems = useSelector(state => state.newsItems.newsItems);
  const dispatch = useDispatch();

  //Set up header
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
    dispatch(newsItemActions.fetchNewsItems())
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
      <View>
        <Text>There are no news items available.</Text>
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
            title={itemData.item.title} />
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

})


