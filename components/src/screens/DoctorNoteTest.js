import React from 'react';
import { 
    FlatList,
    View,
    Platform,
    Keyboard, 
    AsyncStorage,
    Dimensions,
    Text
} from 'react-native';
import {Fumi, Sae} from 'react-native-textinput-effects';
import GradientButton from 'react-native-gradient-buttons';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MedicinCard from './../common/MedicinCard'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const isAndroid = Platform.OS == "android";
const viewPadding = 0;
let deviceWidth = Dimensions.get('window').width;

 


export default class DoctorNotesTest extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
          notes : [],
          text: "",
          viewPadding:0
      };

      this.changeTextHandler = this.changeTextHandler.bind(this);
      this.renderNotes = this.renderNotes.bind(this);

    };

    // This runs when the text changes
    changeTextHandler = text => {
        this.setState({
            text: text
        });
    };

    addNote = () => {
        let notEmpty = this.state.text.trim().length > 0;

        if(notEmpty){
            this.setState( 
                prevState => {
                    let {notes, text } = prevState;

                    return {
                        notes: notes.concat({key: notes.length, text: text}),
                        text: "",
                    };
                },
                () => Notes.save(this.state.notes)
            );
        }
    };


    deleteNote = i => {
        this.setState( prevState => {
            let notes = prevState.notes.slice();
            notes.splice(i , 1);
            return { notes: notes };
        },
        () => Notes.save(this.state.notes))
        this.renderNotes()
    }

    componentDidMount() {
      Keyboard.addListener(
          isAndroid ? "keyboardDidShow" : "keyboardWillShow",
          () => this.setState({ viewPadding: viewPadding})
      );

      Notes.all(notes => this.setState({notes: notes}))
      this.renderNotes();
    } 

    renderNotes() {
      this.state.notes.map((note) => {
        return (<Text>hej</Text>)
      })
    }

    
    
    

    render(){
              {/* TODO: STYLE THE NOTES AND THE TEXTINPUT */}

        return (
        <View style={{justifyContent:'center', alignItems:'center'}}>

        <TextInput 
        value={this.state.text}
        onChangeText={this.changeTextHandler}
        style={{borderColor:'black', borderWidth:0.6, height: 90, width: deviceWidth*0.9, paddingLeft: 10, marginTop: 10}}/>

        <TouchableOpacity onPress={this.addNote} style={{marginTop: 20}}>
          <Text>LÄGG TILL ANTECKNING</Text>
        </TouchableOpacity>
        <View>

        {this.state.notes.map((note, i) => {
          return (
            <View style={{flexDirection:'row'}} key={i}>
              <Text>{note.text}</Text>
              <TouchableOpacity onPress={() => this.deleteNote(i)}>
                <Text style={{marginLeft: 20,fontWeight:'bold'}}>Delete</Text>
              </TouchableOpacity>
            </View>
            );
        })}

        </View>







            {/* <View style={{marginTop: 100}}>
                <Sae
                onChangeText={this.changeTextHandler}
                label={'Anteckningar'}
                iconClass={FontAwesomeIcon}
                iconName={'pencil'}
                style={{height: 100}}
                iconColor={'black'}
                labelStyle={{height: 40}}
                inputPadding={40}
                inputStyle={{color: 'black', fontSize: 26}}
                multiline={true}
                labelHeight={24}
                // active border height
                borderHeight={1}
                // TextInput props
                autoCapitalize={'none'}
                autoCorrect={false}
            />
          <GradientButton
            text="LÄGG TILL"
            textStyle={{ fontSize: 14 }}
            gradientBegin="#ff4b1f"
            gradientEnd="#ff9068"
            gradientDirection="diagonal"
            height={isAndroid ? 100 : 80}
            width={deviceWidth * 0.95}
            radius={0}

            onPressAction={this.addNote}
          />
            </View>

            <FlatList 
            data={this.state.notes}
            keyExtractor = { (item, index) => index.toString() }
            renderItem={({ item, index }) =>

            <View style={{flex: 1,alignItems:'center', justifyContent:'center', height: 200}}>
             <MedicinCard 
             deleteTask={() => this.deleteNote(index)}
             medicin={item.text}
             />
            </View>
            }
            /> */}

        </View>

        )
    }
}

let Notes = {
    convertToArrayOfObject(notes, callback) {
      return callback(
        notes ? notes.split("||").map((note, i) => ({ key: i, text: note })) : []
      );
    },

    convertToStringWithSeparators(notes) {
      return notes.map(note => note.text).join("||");
    },
    all(callback) {
      return AsyncStorage.getItem("NOTES", (err, notes) =>
        this.convertToArrayOfObject(notes, callback)
      );
    },

    save(notes) {
        AsyncStorage.setItem("NOTES", this.convertToStringWithSeparators(notes));
    }
  };

const styles = {

}