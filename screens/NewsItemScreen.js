import * as React from 'react';

//import the mock data
import MockNewsItems from '../components/__mock__/newsItems';
import { View, Text } from 'react-native';
const newsItems = MockNewsItems();

export default function NewsItemScreen() {
    return (
        <View>
            <Text>this is a news item</Text>
        </View>
    );
}