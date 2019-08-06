import React from 'react';
import {View, ScrollView, Text } from 'react-native';
import * as Font from 'expo-font';
import RNEButton from './components/src/common/buttons/IconBtn';
import AnimatedHeader from 'react-native-animated-header';

// Components
import MyTreatments from './components/src/screens/MyTreatments'
import Psoriasis from './components/src/screens/Psoriasis'
import DoctorNoteTest from './components/src/screens/DoctorNotes';
import DoctorVisitStartScreen from './components/src/screens/DoctorVisitStartScreen';
import MyCarousell from './components/src/common/MyCarousell';
import CameraPage from './components/src/screens/CameraPage';
import DoctorAppointment from './components/src/screens/DoctorAppointment';


// Navigation
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

// Redux 
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import firstReducer from './reducers/firstReducers';
const store = createStore(firstReducer);




// DEVICE INFORMATION
// let deviceWidth = Dimensions.get('window').width;
// let deviceHeight = Dimensions.get('window').height;
// const isAndroid = Platform.OS == "android";

const bg2 = require('./assets/background/startscreenred.png')


class HomeScreen extends React.Component {
  // Header options
  static navigationOptions = {
    headerStyle: {
      backgroundColor:'#ef2d56',
      color:'white',
      borderBottomWidth: 0,
      elevation: 0,
    },
    title: 'Hem',
    headerTitleStyle: {
      color:'white',
    },
  };

  constructor(props){
    super(props);
    this.state = {
      screenHeight: 0,
    }
  }

  componentDidMount() {
    // Load the fonts
    Font.loadAsync({
      'raleway-light': require('./assets/fonts/Raleway-Light.ttf'),
      'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
      'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),

    });
  }
  render() {
    return (

      <AnimatedHeader 
      style={{flex: 1}}
      noBorder={true}
      imageSource={bg2}
      disabled={false}>
      <ScrollView scrollEnabled>

        <View style={{flexDirection:'row', justifyContent: 'space-around' }}>
            <RNEButton 
            color='#EF2D56'
            iconName="heartbeat" 
            iconType="font-awesome" 
            btnText="Min behandling"
            onPress={() => this.props.navigation.navigate('MyTreatments')}
            />

            <RNEButton          
            color='#3772FF'
            iconName="camera" 
            iconType="font-awesome" 
            btnText="Hud och nagelbilder"
            onPress={() => this.props.navigation.navigate('SkinAndNailSelfie')}/>
         </View>


          <View style={{flexDirection:'row', paddingTop: 30, justifyContent: 'space-around' }}>
          <RNEButton          
          color='#FF007F'
          iconName="user-md" 
          iconType="font-awesome" 
          btnText="Läkarbesök"
          onPress={() => this.props.navigation.navigate('DoctorVisitStartScreen')}/>

          <RNEButton          
          color='#04151F'
          iconName="info" 
          iconType="font-awesome" 
          btnText="Psoriasis"
          onPress={() => this.props.navigation.navigate('Psoriasis')}/>
    
          </View>

          <View style={{paddingTop: 20, paddingBottom: 20}}>
            <Text style={{fontSize: 14, fontWeight:'bold', textAlign:'center'}}>För mer information</Text>
            <MyCarousell/>
          </View>

        </ScrollView>
    </AnimatedHeader>
      
    );
  }
}


// React navigation
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    
    MyTreatments: MyTreatments,
    
    DoctorVisitStartScreen: DoctorVisitStartScreen,
    
    DoctorNoteTest: DoctorNoteTest, 
    
    SkinAndNailSelfie: CameraPage,
    
    Psoriasis: Psoriasis,

    DoctorAppointment: DoctorAppointment,
    
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









