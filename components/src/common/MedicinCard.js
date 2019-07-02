import React from 'react';
import { View, Text, Dimensions } from 'react-native';
let deviceWidth = Dimensions.get('window').width;

const MedicinCard = (props) => (
    <View style={styles.container}>
    <View style={{flexDirection:'column'}}>
    <Text style={styles.medicinText}>{props.medicin}</Text>
    <Text style={styles.descriptionText}>{props.description}</Text>
    </View>
    </View>
);

export default MedicinCard;

const styles = {
    container : {
        flexDirection:'row',
        backgroundColor:'#5bc9ff', 
        height: 150, width: 
        deviceWidth * 0.95, 
        borderWidth:0.6, 
        borderColor:'white', 
        marginBottom: 10 
    },
    medicinText: {
        padding: 10, fontWeight:'bold', fontSize: 48, color:'white'
    },
    descriptionText: {
        padding: 10,fontSize: 16, color:'white'
    }
}