import React, {Component} from 'react';
import { View, Text, Dimensions, Image, Animated } from 'react-native';

let deviceWidth = Dimensions.get('window').width;

class  Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0

    }
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start(); 
  }

  render() {
    let { fadeAnim } = this.state;

    return(
      <View style={{ flexDirection:'row', width: '95%', }}>

      <Image source={require('./../../assets/logo.png')} style={{width: 70, height: 70, marginTop: 40, borderWidth:0.6, borderColor:'white', borderRadius:35, marginLeft: 10}}/>
      <Animated.View style={[styles.text,{opacity: fadeAnim,}]}>
      <Text style={{ paddingTop: 8, margin: 15, color:'white',}}>{this.props.text}</Text>
      </Animated.View>
      
    
      </View>
    )
  }


}

const styles = {
  text: {
    backgroundColor: '#189ff2',       
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth:0.5,
    borderColor:'white',
    marginTop:80,
    marginLeft:14,
    marginBottom: 30,
    marginRight: 70,
    },
}



export default Header;



    // <View style={styles.header}>
    // <Image source={require('./../../assets/logo.png')} style={{width: 70, height: 70, paddingTop: 90}}/>
    // <View style={styles.textContainer}>
    // <Text style={{ paddingTop: 8, margin: 15, color:'white',}}>{props.text}</Text>
    // </View>
    // </View>

    // const styles = {
    //   header : {
    //     width: deviceWidth, 
    //     height: 200, 
    //     // borderBottomWidth: 2.6, 
    //     // borderLeftWidth: 0.6,
    //     // borderRightWidth: 0.6,
    //     borderBottomRightRadius: 50,
    //     borderBottomLeftRadius: 50, 
    //   },
    //   textContainer: {
    //       marginLeft: deviceWidth * 0.25,  
    //       marginRight: 15,
    //       borderWidth: 0.5,
    //       borderColor: 'white',
    //       borderTopRightRadius: 15,
    //       borderBottomLeftRadius: 15,
    //       borderBottomRightRadius: 15,
    //       backgroundColor:'#189ff2'}
    // }