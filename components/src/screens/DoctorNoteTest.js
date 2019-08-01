import React from 'react';
import { 
    View,
    Platform,
    Keyboard, 
    AsyncStorage,
    Dimensions,
    Text,
    Alert
} from 'react-native';
import { TextInput} from 'react-native-gesture-handler';
import { ListItem} from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import RNEButton from '../../common/RNEButton';


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
        <View style={{alignItems:'center'}} >      
        <TextInput 
        multiline={true}
        value={this.state.text}
        onChangeText={this.changeTextHandler}
        style={{borderWidth:0.6, height: 90, width: deviceWidth*0.9, paddingLeft: 10, marginTop: 10}}/>

         <RNEButton
          color='#EF2D56'
          iconName="plus" 
          iconType="font-awesome" 
          btnText="Lägg till"
          onPress={this.addNote}
      />
        <View>

        {this.state.notes.map((note, i) => {
          return (

            <ListItem
            key={i}
                  containerStyle={{height: 150, width: deviceWidth}}
                  onLongPress={ () => Alert.alert(
                        'Alert Title',
                        'My Alert Msg',
                        [
                          {text: 'Delete', onPress: () => this.deleteNote(i)},
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
                    colors: ['#EF2D56', '#F44336'],
                    start: [1, 0],
                    end: [0.2, 0],
                  }}
                  //ViewComponent={LinearGradient} // Only if no expo
                  // leftAvatar={{ rounded: true, source: { uri: avatar_url } }}
                  titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}
                  subtitleStyle={{ color: 'white' }}
                  subtitle={note.text}
                  chevronColor="white"
                  chevron/>

            );

        })}

        </View>
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
