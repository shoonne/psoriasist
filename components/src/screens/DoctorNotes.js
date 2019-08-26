import React from 'react';
import { 
    View,
    Platform,
    Keyboard, 
    AsyncStorage,
    Dimensions,
    Text,
    Alert,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { TextInput} from 'react-native-gesture-handler';
import IconBtn from '../common/buttons/IconBtn';


const isAndroid = Platform.OS == "android";
const viewPadding = 0;
let deviceWidth = Dimensions.get('window').width;

export default class DoctorNotesTest extends React.Component {
  static navigationOptions = {
    headerTintColor: 'white',
    title: 'Läkarbesök',
    headerStyle: {
      //backgroundColor: '#EF2D56' ,
    },
    headerTitleStyle: {
      color:'white',
    },
  };
    constructor(props) {
      super(props)
    
      this.state = {
          notes : [],
          text: "",
          viewPadding:0
      };

      this.changeTextHandler = this.changeTextHandler.bind(this);
   

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
                    let {notes, text} = prevState;

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
    }

    onLongPressCard = (i) => {
       Alert.alert(
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
      )
    }

    componentDidMount() {
      Keyboard.addListener(
          isAndroid ? "keyboardDidShow" : "keyboardWillShow",
          () => this.setState({ viewPadding: viewPadding})
      );

      Notes.all(notes => this.setState({notes: notes}))
    } 

    renderNotes() {
      this.state.notes.map((note) => {
        return (<Text>hej</Text>)
      })
    }
    
    render(){
              {/* TODO: STYLE THE NOTES AND THE TEXTINPUT */}

        return (
          <View>

          <View style={{alignItems:'center', marginTop: 20}}>
            <TextInput 
            placeholder="Skriv ner anteckingar"
              multiline={true}
              value={this.state.text}
              onChangeText={this.changeTextHandler}
              style={{ borderBottomWidth:0.5, maxHeight: 150, width: deviceWidth*0.9, paddingLeft: 10, marginTop: 10}}/>

              <IconBtn
                color='#EF2D56'
                size={20}
                iconName="plus" 
                iconType="font-awesome" 
                btnText="Lägg till"
                onPress={this.addNote}
            />
          </View>

          <View>
          <FlatList
          data={this.state.notes}
          keyExtractor = { (item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={{alignItems:'center'}}>
            <TouchableOpacity onLongPress={() => this.onLongPressCard(index)} style={[styles.button, {backgroundColor:'#f2eecb'}]}>
            <Text style={{color:'#3e3e3c', padding: 10}}>{item.text}</Text>
            </TouchableOpacity>
            </View>

          )}
              
          />
          </View>

          </View>
        )
    }
}
const styles = {
  button: {
   flexWrap: "wrap",
    borderRadius: 10,
    marginTop: 10,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    width: deviceWidth * 0.9,
    // justifyContent: 'center',
   // flexDirection: 'row',
    marginBottom:20,
}
}

let Notes = {
    convertToArrayOfObject(notes, callback) {
      return callback(
        notes ? notes.split("||").map((note, i) => ({ key: i, text: note })) : []
      );
    },

    all(callback) {
      return AsyncStorage.getItem("NOTES", (err, notes) =>
        this.convertToArrayOfObject(notes, callback)
      );
    },
    
    convertToStringWithSeparators(notes) {
      return notes.map(note => note.text).join("||");
    },

    save(notes) {
        AsyncStorage.setItem("NOTES", this.convertToStringWithSeparators(notes));
    }
  };
