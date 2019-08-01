import React from 'react';
import {View, Dimensions, ScrollView, Platform, ImageBackground, Text } from 'react-native';
import { Font } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements'
import RNEButton from './components/common/RNEButton';


// Components
import GradientButton from 'react-native-gradient-buttons';
import MyTreatments from './components/src/screens/MyTreatments'
import SkinAndNailSelfieV2 from './components/src/screens/SkinAndNailSelfieV2';
import Psoriasis from './components/src/screens/Psoriasis'
import Appointments from './components/src/screens/Appointments';
import DoctorNotesTest from './components/src/screens/DoctorNoteTest';
import MyCarousell from './components/src/common/MyCarousell';
import Header from './components/src/common/Header';

// Navigation
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

// Redux 
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import firstReducer from './reducers/firstReducers';
import { TouchableOpacity } from 'react-native-gesture-handler';
const store = createStore(firstReducer);





let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let text = 'Psoriasis är en kronisk sjukdom men symtomen kan lindras eller försvinna med regelbunden behandling. Med mig kan du enkelt hålla koll på alla mediciner';
const isAndroid = Platform.OS == "android";


class HomeScreen extends React.Component {
  static navigationOptions = {
    cardStyle: {
      backgroundColor:'red'
    },
    headerBackground: (
      <LinearGradient
        colors={["#FF416C", "#FF4B2B"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    ),
    title: 'Hem',
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
      <ScrollView
      contentContainerStyle={{flexGrow:1, height: deviceHeight + 100, }}
      scrollEnabled
      >
      
      {/* <Header  text={text}/> */}

          <View style={{flexDirection:'row', paddingTop: 90, justifyContent: 'space-around' }}>
      
          <RNEButton 
          color='#f50'
          iconName="heartbeat" 
          iconType="font-awesome" 
          btnText="Min behandling"
          onPress={() => this.props.navigation.navigate('MyTreatments')}
          />

          <RNEButton          
          color='#f50'
          iconName="camera" 
          iconType="font-awesome" 
          btnText="Hud och nagelbilder"
          onPress={() => this.props.navigation.navigate('SkinAndNailSelfie')}/>
          </View>


          <View style={{flexDirection:'row', paddingTop: 30, justifyContent: 'space-around' }}>

          <RNEButton          
          color='#f50'
          iconName="user-md" 
          iconType="font-awesome" 
          btnText="Läkarbesök"
          onPress={() => this.props.navigation.navigate('DoctorNotesTest')}/>

          <RNEButton          
          color='#f50'
          iconName="info" 
          iconType="font-awesome" 
          btnText="Psoriasis"
          onPress={() => this.props.navigation.navigate('Psoriasis')}/>
    
          </View>

          {/* CAROUSELL */}
          <View style={{paddingTop: 20}}>
            <Text style={{textAlign:'center', padding: 20}}>För mer information</Text>
            <MyCarousell/>
          </View>


        </ScrollView>
        
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
    DoctorNotesTest:{
      screen: DoctorNotesTest,
    },
    SkinAndNailSelfie:{
      screen: SkinAndNailSelfieV2
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
    return (
      <Provider store={store}>
    <AppContainer />
    </Provider>);
  }
}

const styles = {
  btn1: {
    marginVertical: 8, 
    borderWidth: 0 , 
    borderRadius: 12, 
    borderColor:'#FF5964',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  btn2: {
    marginVertical: 8,  
    borderWidth: 0 , 
    borderRadius: 12, 
    borderColor:'#FF5964',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  btn3: {
    marginVertical: 8,  
    borderWidth: 0 , 
    borderRadius: 12, 
    borderColor:'#FF5964',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  }, 
  btn4: {
    marginVertical: 8,  
    borderWidth: 0 , 
    borderRadius: 12, 
    borderColor:'#FF5964',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  }
}








