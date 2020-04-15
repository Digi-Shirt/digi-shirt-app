/**
* Screen which displays the resources of a given category 
*/

import * as React from 'react';
import { View, Text, FlatList } from 'react-native';

// Custom Components
import ResourceCategory from '../components/ResourceCategory';

//import the test data
import MockResources from '../components/__mock__/resources';




export default function ResourceScreen() {
    const resourceTitle = MockResources.categoryName;
    return (
        <FlatList 
            data={MockResources.resources}
            renderItem={itemData => (
                <View>
                    <Text>{itemData.item.resources}</Text>
                </View>
            )}
        />
    )
}