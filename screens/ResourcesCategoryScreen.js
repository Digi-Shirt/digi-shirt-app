/**
* Screen which displays the resources of a given category 
*/

import * as React from 'react';
import { View, Text, FlatList } from 'react-native';

//import the Resources Component to display each resource
import Resource from '../components/Resource';



export default function ResourceCategoryScreen(props) {
    const resourceCategory = props.route.params.resourceCategory;
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


