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
} from 'react-native';

import AnimatedHeader from 'react-native-animated-header';
import RNEButton from '../common/buttons/IconBtn';
import RoundedBtn from '../common/buttons/RoundedBtn';
import MedicinCard from '../common/Medicincard';
import {APP_COLOR, PLACEHOLDER} from '../../../utils/Colors';

const bg2 = require('../../../assets/background/pills.png');
const isAndroid = Platform.OS == "android";
const viewPadding = 0;
let deviceWidth = Dimensions.get('window').width;


class MyTreatments extends Component {
  static navigationOptions = {
    headerTintColor: 'white',
    title: 'Min behandling',
    headerStyle: {
      backgroundColor: APP_COLOR ,
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

    setModalVisible(visible){
      this.setState({modalVisible: visible});
    }

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
                () => TextConfig.save(this.state.tasks, this.state.descriptions)
            );
        }
    };

    deleteTask = i => {
        this.setState( prevState => {
            let tasks = prevState.tasks.slice();
            let descriptions = prevState.descriptions.slice();
            tasks.splice(i , 1);
            descriptions.splice(i,1)
            return { tasks: tasks, descriptions: descriptions };
        },
        () => TextConfig.save(this.state.tasks, this.state.descriptions)
        )
    }

    onLongPressCard = (i) => {
      Alert.alert(
       'Alert Title',
       'My Alert Msg',
       [
         {text: 'Delete', onPress: () => this.deleteTask(i)},
         {
           text: 'Cancel',
           onPress: () => console.log('Cancel Pressed'),
           style: 'cancel',
         },
         {text: 'OK', onPress: () => console.log('OK Pressed')},
       ],
       {cancelable: false},
     )
   }

    componentDidMount() {
        Keyboard.addListener(
            isAndroid ? "keyboardDidShow" : "keyboardWillShow",
            () => this.setState({ viewPadding: viewPadding})
        );

        TextConfig.all(tasks => this.setState({tasks: tasks}))
        TextConfig.allTwo(descriptions => this.setState({descriptions:descriptions}))
    }

    render(){
      const {container, animatedHeader, list, modal, shadow, inputText, addNewMedicinBtn} = styles;
      const {tasks, modalVisible, text, description, descriptions} = this.state; 

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
            <MedicinCard
            onLongPress={this.onLongPressCard}
            text={item.text}
            description={descriptions[index] ? descriptions[index].description : 'No description'} />}
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
                  style={inputText}
                  value={text}
                  placeholder={"Namn"}
                  placeholderTextColor={PLACEHOLDER}
                  />

                  <TextInput
                  onChangeText={this.changeTextHandlerTwo}
                  style={inputText}
                  value={description}
                  placeholder={"Beskrivning"}
                  placeholderTextColor={PLACEHOLDER}
                  />

                  <TextInput
                  style={inputText}
                  value={text}
                  placeholder={"Frekvens"}
                  placeholderTextColor={PLACEHOLDER}
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
             <RoundedBtn 
                text={"LÄGG TILL"}
                textColor={"white"}
                onPress={this.addTask}
                style={{marginTop: 50, backgroundColor: APP_COLOR}}
                onPress={() => {this.setModalVisible(true)}}
                />
             </View>

          </View>
        );
    }


}



let TextConfig = {
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
      bottom: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // TEXTINPUT
    inputText: {
      fontSize: 20,borderBottomWidth:0.6, borderBottomColor:PLACEHOLDER, width: '90%'
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


                    