import React, {Component} from 'react';
import {
  View, 
  FlatList, 
  AsyncStorage, 
  Keyboard, 
  Platform, 
  Dimensions,
  Modal,
  Alert,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native';

import AnimatedHeader from 'react-native-animated-header';
import RNEButton from '../common/buttons/IconBtn';
import RoundedBtn from '../common/buttons/RoundedBtn';

const bg2 = require('../../../assets/background/pills.png');
const isAndroid = Platform.OS == "android";
const viewPadding = 0;
let deviceWidth = Dimensions.get('window').width;
const APP_COLOR = '#EF2D56';


class MyTreatments extends Component {
  static navigationOptions = {
    headerTintColor: 'white',
    title: 'Min behandling',
    headerStyle: {
      backgroundColor: '#EF2D56' ,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color:'white',
    },
  };

    state = {
        tasks:[],
        text: "",
        descriptions:[],
        description: "",
        addMedecin: false,
        modalVisible:false,
    };

    changeTextHandler = text => {
        this.setState({
            text: text
        });
    };

    changeTextHandlerTwo = text => {
      this.setState({
          description: text
      });
  };

    addTask = () => {
        let notEmpty = this.state.text.trim().length > 0;

        if(notEmpty){
            this.setState( 
                prevState => {
                    let {tasks, text, descriptions, description, modalVisible} = prevState;
                    return {
                        tasks: tasks.concat({key: tasks.length, text: text}),
                        text: "",
                        description: "",
                        descriptions: descriptions.concat({key: tasks.length, description: description }),
                        modalVisible: !modalVisible
                    };
                },
                () => Tasks.save(this.state.tasks, this.state.descriptions)
            );
        }
    };

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }


    deleteTask = i => {
        this.setState( prevState => {
            let tasks = prevState.tasks.slice();
            let descriptions = prevState.descriptions.slice();
            tasks.splice(i , 1);
            descriptions.splice(i,1)
            return { tasks: tasks, descriptions: descriptions };
        },
        () => Tasks.save(this.state.tasks, this.state.descriptions)
        )
    }

    componentDidMount() {
        Keyboard.addListener(
            isAndroid ? "keyboardDidShow" : "keyboardWillShow",
            () => this.setState({ viewPadding: viewPadding})
        );

        Tasks.all(tasks => this.setState({tasks: tasks}))
        Tasks.allTwo(descriptions => this.setState({descriptions:descriptions}))
    }

    render(){
      const {container, animatedHeader, list, modal, shadow, inputText, addNewMedicinBtn} = styles;
      const {tasks, modalVisible, text, description} = this.state; 

        return (
            <View
            style={container}>
            <AnimatedHeader 
            style={animatedHeader}
            noBorder={true}
            headerMaxHeight={200}
            imageSource={bg2}>

            <FlatList 
            style={list}
            data={tasks}
            keyExtractor = { (item, index) => index.toString() }
            renderItem={({ item, index }) => 

            // DESIGN CARD 
            <TouchableOpacity style={{ width: deviceWidth * 0.9, height: 150, backgroundColor:'red', marginBottom: 10}}>
            <Text>{item.text}</Text>
            </TouchableOpacity>
                }
            />
            
              </AnimatedHeader>
              
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
                <View style={modal}>

                <View style={shadow}>
                  <TextInput
                  onChangeText={this.changeTextHandler}
                  onSubmitEditing={this.addTask}
                  style={inputText}
                    value={text}
                    placeholder={"Namn"}
                    placeholderTextColor={'#DDDDDD'}
                  />

                  <TextInput
                  onChangeText={this.changeTextHandlerTwo}
                  style={inputText}
                  value={description}
                  placeholder={"Beskrivning"}
                  placeholderTextColor={'#DDDDDD'}
                  />

                  <TextInput
                  style={inputText}
                  value={text}
                  placeholder={"Frekvens"}
                  placeholderTextColor={'#DDDDDD'}
                  />
                </View>

                <RoundedBtn 
                text={"LÄGG TILL"}
                textColor={"white"}
                onPress={this.addTask}
                style={{marginTop: 50, backgroundColor: APP_COLOR}}/>

                <RoundedBtn 
                text={"AVBRYT"}
                textColor={APP_COLOR}
                onPress={() => {this.setModalVisible(!modalVisible)}} 
                style={{marginTop: 10, borderWidth:0.5, borderColor: APP_COLOR}}/>

              </View>
             </Modal>

             <View style={addNewMedicinBtn}>
                <RNEButton 
                onPress={() => {this.setModalVisible(true)}} 
                size={25} height={80} color={APP_COLOR} iconName='plus' iconType='font-awesome'/>
             </View>

          </View>
        );
    }


}



let Tasks = {
    convertToArrayOfObject(tasks, callback) {
      return callback(
        tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
      );
    },
    convertToArrayOfObjectTwo(descriptions, callback) {
      return callback(
        descriptions ? descriptions.split("||").map((description, i) => ({ key: i, description: description })) : []
      );
    },
    convertToStringWithSeparators(tasks) {
      return tasks.map(task => task.text).join("||");
    },
    convertToStringWithSeparatorsTwo(descriptions) {
      return descriptions.map(description => description.description).join("||");
    },
    all(callback) {
      return AsyncStorage.getItem("TASKS", (err, tasks) =>
        this.convertToArrayOfObject(tasks, callback)
      );
    },
    allTwo(callback) {
      return AsyncStorage.getItem("DESCRIPTIONS", (err, descriptions) =>
        this.convertToArrayOfObjectTwo(descriptions, callback)
      );
    },
    save(tasks, descriptions ) {
      AsyncStorage.multiSet([
        ["TASKS", this.convertToStringWithSeparators(tasks)], 
        ["DESCRIPTIONS",this.convertToStringWithSeparatorsTwo(descriptions)]
      ]);
    }
  };




const styles = {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: viewPadding,
    },
    list: {
      width: "100%"
    },
    animatedHeader: {
      flex: 1, 
      width: deviceWidth, 
      justifyContent:'center', 
      alignItems: 'center' 
    },
    modal: {
      flex: 1, 
      alignItems:'center',
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
    addNewMedicinBtn:{
      height: 50,
      width: 50,
      borderRadius: 200,
      position: 'absolute',
      bottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // TEXTINPUT
    inputText: {
      fontSize: 20,borderBottomWidth:0.6, borderBottomColor:'#DDDDDD', width: '90%'
    },
    shadow: {
        borderRadius: 40,
        marginTop: 70,
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

  };



  export default (MyTreatments);


                    