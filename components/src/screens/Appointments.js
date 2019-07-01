import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import Header from './../Header';


class Appointments extends React.Component {
  static navigationOptions = {
    title: 'Läkarbesök',
    headerStyle: {
      backgroundColor: '#59cd90',
      color:'white'
    },
  };
    render() {
      return (
        <View >
        <ImageBackground source={require('./../../../assets/background/cleargreen.png')} style={{width: '100%', height: '100%'}}>
        <Header text={'Ofta har man inte lång tid med sin läkare. Därför kan det vara bra att skriva ner frågor som man vill ta upp under läkarbesöket'}/>
        </ImageBackground>
        </View>
      );
    }
  }

  export default Appointments;