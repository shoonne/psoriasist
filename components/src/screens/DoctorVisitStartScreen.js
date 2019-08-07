
import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { APP_COLOR } from '../../../utils/Colors';
import RNEIcon from './../common/buttons/RNEIcon';

let deviceWidth = Dimensions.get('window').width;

export default class DoctorVisitStartScreen extends Component {
  static navigationOptions = {
    headerTintColor: 'white',
    title: 'Läkarbesök',
    headerStyle: {
      backgroundColor: APP_COLOR ,
    },
    headerTitleStyle: {
      color:'white',
    },
  };
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{alignItems:'center'}}>
      <ScrollView showsVerticalScrollIndicator={false}>

      <TouchableOpacity 
      onPress={() => {this.props.navigation.navigate('DoctorNoteTest')}} 
      style={[styles.button, {backgroundColor:'#C5D86D'}]}>
       <RNEIcon name={"pencil"} color={"#C5D86D"} iconText={"Anteckingar"}/>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, {backgroundColor:'#F46036'}]}>
       <RNEIcon name={"comments"} color={"#F46036"} iconText={"Mina frågor"}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {this.props.navigation.navigate('DoctorAppointment')}} style={[styles.button, {backgroundColor:'#1B998B'}]}>
        <RNEIcon name={"user-md"} color={"#1B998B"} iconText={"Mitt nästa läkarbesök"}/>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, {backgroundColor:'#E71D36'}]}>
        <RNEIcon name={"globe"} color={"#E71D36"} iconText={"Online läkare"}/>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, {backgroundColor:'#2E1F5E'}]}>
       <RNEIcon name={"check"} color={"#2E1F5E"} iconText={"Checklista"}/>
      </TouchableOpacity>

      </ScrollView>
      </View>
    );
  }
}

const styles = {
    button: {
        borderRadius: 10,
        marginTop: 10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
        height: 120,
        width: deviceWidth * 0.9,        
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom:20,
    }
}
