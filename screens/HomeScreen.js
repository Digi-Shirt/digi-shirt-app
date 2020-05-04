import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, ShadowPropTypesIOS } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
  
  // This attempts to Load data from dev API
  
  useEffect(() => {    loadNewsItems();

  }, [dispatch]);

  const loadNewsItems = () => {
    setIsLoading(true);
    setStatus("Loading...");
    dispatch(newsItemActions.fetchNewsItems())
    .then(setIsLoading(false))
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
      keyExtractor={item => item.id}
      renderItem={itemData => (
         <NewsItem 
            goTo={() => { navigation.navigate('NewsItem',  
            { title: itemData.item.title, story: itemData.item });
          }} 
            title={itemData.item.title} />
      )} />
      {status !="" &&  <Status>{status}</Status>}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: "column",
  },

})


