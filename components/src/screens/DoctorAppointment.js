import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, Modal } from 'react-native';
import RoundedBtn from './../common/buttons/RoundedBtn';
import {APP_COLOR} from '../../../utils/Colors';


let deviceWidth = Dimensions.get('window').width;

export default class DoctorAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisible:false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
      const {shadow, inputText} = styles;
    return (
        <View style={{flex: 1, alignItems:'center'}}>
        <RoundedBtn 
            text={"LÄGG TILL LÄKARBESÖK"}
            textColor={'white'}
            onPress={() => {this.setModalVisible(true)}} 
            style={{
                position: 'absolute',
                bottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10, 
                borderWidth:0.5, 
                backgroundColor: APP_COLOR}}/>
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            }}>
                <View style={{ flex: 1, alignItems:'center',backgroundColor: 'rgba(0,0,0,0.1)'}}>
                    <View style={shadow}>
                        <TextInput
                        // onChangeText={this.changeTextHandler}
                        // onSubmitEditing={this.addTask}
                        style={inputText}
                        //value={text}
                        placeholder={"Tid"}
                        placeholderTextColor={'#DDDDDD'}
                        />

                        <TextInput
                        // onChangeText={this.changeTextHandlerTwo}
                        style={inputText}
                        // value={description}
                        placeholder={"Dag"}
                        placeholderTextColor={'#DDDDDD'}
                        />

                        <TextInput
                        style={inputText}
                        // value={text}
                        placeholder={"Adress"}
                        placeholderTextColor={'#DDDDDD'}
                        />
                    </View>

                    <RoundedBtn 
                        text={"LÄGG TILL LÄKARBESÖK"}
                        textColor={'white'}
                        onPress={() => {this.setModalVisible(true)}} 
                        style={{
                            marginTop: 10, 
                            borderWidth:0.5, 
                            backgroundColor: APP_COLOR}}/>

                    <RoundedBtn 
                    text={"AVBRYT"}
                    textColor={APP_COLOR}
                    onPress={() => {this.setModalVisible(!this.state.modalVisible)}} 
                    style={{
                        marginTop: 10, 
                        borderWidth:0.5, 
                        borderColor: APP_COLOR}}/>
                        </View>
        </Modal>
        </View>
       
    );
  }
}

const styles = {
     // TEXTINPUT
     inputText: {
        fontSize: 20,borderBottomWidth:0.6, borderBottomColor:'#DDDDDD', width: '90%'
      },
      shadow: {
          borderRadius: 40,
          marginTop: 60,
          shadowColor: 'rgba(0,0,0, .4)', // IOS
          shadowOffset: { height: 1, width: 1 }, // IOS
          shadowOpacity: 1, // IOS
          shadowRadius: 1, //IOS
          elevation: 2, // Android
          height: 300,
          width: deviceWidth * 0.9,
          backgroundColor:'white',
          alignItems: 'center',
          justifyContent:'space-around',
          padding: 20,
      }
}