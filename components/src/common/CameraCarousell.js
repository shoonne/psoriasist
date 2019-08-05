
import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
let deviceWidth = Dimensions.get('window').width;

export default class CameraCarousell extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _renderItem ({item, index}) {
    return (
        <View style={{marginRight: 10}} key={index}>
            <Image source={{uri: item.imageUri}} style={{width: 200, height: 200, paddingRight:10}} />
        </View>
    );
}


  render() {
    return (
      <View>
            <Carousel
            loop={false}
            ref={(c) => { this._carousel = c; }}
            data={this.props.data}
            renderItem={this._renderItem}
            sliderWidth={deviceWidth}
            itemWidth={200}
            />
      </View>
    );
  }
}
