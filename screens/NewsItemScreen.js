import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';


export default function NewsItemScreen(props) {
    const story = props.route.params.story;
    return (
        <ScrollView>
            <View style={styles.newsItemContainer}>
                <Text style={styles.storyText}>{story.article}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    newsItemContainer: {
        flex: 1,
        minHeight: 500,
        marginHorizontal: 10,
        marginTop: 20,
        padding: 10,
    },
    storyText:{
        fontSize: 20,
        color: '#222',
    }
});