/**
* Screen which displays the resources of a given category 
*/

import * as React from 'react';
import { View, Text, FlatList } from 'react-native';

//import the Resources Component to display each resource
import Resource from '../components/Resource';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';



export default function ResourceCategoryScreen({navigation, route}) {

    const resourceCategory = route.params.resourceCategory;
    const title = resourceCategory.hasOwnProperty("name") ? 
                  resourceCategory.name :
                  "Resources";
    
                  console.log(resourceCategory);
    //Set up header
    navigation.setOptions({
        headerTitle: title,

    });


    

    return (
        <FlatList 
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


