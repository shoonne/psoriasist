
// Link: https://www.codementor.io/foysalit/building-a-camera-app-with-react-native-r8up5685v
import React from 'react';
import { 
    Modal,
    View, 
    Text, 
    AsyncStorage,
    TouchableHighlight,
    Dimensions } from 'react-native';
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import { Icon } from 'react-native-elements'

import styles from './styles';
import Toolbar from './toolbar.component';
import CameraCarousell from '../src/common/CameraCarousell';
import ImageBrowser from './ImageBrowser';
import { ScrollView } from 'react-native-gesture-handler';



let deviceHeight = Dimensions.get('window').height;
let devicewidth = Dimensions.get('window').width;



// TODO: CREATE STYLING FOR CAMERA AND LOOK FOR WAYS TO DISPLAY IMAGES 
export default class CameraPage extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: 'white',
        title: 'Kamera',
        headerStyle: {
        backgroundColor: '#ef2d56' ,
        },
        headerTitleStyle: {
          color:'white',
        },
        }
        }
        
      

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
        modalVisible: false,

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

    // DELETE ALL DATA IN ASYNCSTORAGE
    clearAsyncStorage = async() => {
        AsyncStorage.clear();
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
      }

    // IMAGE CAPTURE
    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        //console.log(photoData.uri)
        this.setState( 
            prevState => {
                let {captures} = prevState;

                return {
                    captures: captures.concat({key: captures.length, imageUri: photoData.uri}),
                    capturing: false
                };
            },
            () => Notes.save(this.state.captures)
        );        
    };


    // VIDEO CAPTURE
    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ 
            capturing: false, captures: [videoData, ...this.state.captures]
        });
    };


    // WHEN THE COMPONENT MOUNTS 
    // REFETCH ALL IMAGES FROM ASYNC STORAGE AND CHECK PERMISSIONS
    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
        Notes.all(captures => this.setState({captures: captures.reverse()}))

        this.props.navigation.setParams({ clearAsync: this.clearAsyncStorage });


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
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>
                
                <Toolbar 
                    openGallery={() => this.setModalVisible(true)}
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
                <View style={{marginTop: deviceHeight * 0.6, paddingTop:10,}}>
                {/* <Button title="Clear Async Storage" onPress={this.clearAsyncStorage}>
                    <Text>Clear Async Storage</Text>
                </Button> */}
                    <CameraCarousell data={this.state.captures.reverse()}/>
                </View>


                {/* MODAL */}
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                    <ScrollView>
                    <ImageBrowser images={this.state.captures}/>
                    </ScrollView>

                    <TouchableHighlight
                        onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View style={{width: devicewidth, height: 100, justifyContent:'center', alignItems:'center', backgroundColor:"#ef2d56"}}>
                        <Text style={{color:'white'}}>STÄNG</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                </Modal>

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