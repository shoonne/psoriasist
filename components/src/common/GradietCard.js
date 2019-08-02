
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ListItem} from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale

let deviceWidth = Dimensions.get('window').width;
export default class GradietCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{marginBottom: 10}}>
      <ListItem
        key={this.props.key}
        containerStyle={{height: 150, width: deviceWidth}}
        onLongPress={this.props.onLongPress}
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={{
            colors: ['#EF2D56', '#F44336'],
            start: [1, 0],
            end: [0.2, 0],
        }}
        //ViewComponent={LinearGradient} // Only if no expo
        // leftAvatar={{ rounded: true, source: { uri: avatar_url } }}
        titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}
        subtitleStyle={{ color: 'white' }}
        subtitle={this.props.text}
        chevronColor="white"
        chevron/>
      </View>
    );
  }
}
