import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList, ShadowPropTypesIOS } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NewsItem from '../components/NewsItem'

import ENV from '../constants/Environment';


import * as newsItemActions from '../store/actions/newsItems';

export default function HomeScreen({navigation}) {

  // Hooks setup for this component
  const[isLoading, setLoadingStatus] = useState(true);
  const[requestDispatched, setRequestDispatched] = useState(false);
  const newsItems = useSelector(state => state.newsItems.newsItems);
  const dispatch = useDispatch();
  
  // This attempts to Load data from dev API
  
  useEffect(() => {
    dispatch(newsItemActions.fetchNewsItems());
  }, [dispatch]);

  
  return (
    
    // Data uses either the API data or Stored data
    <FlatList
      data={newsItems}
      keyExtractor={item => item.id}
      renderItem={itemData => (
         <NewsItem 
            goTo={() => { navigation.navigate('NewsItem',  
            { title: itemData.item.title, story: itemData.item });
          }} 
            title={itemData.item.title} />
      )} />

  );
}



