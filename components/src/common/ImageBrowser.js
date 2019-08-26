import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions, Modal, Text} from 'react-native';

export default class ImageBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false,
        modalImageUri: 'http://via.placeholder.com/640x360'
    };

    this.setModalVisible = this.setModalVisible.bind(this);
  }
  setModalVisible(visible, uri) {
    this.setState({ modalVisible: visible , modalImageUri: uri});
  }

  render() {

    let images = this.props.images.map((image, i) => {
      //console.log(image.imageUri)
        return (
        <TouchableOpacity onPress={() => this.setModalVisible(true, image.imageUri)} key={i}>
        <View style={styles.imageWrap}>
            <Image style={{flex: 1, width: null, alignSelf: 'stretch'}} source={{uri: image.imageUri}}/>
        </View>
        </TouchableOpacity>
        )
    })
    return (
      <View style={styles.container}>
      <Modal style={styles.modal} 
      animationType={"fade"} 
      transparent={true} 
      visible={this.state.modalVisible}>
      <View style={styles.modal}>
      <Text style={styles.text} onPress={() => {this.setModalVisible(!this.state.modalVisible, this.state.modalImageUri)}}>
          CLOSE MODAL
      </Text>
      <Image style={{flex: 1, width: null, alignSelf: 'stretch'}} source={{uri: this.state.modalImageUri}}/>
      </View>

      </Modal>
      {images}
      </View>
    );
  }
}

const styles = {
    container : {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#eee',
        paddingTop: 50,
    },
    imageWrap: {
        margin: 2,
        padding: 2,
        width: (Dimensions.get('window').width / 2) - 4,
        height:(Dimensions.get('window').height / 3) - 12,
        backgroundColor:"#fff"
    },
    modal: {
        flex:1,
        padding: 40,
        backgroundColor:'rgba(0,0,0,0.9)'
    },
    text: {
        color:'white'
    }
}
