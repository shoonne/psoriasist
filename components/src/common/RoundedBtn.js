import React from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';

let deviceWidth = Dimensions.get('window').width;
const RoundedBtn = (props) => (
    <TouchableOpacity onPress={props.onPress} style={[styles.modalBtn, props.style ]}>
     <Text style={{color: props.textColor}}>{props.text}</Text>
    </TouchableOpacity>
);

const styles = {
    modalBtn: {
        alignItems:'center', justifyContent:'center',width: deviceWidth * 0.9, height: 50,borderRadius: 82,
      },
}

export default RoundedBtn;
