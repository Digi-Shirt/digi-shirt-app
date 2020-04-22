import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, ShadowPropTypesIOS } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NewsItem from '../components/NewsItem'

// Test data
import MockNewsData from '../components/__mock__/newsItems';
const newsData = MockNewsData();

export default function HomeScreen({navigation}) {

  // Hooks setup for this component
  const[isLoading, setLoadingStatus] = useState(true);
  const[newsItems, setNewsItems] = useState(null);
  
  // This attempts to Load data from dev API
  fetch('http://localhost:1337/news-items?unit.invite_code=BYTEBACK')
    .then((response) => response.json())
    .then((responseJson) => {
        setLoadingStatus(false);
        setNewsItems(responseJson);
        console.log(responseJson);
    })
    .catch((error) => {
      console.log(error);
    });
  
    
  return (
    
    // Data uses either the API data or Stored data
    <FlatList 
      data={newsItems ? newsItems : newsData}
      renderItem={itemData => (
         <NewsItem 
            goTo={() => { navigation.navigate('NewsItem',  
            { title: itemData.item.title, story: itemData.item });
          }} 
            title={itemData.item.title} />
      )} />

  );
}



