import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Markdown from 'react-native-markdown-display';

import ENV from '../constants/Environment';
import styles from '../constants/defaultStyle';

export default function NewsItemScreen(props) {
   
    const story = props.route.params.story;
    
    const API = props.route.params.productionApi ? ENV.API_URL : ENV.DEV_API_URL;
    

    const imagesExist = story.hasOwnProperty("images") &&
                        story.images.length > 0
                        ? true : false;


    const imageRelativeUrl = imagesExist &&
                             story.images[0].formats.hasOwnProperty("small") ? 
                             story.images[0].formats.small.url.substr(1) : //substr(1) to remove leading '/'
                             story.images[0].url.substr(1);

    const imageSource = { uri: API + imageRelativeUrl };
    
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
                    <Markdown>
                        {story.article}
                    </Markdown>
                </View>
            </View>
        </ScrollView>
    );
}

