
// Link: https://www.codementor.io/foysalit/building-a-camera-app-with-react-native-r8up5685v
import React from 'react';
import { View, Text, AsyncStorage , Button, Image, ScrollView} from 'react-native';
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'

import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';



export default class CameraPage extends React.Component {
    static navigationOptions = {
        headerTintColor: 'black',
        title: 'Läkarbesök',
        headerStyle: {
          //backgroundColor: '#EF2D56' ,
        },
        // headerBackground: (
        //   <LinearGradient
        //     colors={["#B14AED", "#BD1AD1"]}
        //     style={{ flex: 1 }}
        //     start={{ x: 0, y: 0 }}
        //     end={{ x: 1, y: 0 }}
        //   />
        // ),
        headerTitleStyle: {
          color:'black',
        },
      };

    camera = null;
    constructor(props) {
      super(props)
    
      this.state = {
        captures: [],
        // setting flash to be turned off by default
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        // start the back camera by default
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
      };

      this.renderImages = this.renderImages.bind(this);
    };


    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    clearAsyncStorage = async() => {
        AsyncStorage.clear();
    }

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        //console.log(photoData.uri)

        this.setState( 
            prevState => {
                let {captures, } = prevState;

                return {
                    captures: captures.concat({key: captures.length, imageUri: photoData.uri}),
                    capturing: false
                };
            },
            () => Notes.save(this.state.captures)
        );
        // this.setState({ capturing: false, captures: [photoData.uri, ...this.state.captures]}, () => Notes.save(this.state.captures))
        
    };

    storeImageAsync = async (uri) => {
        
        try {
          await AsyncStorage.setItem("CAPTURES", Notes.convertToStringWithSeparators(this.state.captures));
        //   console.log(AsyncStorage.)
        } catch (error) {
            console.log(error)
          // Error saving data
        }
      };



    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ 
            capturing: false, captures: [videoData, ...this.state.captures]
        });
    };


    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
        Notes.all(captures => this.setState({captures: captures}))

    };

    renderImages(captures) {
        captures.map((cap, i) => {
            return (<Text style={{fontSize: 50, color:'black'}}>hej</Text>)
        })
    }

    

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;
        //console.log(this.state.captures)

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            
            <React.Fragment>
            {/* <View>
                <Text>hej</Text>
                {this.state.captures.map((capture, i) => (
                    <View key={i}>
                        <Text>BILD NR {i}</Text>
                        <Image source={{uri: capture.imageUri}} style={{width: 100, height:100}} />
                    </View>
                ))}

            </View> */}

                {/* <Button title="delete" onPress={this.clearAsyncStorage}>
                <Text>Clear Async Storage</Text>
                </Button> */}
      
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>
                {captures.length > 0 && <Gallery captures={captures}/>}

                    <Toolbar 
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onLongCapture={this.handleLongCapture}
                    onShortCapture={this.handleShortCapture}
                />

                <View>
                <ScrollView horizontal>
                <Text>hej</Text>
                                {this.state.captures.map((capture, i) => (
                                    <View key={i}>
                                        <Text>BILD NR {i}</Text>
                                        <Image source={{uri: capture.imageUri}} style={{width: 100, height:100}} />
                                    </View>
                                ))}
                </ScrollView>
                                

                </View>
            </React.Fragment>
        );
    };
};

let Notes = {
    convertToArrayOfObject(captures, callback) {
      return callback(
        captures ? captures.split("||").map((capture, i) => ({ key: i, imageUri: capture })) : []
      );
    },

    convertToStringWithSeparators(captures) {
      return captures.map(capture => capture.imageUri).join("||");
    },
    all(callback) {
      return AsyncStorage.getItem("CAPTURES", (err, captures) =>
        this.convertToArrayOfObject(captures, callback)
      );
    },

    save(captures) {
        AsyncStorage.setItem("CAPTURES", this.convertToStringWithSeparators(captures));
    }
  };