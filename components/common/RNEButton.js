import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements'
let deviceWidth = Dimensions.get('window').width;



const RNEButton = (props) => (
    <View style={{justifyContent:'center', alignItems:'center',  height: props.height ? props.height : 150, borderColor:'black', width: deviceWidth * 0.4,}}>
        <Icon
        raised
        size={props.size ? props.size : 35}
        name={props.iconName}
        type={props.iconType}
        color={props.color}
        onPress={props.onPress} />
        <Text>{props.btnText}</Text>
    </View>
)

export default RNEButton;