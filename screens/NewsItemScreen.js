import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import ENV from '../constants/Environment';
import styles from '../constants/defaultStyle';

export default function NewsItemScreen(props) {
    
    const story = props.route.params.story;
    //console.log(story);

    const imagesExist = story.hasOwnProperty("images") &&
                        story.images.length > 0
                        ? true : false;


    const imageRelativeUrl = imagesExist ?
                             story.images[0].formats.small.url.substr(1) : //substr(1) to remove leading '/'
                             "";

    const imageSource = { uri: ENV.API_URL + imageRelativeUrl };
    
    // Set up header
    props.navigation.setOptions({
        headerTitle: story.title,
    });

    return (
        <ScrollView style={styles.newsItemScrollView}>
            <View style={styles.newsStoryItemContainer}>
                
                {imagesExist && 
                    <Image 
                    style={styles.small}
                        source={imageSource}
                    />
                } 
                <View style={styles.newsStoryTextContainer}>
                    <Text style={styles.h2}>{story.title}</Text>
                    <Text style={styles.storyText}>{story.article}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

