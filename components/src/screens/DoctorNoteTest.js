import React from 'react';
import { 
    ScrollView,
    View,
    Platform,
    Keyboard, 
    AsyncStorage
} from 'react-native';
import {Fumi, Sae} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const isAndroid = Platform.OS == "android";
const viewPadding = 0;
 


export default class DoctorNotesTest extends React.Component {
    _isMounted = false;
    constructor(props) {
      super(props)
    
      this.state = {
          notes : [],
          text: "",
          viewPadding:0
      };
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
                () => Notes.save(this.state.notes, this.state.text)
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

    componentDidMount() {
        this._isMounted = true;
        console.log(this._isMounted)

        if(this._isMounted){
            Keyboard.addListener(
                isAndroid ? "keyboardDidShow" : "keyboardWillShow",
                () => this.setState({ viewPadding: viewPadding})
            );
    
            Notes.all(notes => this.setState({notes: notes}))
        }


    } 
    componentWillUnmount() {
        this._isMounted = false;
        console.log(this._isMounted)

      }
    
    

    render(){
        return (
        <View>
            <View style={{marginTop: 100}}>
                <Sae
                
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
            </View>
        </View>

        )
    }
}

let Notes = {
    convertToArrayOfObject(notes, callback) {
      return callback(
        notes ? notes.split("||").map((task, i) => ({ key: i, text: task })) : []
      );
    },

    convertToStringWithSeparators(notes) {
      return notes.map(task => task.text).join("||");
    },
    all(callback) {
      return AsyncStorage.getItem("TASKS", (err, notes) =>
        this.convertToArrayOfObject(notes, callback)
      );
    },

    save(notes) {
        AsyncStorage.setItem("NOTES", this.convertToStringWithSeparators(notes));
    }
  };

const styles = {

}