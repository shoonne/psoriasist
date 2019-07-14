import React from 'react';
import { View, Text, Dimensions } from 'react-native';

let deviceWidth = Dimensions.get('window').width;

const TextBox = (props) => (
    <View style={styles.contianer}>
    <Text style={styles.header}>{props.header}</Text>
    <View style={styles.textContainer}>
    <Text style={styles.text}>{props.text}</Text>
    </View>
    <View style={{paddingTop: 40}}/>
    </View>
);

const styles = {
    container: {
        paddingTop: 100,
        justifyContent:'center',
        alignItems: 'center',
        
    },
    textContainer: {
        backgroundColor:'white', borderRadius: 5,  width: deviceWidth * 0.95, borderColor: 'black',
    },
    text: {
        margin: 20, fontSize: 20, fontFamily:'raleway-light',
    },
    header: {
        fontSize: 40, fontFamily:'raleway-bold'
    }
}

export default TextBox;