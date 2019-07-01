import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Image
} from "react-native";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { RNS3 } from "react-native-aws3";

export default class App extends React.Component {
    static navigationOptions = {
    title: 'Hud och nagel bilder',
    headerStyle: {
      backgroundColor: '#EC368D',
      color:'white'
    },
  };
  state = {
    switchValue: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    imageuri: "",
    url: ""
  };

  save(descriptions) {
    try {
      AsyncStorage.setItem("DESCRIPTIONS", this.convertToStringWithSeparators(descriptions));
    } catch (error) {
      alert('AsyncStorage error: ' + error.message);
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  cameraChange = () => {
    this.setState({
      imageuri: "",
      url: "",
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      if (photo) {
        this.setState({ imageuri: photo.uri });
      }
    }
  };

  // upload = () => {
  //   const file = {
  //     uri: this.state.imageuri,
  //     name: `${new Date().getTime()}.jpg`,
  //     type: "image/jpeg"
  //   };
  //   const options = {
  //     keyPrefix: "ts/",
  //     bucket: "..name..",
  //     region: "eu-west-1",
  //     accessKey: "..acesskey..",
  //     secretKey: "..secretkey..",
  //     successActionStatus: 201
  //   };
  //   return RNS3.put(file, options)
  //     .then(response => {
  //       if (response.status !== 201)
  //         throw new Error("Failed to upload image to S3");
  //       else {
  //         console.log(
  //           "Successfully uploaded image to s3. s3 bucket url: ",
  //           response.body.postResponse.location
  //         );
  //         this.setState({
  //           url: response.body.postResponse.location,
  //           switchValue: false
  //         });
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <View>
          <Text>No access to camera</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.switchview}>
            <Text>Show camera</Text>
            <Switch
              onValueChange={value => {
                this.setState({ switchValue: value });
              }}
              value={this.state.switchValue}
              style={styles.switch}
            />
          </View>
          {this.state.switchValue ? (
            <View style={styles.cameraview}>
              {this.state.imageuri != "" ? (
                <Image
                  source={{
                    uri: this.state.imageuri
                  }}
                  style={styles.uploadedImage}
                  resizeMode="contain"
                />
              ) : (
                <Camera
                  style={styles.camera}
                  type={this.state.type}
                  ref={ref => {
                    this.camera = ref;
                  }}
                >
                  <View style={styles.camerabuttonview}>
                    <TouchableOpacity
                      style={styles.cameraButtons}
                      onPress={this.cameraChange}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          marginBottom: 10,
                          color: "white"
                        }}
                      >
                        Flip
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
              )}
            </View>
          ) : (
            <View style={styles.cameraview}>
              {this.state.url != "" ? (
                <Text>Uploaded url : {this.state.url}</Text>
              ) : null}
              <Text>Camera off</Text>
            </View>
          )}
          {this.state.switchValue ? (
            <View style={styles.buttonsView}>
              {this.state.imageuri == "" ? (
                <View style={styles.captureButtonView}>
                  <TouchableOpacity
                    style={styles.cameraButtons}
                    onPress={this.snap}
                  >
                    <Text
                      style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                    >
                      Capture
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={styles.captureButtonView}>
                <TouchableOpacity
                  style={styles.cameraButtons}
                  onPress={this.upload}
                >
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                  >
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EC368D",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  switchview: {
    marginTop: 50,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 5
  },
  switch: {
    padding: 5
  },
  cameraview: {
    height: 400,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  camera: {
    height: "95%",
    width: "95%",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  camerabuttonview: {
    height: "100%",
    backgroundColor: "transparent"
  },
  cameraButtons: {
    borderColor: "#fff",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    margin: 5
  },
  captureButtonView: {
    height: 200
  },
  buttonsView: {
    height: 200,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  },
  uploadedImage: {
    height: "90%",
    width: "90%",
    padding: 10
  }
});



// import React from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';
// import * as Permissions from 'expo-permissions';
// import { Camera } from 'expo-camera';
// import { RNS3 } from 'react-native-aws3';

// const options = {
//   keyPrefix: "uploads/",
//   bucket: "your-bucket",
//   region: "us-east-1",
//   accessKey: "your-access-key",
//   secretKey: "your-secret-key",
//   successActionStatus: 201
// }

// const file = {
//   // uri can also be a file system path (i.e. file://)
//   uri: "assets-library://asset/asset.PNG?id=655DBE66-8008-459C-9358-914E1FB532DD&ext=PNG",
//   name: "image.png",
//   type: "image/png"
// }


// export default class SkinAndNailSelfie extends React.Component {

//   static navigationOptions = {
//     title: 'Hud och nagel bilder',
//     headerStyle: {
//       backgroundColor: '#EC368D',
//       color:'white'
//     },
//   };

//   state = {
//     hasCameraPermission: null, //Permission value
//     type: Camera.Constants.Type.back, //specifying app start with back camera.
//   };

//   async componentWillMount() {
//     //Getting Permission result from app details.
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ hasCameraPermission: status === 'granted' });
//   }

//   snap = async () => {
//     if (this.camera) {
//       let photo = await this.camera.takePictureAsync();
//       console.log(photo)
//     }
//   };

//   render() {
//     const { hasCameraPermission } = this.state;
//     if (hasCameraPermission === null) {
//       return <View />;
//     } else if (hasCameraPermission === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       return (
//         <View style={{ flex: 1 }}>
//           <Camera 
//             ref={ref => {
//             this.camera = ref;
//           }}
//           style={{ flex: 1 }} type={this.state.type}>
//           </Camera>

//           <View style={{height: 150,width:'100%', backgroundColor:'#EC368D'}}>
//                 <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}
//                 //onPress={this.snap.bind(this)}
//                 >
//                 <View style={{
//                   marginTop: 20,
//                   padding: 20,
//                   justifyContent:'center', 
//                   alignItems:'center', 
//                   borderColor:'white', 
//                   borderWidth:0.6, 
//                   width:'50%'}}>
//                 <Text style={{fontSize: 18, color: 'white', textAlign:'center',}}>Ta bild</Text>
//                 </View>
//                 </TouchableOpacity>
//           </View>
//         </View>
//       );
//     }
//   }
// }







// switch camera

  {/* <View
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
    }}>
    <TouchableOpacity
      style={{
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      }}
      onPress={() => {
        this.setState({
          type:
            this.state.type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back,
        });
      }}>

      <Text style={{ fontSize: 18, marginBottom: 10, color: 'white', textAlign:'center' }}> Flip </Text>
    </TouchableOpacity>
  </View> */}








// import React from 'react';
// import {View, ScrollView, ImageBackground, Dimensions} from 'react-native';
// import Header from './../Header';

// let deviceHeight = Dimensions.get('window').height;

// class SkinAndNailSelfie extends React.Component {
//   static navigationOptions = {
//     title: 'Hud och nagel bilder',
//     headerStyle: {
//       backgroundColor: '#EC368D',
//       color:'white'
//     },
//   };
//     render() {
//       return (
//         <View >
//         <ImageBackground source={require('./../../../assets/background/clearpink.png')} style={{width: '100%', height: '100%'}}>
//         <ScrollView  contentContainerStyle={{flexGrow:1, height: deviceHeight + 100, }}>
//         <Header color={'blue'} text={'Det kan vara bra att dokumentera hudförändringar som du kan visa för läkaren. På så sätt kan du få en bättre bedöming'}/>

//         </ScrollView>
//         </ImageBackground>
//         </View>
//       );
//     }
//   }

//   export default SkinAndNailSelfie