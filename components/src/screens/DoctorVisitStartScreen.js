
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView , Button} from 'react-native';
import { Icon } from 'react-native-elements'
import { APP_COLOR } from '../../../utils/Colors';



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
      <TouchableOpacity style={[styles.button, {backgroundColor:'#2E1F5E'}]}>
      <Icon
      containerStyle={{paddingLeft: 20}}
        raised
        name='check'
        type='font-awesome'
        color='#2E1F5E'
        onPress={() => console.log('hello')} />
          <Text style={{color:'white', paddingLeft: 10}}>Checklista</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, {backgroundColor:'#F46036'}]}>
      <Icon
        containerStyle={{paddingLeft: 20}}
        raised
        name='comments'
        type='font-awesome'
        color='#F46036'
        onPress={() => console.log('hello')} />
          <Text style={{color:'white', paddingLeft: 10}} >Mina frågor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, {backgroundColor:'#1B998B'}]}>
      <Icon
        containerStyle={{paddingLeft: 20}}
        raised
        name='user-md'
        type='font-awesome'
        color='#1B998B'
        onPress={() => console.log('hello')} />
          <Text style={{color:'white', paddingLeft: 10}}>Mitt nästa läkarbesök</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, {backgroundColor:'#E71D36'}]}>
      <Icon
        containerStyle={{paddingLeft: 20}}
        raised
        name='globe'
        type='font-awesome'
        color='#E71D36'
        onPress={() => console.log('hello')} />
          <Text style={{color:'white', paddingLeft: 10}}>Online läkare</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={() => {this.props.navigation.navigate('DoctorNoteTest')}} 
      style={[styles.button, {backgroundColor:'#C5D86D'}]}>
      <Icon
        containerStyle={{paddingLeft: 20}}
        raised
        name='pencil'
        type='font-awesome'
        color='#C5D86D'
        />
          <Text style={{color:'white', paddingLeft: 10}}>Anteckingar</Text>
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
        // justifyContent: 'center',
        
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom:20,
    }
}
