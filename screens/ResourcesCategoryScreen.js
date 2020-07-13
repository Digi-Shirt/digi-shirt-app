/**
* Screen which displays the resources of a given category 
*/

import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import Status from '../atoms/status';
import { Ionicons } from '@expo/vector-icons';

//import the Resources Component to display each resource
import Resource from '../components/Resource';
import * as resourceCategoriesActions from '../store/actions/resourceCategories';




export default function ResourceCategoryScreen({navigation, route}) {
    // Hooks setup for this component
    const[isLoading, setIsLoading] = useState(false);
    const[isRefreshing, setIsRefreshing] = useState(false);
    const[status, setStatus] = useState("");
    const[requestDispatched, setRequestDispatched] = useState(false);
    //const newsItems = useSelector(state => state.newsItems.newsItems);
    const resourceCategories = useSelector(state => state.resourceCategories.resourceCategories);
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();


    const resourceCategory = route.params.resourceCategory;
    const title = resourceCategory.hasOwnProperty("name") ? 
                  resourceCategory.name :
                  "Resources";
    
                  //console.log(resourceCategory);
    //Set up header
    navigation.setOptions({
        headerTitle: title,

    });



    useEffect(() => {    
        loadResourceCategory();
    }, [dispatch]);
  
    const loadResourceCategory = () => {
      setIsLoading(true);
      setStatus("Loading...");
      dispatch(resourceCategoriesActions.fetchCategoryDetails(resourceCategory.id))
      .then(() => {
        setIsLoading(false);
        setStatus("");
      })
      .catch( (error) => {
        setStatus(error.message);
      });
    };

    //console.log("Resource Category: ")
    //console.log(resourceCategory.resources);

    return (
        <FlatList 
        onRefresh={loadResourceCategory}
        refreshing={isRefreshing}
        data={resourceCategory.resources}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => (
            <View>
                <Resource resource={itemData.item} />
            </View>
            
        )}
    />
    )
}


