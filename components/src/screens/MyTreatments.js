import React, {Component} from 'react';
import {
  Text, 
  View, 
  FlatList, 
  AsyncStorage, 
  Keyboard, 
  Platform, 
  ImageBackground, 
  Dimensions,
  Modal,
  Alert
  
} from 'react-native';
import { ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale


import MedicinCard from '../common/MedicinCard'
import Header from '../common/Header'; 
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Redux
import {connect} from 'react-redux'; 
import {changeMedicinText} from './../../../actions';
import RNEButton from '../../common/RNEButton';

const isAndroid = Platform.OS == "android";
const viewPadding = 0;
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let text = 'Det är tidskrävande att ha psoriasis. Man mår dock ofta bättre om man tar hand om sig och håller reda på sina behandlingar. Några kan till och med vara besvärsfria ett tag.';

class MyTreatments extends Component {
  static navigationOptions = {
    title: 'Min behandling',
    headerStyle: {
      backgroundColor: '#5bc9ff',
      color:'white'
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

        console.log(this.state.descriptions)
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

        //console.log(this.state.descriptions)
    }

    renderHeader = () => {
      return <Header text={text}/>
    }

  

    render(){
      //console.log(this.state)

        return (
            <View
            style={styles.container}>
            <ImageBackground source={require('./../../../assets/background/clearblue.png')} style={{width: '100%', height: '100%'}}>
              <FlatList 
              ListHeaderComponent={() => <Header text={text}/>}
              style={styles.list}
              data={this.state.tasks}
              keyExtractor = { (item, index) => index.toString() }
              renderItem={({ item, index }) =>
                  <ListItem
                  onLongPress={ () => Alert.alert(
                        'Alert Title',
                        'My Alert Msg',
                        [
                          {text: 'Delete', onPress: () => this.deleteTask(index)},
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                      )}
                  Component={TouchableScale}
                  friction={90} //
                  tension={100} // These props are passed to the parent component (here TouchableScale)
                  activeScale={0.95} //
                  linearGradientProps={{
                    colors: ['#FF9800', '#F44336'],
                    start: [1, 0],
                    end: [0.2, 0],
                  }}
                  //ViewComponent={LinearGradient} // Only if no expo
                  // leftAvatar={{ rounded: true, source: { uri: avatar_url } }}
                  title={item.text}
                  titleStyle={{ color: 'white', fontWeight: 'bold' }}
                  subtitleStyle={{ color: 'white' }}
                  subtitle={this.state.descriptions[index] ? this.state.descriptions[index].description : 'No description'}
                  chevronColor="white"
                  chevron/>}
              />
              
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
                <View  style={{flex: 1,flexDirection:'column', justifyContent:'space-around'}}>

                <View style={{height:100, marginTop: 100}}>
                    <Fumi
                    onChangeText={this.changeTextHandler}
                    //onSubmitEditing={this.addTask}
                    value={this.state.text}
                    style={{height: 80}}
                    labelHeight={24}
                    label={'Lägg till medecin'}
                    iconClass={FontAwesomeIcon}
                    iconName={'medkit'}
                    iconColor={'#5bc9ff'}
                    iconSize={20}
                    iconWidth={40}
                    inputPadding={16}
                  />
                    <Fumi
                      onChangeText={this.changeTextHandlerTwo}
                      //onSubmitEditing={this.addTaskTwo}
                      value={this.state.description}
                      style={{height: 80}}
                      labelHeight={24}
                      label={'Lägg till beskrivning'}
                      iconClass={FontAwesomeIcon}
                      iconName={'pencil'}
                      iconColor={'#5bc9ff'}
                      iconSize={20}
                      iconWidth={40}
                      inputPadding={16}
                    />
                  </View>  

                  <View style={{justifyContent:'center', alignItems:'center'}}>
                      <RNEButton
                          color='#f50'
                          iconName="plus" 
                          iconType="font-awesome" 
                          btnText="Lägg till"
                          onPress={this.addTask}
                      />
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center'}}>
                      <RNEButton
                          color='#f50'
                          iconName="times" 
                          iconType="font-awesome" 
                          btnText="Avbryt"
                          onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
                      />
                    </View>


                 </View>
             </Modal>
             <View style={{justifyContent:'center', alignItems:'center'}}>
               <RNEButton
                  color='#f50'
                  iconName="plus" 
                  iconType="font-awesome" 
                  btnText="Lägg till medicin"
                  onPress={() => {this.setModalVisible(true)}}
               />
             </View>
            </ImageBackground>
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
      backgroundColor: "#F5FCFF",
      padding: viewPadding,
    },
    list: {
      width: "100%"
    },
    listItem: {
      paddingTop: 2,
      paddingBottom: 2,
      fontSize: 20,
      color:'black',
      marginLeft:10,

    },
    listItemCont: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 100,
      backgroundColor:'white',
      marginRight: 10,
      marginLeft: 10,
      borderRadius: 15,
      borderWidth: 0.6,
      borderColor: '#ff5964',
    },

    // TEXTINPUT

    textInputContainer:{
      backgroundColor:'white', 
      height:120, 
      justifyContent:'center', 
      alignItems:'center', 
      borderRadius: 15, 
      marginRight:10, 
      marginLeft: 10,
      borderWidth: 0.6,
      borderColor: '#ff5964',
    },
    textInput: {
      backgroundColor:'white',
      height: 60,
      paddingRight: 10,
      paddingLeft: 10,
      width: deviceWidth * 0.9,
      fontSize:20,
      borderWidth: 0.6,
      borderColor: '#ff5964',
    }
  };

  // matStateToProps takes in the state and returns an object
function mapStateToProps(state) {
  return {
      text: state.text,
  };
}

  export default connect(mapStateToProps,{changeMedicinText})(MyTreatments);


            {/*   */}