import Carousel from 'react-native-snap-carousel';
import React, {Component} from 'react';
import { View, Image, Dimensions, Linking, TouchableOpacity  } from 'react-native';

let deviceWidth = Dimensions.get('window').width;

const CAROUSELL_DATA = [
    {
        title: 'Vårdguiden',
        subtitle: 'Om Psoriasis',
        illustration: 'https://i.ytimg.com/vi/7ZHlCSGhqJg/maxresdefault.jpg',
        url:'https://www.1177.se/sjukdomar--besvar/hud-har-och-naglar/utslag-och-eksem/psoriasis/'

    },
    {
        title:'Läkemedelsverket',
        subtitle:'Psoriasis och Psoriasisatrit',
        illustration:'https://lakemedelsverket.se/Templates/public/images/share-badge1.jpg',
        url: 'https://lakemedelsverket.se/psoriasis'
    },
    {
        title: 'Psoriasisförbundet',
        subtitle: 'Om Psoriasis',
        resizeMode: true,
        illustration: 'http://resources.mynewsdesk.com/image/upload/t_open_graph_image/jwilvkkevqlmfwyjlffn.jpg',
        url:'https://www.psoriasisforbundet.se/fakta-o-rad/om-psoriasis/'
    }, 
    {
        title: 'netdoktor pro',
        subtitle: 'Psoriasis',
        resizeMode: true,
        illustration: 'http://www.netdoktorpro.se/assets/Uploads/netdoktorpro-share.png',
        url:'https://www.netdoktorpro.se/hud-venereologi/medicinska-oversikter/psoriasis/'
    }, 
    {
        title: 'Doktorn.se',
        subtitle: 'Om Psoriasis',
        resizeMode: true,
        illustration: 'https://doktornpunktcom.files.wordpress.com/2017/09/doktorncom_transparent_logga.png?w=1020&h=233',
        url:'https://www.doktorn.com/artikel/psoriasis-mer-%C3%A4n-en-hudsjukdom',
    },
];

export default class MyCarousel extends Component {



    _handleOpenWithLinking = (url) => {
    Linking.openURL(url);
  }

    _renderItem ({item, index}) {
        return (
            <View style={{backgroundColor:'white'}}>
            <TouchableOpacity onPress={()=> {Linking.openURL(item.url)}}>
                <Image source={{uri: item.illustration}} 
                style={{width: deviceWidth * 0.9, height:200, resizeMode: item.resizeMode ? 'contain' : null}}/>
            </TouchableOpacity>
            </View>
        );
    }


    render () {
        return (
            <Carousel
            autoplay={true}
            loop={true}
            ref={(c) => { this._carousel = c; }}
            data={CAROUSELL_DATA}
            renderItem={this._renderItem}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth * 0.9}
            />
        );
    }
}

