import React from 'react';
import {View, Dimensions, ScrollView, Platform, ImageBackground, Text } from 'react-native';
import { Font } from 'expo';


import GradientButton from 'react-native-gradient-buttons';

import MyTreatments from './components/src/screens/MyTreatments'
import SkinAndNailSelfie from './components/src/screens/SkinAndNailSelfie'
import Psoriasis from './components/src/screens/Psoriasis'
// import Appointments from './components/src/screens/Appointments';
import Sqltest from './components/src/screens/Sqltest';

import MyCarousell from './components/src/common/MyCarousell';
import Header from './components/src/common/Header';


// Navigation
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json



let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

let text = 'Psoriasis är en kronisk sjukdom men symtomen kan lindras eller försvinna med regelbunden behandling. Med mig kan du enkelt hålla koll på alla mediciner';

const isAndroid = Platform.OS == "android";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Hem',
    headerStyle: {
      backgroundColor: '#5bc9ff',
    },
  };
  constructor(props){
    super(props);
    this.state = {
      screenHeight: 0,
    }
  }

  componentDidMount() {
    Font.loadAsync({
      'raleway-light': require('./assets/fonts/Raleway-Light.ttf'),
      'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
      'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),

    });
  }
  render() {
    //console.log(this.props);

    return (

      <View style={{  backgroundColor:'white'}}>
      <ImageBackground source={require('./assets/background/clearblue.png')} style={{width: '100%', height: '100%'}}>
      <ScrollView
      contentContainerStyle={{flexGrow:1, height: deviceHeight + 100, }}
      scrollEnabled
      >
      
      <Header  text={text}/>

          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingTop: 20}}>
          
          <GradientButton
            style={{ marginVertical: 8, borderWidth: 0 , borderRadius: 12, borderColor:'#FF5964' }}
            text="MIN BEHANDLING"
            textStyle={{ fontSize: 14, color:'white' }}
            gradientBegin="#51E5FF"
            gradientEnd="#18A0FA"

            gradientDirection="horizontal"
            height={isAndroid ? 100 : 150}
            width={deviceWidth * 0.45}
            radius={10}
        
            onPressAction={() => this.props.navigation.navigate('MyTreatments')}
          />

          <GradientButton
            style={{ marginVertical: 8,  borderWidth: 0 , borderRadius: 12, borderColor:'#FF5964'  }}
            text="HUD OCH NAGELBILDER"
            textStyle={{ fontSize: 12 }}
            gradientBegin="#EFBCD5"
            gradientEnd="#EC368D"
            gradientDirection="diagonal"
            height={isAndroid ? 100 : 150}
            width={deviceWidth * 0.45}
            radius={10}
        
            onPressAction={() => this.props.navigation.navigate('SkinAndNailSelfie')}
          />

          </View>


          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingTop: 20}}>

        <GradientButton
            style={{ marginVertical: 8,  borderWidth: 0 , borderRadius: 12, borderColor:'#FF5964'  }}
            text="LÄKARBESÖK"
            textStyle={{ fontSize: 14 }}
            gradientBegin="#59CD90"
            gradientEnd="#5A9367"
            gradientDirection="diagonal"
            height={isAndroid ? 100 : 150}
            width={deviceWidth * 0.45}
            radius={10}
        
            onPressAction={() => this.props.navigation.navigate('Sqltest')}
          />

        <GradientButton
            style={{ marginVertical: 8,  borderWidth: 0 , borderRadius: 12, borderColor:'#FF5964'  }}
            text="VAD ÄR PSORIASIS?"
            textStyle={{ fontSize: 14 }}
            gradientBegin="#ff4b1f"
            gradientEnd="#ff9068"
            gradientDirection="diagonal"
            height={isAndroid ? 100 : 150}
            width={deviceWidth * 0.45}
            radius={10}
        
            onPressAction={() => this.props.navigation.navigate('Psoriasis')}
          />
          </View>

          <View style={{paddingTop: 20}}>
          <Text style={{textAlign:'center', padding: 20}}>För mer information</Text>
           <MyCarousell/>
          </View>
        </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}








const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    MyTreatments: {
      screen: MyTreatments,
    },
    Sqltest:{
      screen: Sqltest
    },
    SkinAndNailSelfie:{
      screen: SkinAndNailSelfie
    },
    Psoriasis:{
      screen: Psoriasis
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}








