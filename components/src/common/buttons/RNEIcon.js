import React from 'react';
import {View, Text} from 'react-native';
import { Icon } from 'react-native-elements';

const RNEIcon = (props) => (
    <View style={{flexDirection: 'row', alignItems:'center'}}>
        <Icon
        containerStyle={{paddingLeft: 20}}
        raised
        name={props.name}
        type='font-awesome'
        color={props.color}
        onPress={props.onPress} />
        <Text style={{color:'white', paddingLeft: 10}}>{props.iconText}</Text>
    </View>
);

export default RNEIcon;
