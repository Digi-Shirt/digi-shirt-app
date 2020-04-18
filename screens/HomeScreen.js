import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, ShadowPropTypesIOS } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NewsItem from '../components/NewsItem'

// Test data
import MockNewsData from '../components/__mock__/newsItems';
const newsData = MockNewsData();

// Import fonts
import { MonoText } from '../components/StyledText';
import NewsItemScreen from './NewsItemScreen';



export default function HomeScreen({navigation}) {
 // console.log(props);
  
  return (
    
    <FlatList 
      data={newsData}
      renderItem={itemData => (
         <NewsItem 
            goTo={() => { navigation.navigate('NewsItem',  
            { title: itemData.item.title, story: itemData.item });
          }} 
            title={itemData.item.title} />
      )} />

  );
}



