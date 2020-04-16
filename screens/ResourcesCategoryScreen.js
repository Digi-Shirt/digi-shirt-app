/**
* Screen which displays the resources of a given category 
*/

import * as React from 'react';
import { View, Text, FlatList } from 'react-native';



export default function ResourceCategoryScreen(props) {
    const resourceCategory = props.route.params.resourceCategory;
    return (
    <View>
        <Text>{resourceCategory.title}</Text>
        <FlatList 
        data={resourceCategory.resources}
        renderItem={itemData => (
            <View>
                <Text>{itemData.item.title}</Text>
            </View>
        )}
    />
    </View>
    )
}
