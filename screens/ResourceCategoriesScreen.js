import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Button } from 'react-native';
import Status from '../atoms/status';
import { Ionicons } from '@expo/vector-icons';

// Custom Components
import ResourceCategory from '../components/ResourceCategory';
import * as resourceCategoriesActions from '../store/actions/resourceCategories';


export default function ResourceCategoriesScreen({navigation}) {
  // Hooks setup for this component
  const[isLoading, setIsLoading] = useState(false);
  const[isRefreshing, setIsRefreshing] = useState(false);
  const[status, setStatus] = useState("");
  const[requestDispatched, setRequestDispatched] = useState(false);
  const resourceCategories = useSelector(state => state.resourceCategories.resourceCategories);
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();


  const screenTitle = settings.productionApi ? "Resources" : "Resources (Developmental)";

  
    //Set up header
   navigation.setOptions({
    headerTitle: screenTitle,
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
      dispatch(resourceCategoriesActions.fetchResourceCategories(settings.inviteCode, settings.productionApi))
      .then(() => {
        setIsLoading(false);
        setStatus("finished loading");
        console.log(resourceCategories);
      })
      .catch( (error) => {
        setStatus(error.message);
        console.log(error);
      });
    };

    console.log(resourceCategories);

    if(Object.keys(resourceCategories).length === 0 || resourceCategories[0] == null) {    
      return(
        <View style={styles.container}>
          <Text style={styles.messageText}>
                Well, this is embarrassing. {"\n"}
               There are no resource categories.
          </Text>
          <Button
                  title="Ask again"
                  onPress={() => loadResourceCategories()} 

                />

        </View>
      );
    }

    return (
        <View>
            <FlatList
            onRefresh={loadResourceCategories}
            refreshing={isRefreshing} 
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
