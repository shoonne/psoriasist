import React from 'react';
import {View, Dimensions, ScrollView, Platform, Text } from 'react-native';
import { Font } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';
import RNEButton from './components/src/common/RNEButton';
import { Icon } from 'native-base';
import AnimatedHeader from 'react-native-animated-header';

// Components
import MyTreatments from './components/src/screens/MyTreatments'
import SkinAndNailSelfieV2 from './components/src/screens/SkinAndNailSelfieV2';
import Psoriasis from './components/src/screens/Psoriasis'
import DoctorNoteTest from './components/src/screens/DoctorNotes';
import DoctorVisitStartScreen from './components/src/screens/DoctorVisitStartScreen';
import MyCarousell from './components/src/common/MyCarousell';

// Navigation
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

// Redux 
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import firstReducer from './reducers/firstReducers';
const store = createStore(firstReducer);




// DEVICE INFORMATION
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
const isAndroid = Platform.OS == "android";

const bg = 'https://dummyimage.com/640x360/fff/aaa';
const bg2 = require('./assets/background/headerimg3.png')


class HomeScreen extends React.Component {
  // Header options
  static navigationOptions = {
    headerStyle: {
      //backgroundColor:'#2E1F5E',
      color:'white',
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerBackground: (
      <LinearGradient
        colors={["#2E1F5E", "#3C1B66"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    ),
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
      style={{flex: 1, }}
      noBorder={true}
      //backText='Back'
      //title='Happy coding'
      //renderLeft={() => (<Icon name='arrow-back' style={{ marginLeft: 20 }} />)}
      //renderRight={() => (<Icon name='add' style={{ marginRight: 20 }} />)}
      backStyle={{ marginLeft: 10 }}
      backTextStyle={{fontSize: 14, color: '#000'}}
      titleStyle={{ fontSize: 22, left: 20, bottom: 20, color: '#000' }}
      headerMaxHeight={200}
      imageSource={bg2}
      toolbarColor='#FFF'
      disabled={false}
    >
      <ScrollView contentContainerStyle={{flexGrow:1, height: deviceHeight + 100, }}
         scrollEnabled>
        <View style={{flexDirection:'row', paddingTop: 10, justifyContent: 'space-around' }}>
      
          <RNEButton 
          color='#EF2D56'
          iconName="heartbeat" 
          iconType="font-awesome" 
          btnText="Min behandling"
          onPress={() => this.props.navigation.navigate('MyTreatments')}
          />

          <RNEButton          
          color='#5CC8FF'
          iconName="camera" 
          iconType="font-awesome" 
          btnText="Hud och nagelbilder"
          onPress={() => this.props.navigation.navigate('SkinAndNailSelfie')}/>
          </View>


          <View style={{flexDirection:'row', paddingTop: 30, justifyContent: 'space-around' }}>

          <RNEButton          
          color='#B14AED'
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
    
    SkinAndNailSelfie: SkinAndNailSelfieV2,
    
    Psoriasis: Psoriasis
    
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
}








