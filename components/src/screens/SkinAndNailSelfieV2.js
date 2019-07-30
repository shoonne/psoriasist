import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, Dimensions, Image, Button} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class SkinAndNailSelfieV2 extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        imageUri: null,
        isLoaded: false,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
      };

      AsyncStorage.getItem("imageUri").then(response => {
        this.setState({
          isLoaded: true,
          imageUri: response
        });
        // console.log(response)
      });
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
      }

    takePicture = async () => {
        try {
        const imageData = await this.camera.takePictureAsync({
            fixOrientation: true
        });
        this.setState({
            imageUri: imageData.uri
        });
        this._saveImageAsync();
        } catch (err) {
        console.log("err: ", err);
        }
    };

    _saveImageAsync = async () => {
        await AsyncStorage.setItem("imageUri", this.state.imageUri);
        this.props.navigation.navigate("GalleryView");
    };
    
    renderImage() {
        return (
          <View>
            <Image source={{ uri: this.state.imageUri }} style={styles.preview} />
          </View>
        );
      }
      render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
            <View style={{ flex: 0.5}}>
                <Camera 
                ref={cam => {this.camera = cam;}}  
                style={{flex: 1}} type={this.state.type}>
                </Camera>
                <View style={styles.container}>
                  {this.state.isLoaded ? this.renderImage() : <Text>No image</Text>}
                </View>
                <View>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.takePictureBtn}>
                        <Text style={styles.takePictureBtnText}>TAKE PICTURE</Text>
                    </TouchableOpacity>
                </View>
            </View>
          );
        }
      }
    
}

const styles = {
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000"
      },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width
      },
    takePictureBtn: {
        alignItems: 'center', justifyContent:'center', paddingTop: 50
    },
    takePictureBtnText: {
        fontSize: 18, marginBottom: 10, color: 'black'
    }
}