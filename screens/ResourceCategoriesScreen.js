import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, Button, View, FlatList, ShadowPropTypesIOS } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NewsItem from '../components/NewsItem'
import Loading from '../atoms/loading';
import Status from '../atoms/status';
import { Ionicons } from '@expo/vector-icons';


import ENV from '../constants/Environment';

// Custom Components
import ResourceCategory from '../components/ResourceCategory';

import * as resourceCategoriesActions from '../store/actions/resourceCategories';

//import the test data
//import MockResourceCategories from '../components/__mock__/resources';

export default function ResourceCategoriesScreen({navigation}) {
     // Hooks setup for this component
    const[isLoading, setIsLoading] = useState(false);
    const[isRefreshing, setIsRefreshing] = useState(false);
    const[status, setStatus] = useState("");
    const[requestDispatched, setRequestDispatched] = useState(false);
    //const newsItems = useSelector(state => state.newsItems.newsItems);
    const resourceCategories = useSelector(state => state.resourceCategories.resourceCategories);
    const dispatch = useDispatch();


  //Set up header
  navigation.setOptions({
    headerTitle: 'Resources',
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
  
    useEffect(() => {    
        loadResourceCategories();
    }, [dispatch]);
  
    const loadResourceCategories = () => {
      setIsLoading(true);
      setStatus("Loading...");
      dispatch(resourceCategoriesActions.fetchResourceCategories())
      .then(() => {
        setIsLoading(false);
        setStatus("");
      })
      .catch( (error) => {
        setStatus(error.message);
      });
    };
    
    if(resourceCategories == false) {
      return(
        <View style={styles.container}>
          <Text style={styles.messageText}>
                Well, this is embarrassing. {"\n"}
               There are no resource categories.
          </Text>
        </View>
      );
    }

    return (
        <View>
            <FlatList 
            data={resourceCategories}
            keyExtractor={item => item.id.toString()}
            renderItem={itemData => (
            <View>
                <ResourceCategory 
                    goTo={() => {navigation.navigate('ResourceCategory', 
                                                    { title: itemData.item.name, 
                                                    resourceCategory: itemData.item })}}
                    name={itemData.item.name} />
                </View>
            )} />
            {status !=""  &&  <Status>{status}</Status>}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    marginVertical: 40,
    
  },
  messageText: {
    fontSize: 24,
    textAlign: "center"
  }
});
