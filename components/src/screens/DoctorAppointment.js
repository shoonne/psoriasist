import React, { Component } from 'react';
import { View, AsyncStorage, TextInput, Dimensions, Modal,DatePickerIOS} from 'react-native';
import MedicinCard from '../common/Medicincard';
import RoundedBtn from './../common/buttons/RoundedBtn';
import {APP_COLOR} from '../../../utils/Colors';


let deviceWidth = Dimensions.get('window').width;

export default class DoctorAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisible:false,
        adresses:[],
        adress: '',
        notes:[],
        note:'',
        adresses:[],
        adress:'',
        chosenDate: new Date()
    };

    this.setDate = this.setDate.bind(this);

  }

  clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }

  componentDidMount(){
    TextConfig.all(times => this.setState({adresses: times}));
    TextConfig.allTwo(days => this.setState({notes: days}));
  }
    
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onChangeAdress = text => {
    this.setState({adress:text})
  }

  onChangeNote = text => {
    this.setState({note: text})
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }


  addTask = () => {
    let notEmpty = this.state.adress.trim().length > 0;

    if(notEmpty){
        this.setState( 
            prevState => {
                let {adresses, adress, note,  notes,  modalVisible} = prevState;
                return {
                    adresses: adresses.concat({key: adresses.length, adress: adress}),
                    adress: "",
                    note: "",
                    notes: notes.concat({key: adresses.length, note: note }),
                    modalVisible: !modalVisible
                };
            },
            () => TextConfig.save(this.state.adresses, this.state.notes)
        );
    }
  };
  render() {
    console.log(this.state.days);
      const {shadow, inputText} = styles;

      const {adresses, notes} = this.state
    return (
        <View style={{flex: 1, alignItems:'center'}}>

        <View style={{marginTop: 20}}> 
          {adresses ? adresses.map((adress, index) => (
          <MedicinCard 
          description={notes[index] ? notes[index].note : 'No description'} 
          key={index} text={adress.adress}/>
          )) : null}
        </View>
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
                <View style={styles.container}>
                  <DatePickerIOS date={this.state.chosenDate} onDateChange={this.setDate} />
                </View>
                <View style={{ flex: 2, alignItems:'center',backgroundColor: 'rgba(0,0,0,0.1)'}}>
 
                    <View style={shadow}>

                        <TextInput
                        onChangeText={this.onChangeAdress}
                        style={inputText}
                        value={this.state.time}
                        placeholder={"Adress"}
                        placeholderTextColor={'#DDDDDD'}
                        />

                        <TextInput
                        onChangeText={this.onChangeNote}
                        style={inputText}
                        value={this.state.day}
                        placeholder={"Anteckingar"}
                        placeholderTextColor={'#DDDDDD'}
                        />

                    </View>

                    <RoundedBtn 
                        text={"LÄGG TILL"}
                        textColor={'white'}
                        onPress={this.addTask} 
                        style={{
                            position: 'absolute',
                            bottom: 80,
                            marginTop: 10, 
                            borderWidth:0.5, 
                            backgroundColor: APP_COLOR}}/>

                    <RoundedBtn 
                    text={"AVBRYT"}
                    textColor={APP_COLOR}
                    onPress={() => {this.setModalVisible(!this.state.modalVisible)}} 
                    style={{
                        position: 'absolute',
                        bottom: 30,
                        marginTop: 10, 
                        borderWidth:0.5, 
                        borderColor: APP_COLOR}}/>
                        </View>
        </Modal>
        </View>
       
    );
  }
}

let TextConfig = {
  convertToArrayOfObject(adresses, callback) {
    return callback(
      adresses ? adresses.split("||").map((adress, i) => ({ key: i, adress: adress })) : []
    );
  },
  convertToArrayOfObjectTwo(notes, callback) {
    return callback(
      notes ? notes.split("||").map((note, i) => ({ key: i, note: note })) : []
    );
  },
  convertToStringWithSeparators(adresses) {
    return adresses.map(adress => adress.adress).join("||");
  },
  convertToStringWithSeparatorsTwo(notes) {
    return notes.map(note => note.note).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("ADRESSES", (err, adresses) =>
      this.convertToArrayOfObject(adresses, callback)
    );
  },
  allTwo(callback) {
    return AsyncStorage.getItem("NOTES", (err, notes) =>
      this.convertToArrayOfObjectTwo(notes, callback)
    );
  },
  save(adresses, notes) {
    AsyncStorage.multiSet([
      ["ADRESSES", this.convertToStringWithSeparators(adresses)], 
      ["NOTES",this.convertToStringWithSeparatorsTwo(notes)]
    ]);
  }
};


const styles = {
     // TEXTINPUT
     inputText: {
        fontSize: 20,borderBottomWidth:0.6, borderBottomColor:'#DDDDDD', width: '90%'
      },
      shadow: {
          borderRadius: 40,
          marginTop: 40,
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
      },
      container: {
        flex: 1,
        justifyContent: 'center',
      },
}