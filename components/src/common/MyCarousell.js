import Carousel from 'react-native-snap-carousel';
import React, {Component} from 'react';
import { View, Image, Dimensions, Linking, TouchableOpacity, Text  } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


let deviceWidth = Dimensions.get('window').width;

const CAROUSELL_DATA = [
    {
        title: 'Vårdguiden',
        description:'Läs om hälsa och sjukdomar och var du kan hitta vård.',
        subtitle: 'Om Psoriasis',
        illustration: 'https://i.ytimg.com/vi/7ZHlCSGhqJg/maxresdefault.jpg',
        url:'https://www.1177.se/sjukdomar--besvar/hud-har-och-naglar/utslag-och-eksem/psoriasis/'

    },
    {
        title:'Läkemedelsverket',
        description:'Läkemedelsverket är en myndighet under regeringen, med uppdrag att främja den svenska folk- och djurhälsan.',
        subtitle:'Psoriasis och Psoriasisatrit',
        illustration:'https://lakemedelsverket.se/Templates/public/images/share-badge1.jpg',
        url: 'https://lakemedelsverket.se/psoriasis'
    },
    {
        title: 'Psoriasisförbundet',
        description:'Här hittar du info om psoriasis baserad på färsk forskning & våra medlemmars berättelser. 300 000 svenskar lever med psoriasis.',
        subtitle: 'Om Psoriasis',
        resizeMode: true,
        illustration: 'http://resources.mynewsdesk.com/image/upload/t_open_graph_image/jwilvkkevqlmfwyjlffn.jpg',
        url:'https://www.psoriasisforbundet.se/fakta-o-rad/om-psoriasis/'
    }, 
    {
        title: 'netdoktor pro',
        description:'NetdoktorPro - medicinskt verktyg för läkare och sjukvårdspersonal. Medicinska översikter, medicinska nyheter, instruktionsfilmer, diagnos och behandlingar.',
        subtitle: 'Psoriasis',
        resizeMode: true,
        illustration: 'http://www.netdoktorpro.se/assets/Uploads/netdoktorpro-share.png',
        url:'https://www.netdoktorpro.se/hud-venereologi/medicinska-oversikter/psoriasis/'
    }, 
    {
        title: 'Doktorn.se',
        description:'DOKTORN.com grundades 1999 av Add Health Media AB (före detta Erlandsson & Bloom AB) med syfte att sprida kunskap och information om medicin, hälsa och välbefinnande till vård och allmänhet.',
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
            <Card
            containerStyle={{backgroundColor:'#2E1F5E', padding: 40, borderRadius: 10}}
            imageProps={{resizeMode: item.resizeMode ? 'contain' : null}}
            title={item.title}
            titleStyle={{color:'white'}}
            image={{uri: item.illustration}}>
            <Text style={{color:'white',marginBottom: 20}}>
                {item.description}
            </Text>
            <Button
            onPress={()=> {Linking.openURL(item.url)}}
                icon={<Icon name='link' color='#ffffff' />}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title=' Besök hemsida' />
            </Card>

            // <View style={{backgroundColor:'white', padding: 20, width: deviceWidth}}>
            // <TouchableOpacity onPress={()=> {Linking.openURL(item.url)}}>
            //     <Image source={{uri: item.illustration}} 
            //     style={{width: deviceWidth * 0.9, height:200, resizeMode: item.resizeMode ? 'contain' : null}}/>
            // </TouchableOpacity>
            // </View>
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

