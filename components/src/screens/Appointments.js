import React from 'react';
import { Dimensions, View, TextInput } from 'react-native';
import Header from './../common/Header';
import GradientButton from 'react-native-gradient-buttons';



let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
const HEADER_TEXT = 'Ofta har man inte lång tid med sin läkare. Därför kan det vara bra att skriva ner frågor som man vill ta upp under läkarbesöket'
class Appointments extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       text: "",
    };
  };
  
  static navigationOptions = {
    title: 'Läkarbesök',
    headerStyle: {
      backgroundColor: '#59cd90',
      color:'white'
    },
  };

  onChangeNotes = (text) => {
    //console.log(text);
    this.setState({
      text: text,
    })
  }
    render() {
      return (
        <View >
            <View style={{flex:1, height: 200, alignItems:'center'}}>
              <TextInput
              multiline={true}
              onChangeText={this.onChangeNotes}
              placeholder=" Lägg till anteckningar för nästa läkarbesök"
              style={{height: 150, width: '90%', borderColor: 'gray', fontSize: 16, borderWidth:0.5 }}
              />   
              <View style={{marginTop: 20}}>
                <GradientButton
                text="LÄGG TILL"
                textStyle={{ fontSize: 14, color:'white' }}
                gradientBegin="#51E5FF"
                gradientEnd="#18A0FA"
                gradientDirection="horizontal"
                height={70}
                width={deviceWidth * 0.75}
                radius={0}   
                 />
              </View>

            </View>
        </View>
      );
    }
  }

  export default Appointments;