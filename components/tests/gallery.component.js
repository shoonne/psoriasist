import React from 'react';
import { View, Image, ScrollView } from 'react-native';

import styles from './styles';

export default ({captures=[]}) => (
    <ScrollView 
        horizontal={true}
        style={[styles.bottomToolbar, styles.galleryContainer]} 
    >
        {captures.map((capture, i) => (
            <View  key={i} style={styles.galleryImageContainer}  >
                <Image source={{uri: capture.uri }} style={styles.galleryImage} />
            </View>
        ))}
    </ScrollView>
);