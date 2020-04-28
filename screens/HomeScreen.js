import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, ShadowPropTypesIOS } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NewsItem from '../components/NewsItem'

import ENV from '../constants/Environment';
// Test data
//import MockNewsData from '../components/__mock__/newsItems';
//const newsData = MockNewsData();

export default function HomeScreen({navigation}) {

  // Hooks setup for this component
  const[isLoading, setLoadingStatus] = useState(true);
  const[newsItems, setNewsItems] = useState(useSelector(state => state.newsItems.newsItems));
  console.log(newsItems);
  
  // This attempts to Load data from dev API
  const url = ENV.API_URL + 'news-items?unit.invite_code=BYTEBACK';
  console.log(url);
  /*
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
        setLoadingStatus(false);
        setNewsItems(responseJson);
        console.log(responseJson);
    })
    .catch((error) => {
      console.log(error);
    });
    */
  
    
  return (
    
    // Data uses either the API data or Stored data
    <FlatList 
      data={newsItems}
      renderItem={itemData => (
         <NewsItem 
            goTo={() => { navigation.navigate('NewsItem',  
            { title: itemData.item.title, story: itemData.item });
          }} 
            title={itemData.item.title} />
      )} />

  );
}



