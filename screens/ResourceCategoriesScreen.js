import * as React from 'react';
import { View, Text, FlatList } from 'react-native';

// Custom Components
import ResourceCategory from '../components/ResourceCategory';

//import the test data
import MockResourceCategories from '../components/__mock__/resourceCategories';

export default function ResourceCategoriesScreen() {
    return (
        <FlatList 
        data={resourceCategories}
        renderItem={itemData => (
          <View>
            <ResourceCategory title={itemData.item.title} />
          </View>
        )} />
    );
}


const resourceCategories = MockResourceCategories();
