import React from 'react';
import { Text, TouchableOpacity, Dimensions, View } from 'react-native';
import {APP_COLOR} from './../../../utils/Colors';

let deviceWidth = Dimensions.get('window').width;

const MedicinCard = (props) => (
    <TouchableOpacity onLongPress={props.onLongPress} style={styles.card}>
    <View style={{flexDirection:'row'}}>
    <Text style={{fontSize: 40, fontWeight:'bold'}}>{props.text}</Text>
    </View>
    <Text style={{paddingLeft: 2, paddingTop: 5}}>{props.description}</Text>
    </TouchableOpacity>
);


const styles = {
    card: {
        width: deviceWidth * 0.9, 
        height: 150, 
        borderWidth: 0.5,
        borderColor: APP_COLOR, 
        marginBottom: 10,
        borderRadius: 10,
        padding: 20,

    }
}

export default MedicinCard;
