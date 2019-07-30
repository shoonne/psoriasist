import React from 'react';
import { View, ImageBackground, ScrollView, Dimensions, Image } from 'react-native';
import Header from '../common/Header';
import TextBox from '../common/TextBox';

// let deviceWidth = Dimensions.get('window').width;

const DATA = [
  {
    title: 'Vad är Psoriasis?',
    text: 'Psoriasis är en kronisk sjukdom som oftast ger utslag på huden. Orsaken är en alltför snabb tillväxt av hudceller och en inflammation i huden. Utslagen kan försvinna i långa perioder med hjälp av olika behandlingar. Psoriasis smittar inte.'
  },
  {
    title: 'Olika former av Psoriasis',
    text:'De olika formerna av psoriasis ger lite olika symtom.',
    plackpsoriasis: {
      title: 'Plack-Psoriasis',
      text: 'Den vanligaste formen av psoriasis visar sig som runda, några centimeter stora röda fjällande utslag, så kallade plack. Den kallas därför plack-psoriasis. Utslagen kan sitta var som helst på hela kroppen, men oftast på armbågarna, knäna, nedre delen av ryggen och hårbotten. Plack-psoriasis sitter oftast på båda sidor av kroppen, till exempel på samma ställe på både höger och vänster armbåge. Det är vanligt att utslagen sätter sig i ärr. Nya utslag kan klia särskilt mycket.',
    },
    guttatPsoriasis: {
      title: 'Guttat psoriasis',
      text: 'Guttat psoriasis är vanligast under puberteten. Den visar sig ofta som röda prickar stora som droppar på huden. Denna form bryter ofta ut i samband med halsfluss och det är vanligt att få utslag över stora delar av kroppen. Efter några veckor till månader brukar besvären försvinna, men ibland kan guttat psoriasis övergå i plack-psoriasis.',
    },
    inverPsoriasis: {
      title: 'Invers psoriasis',
      text:'Invers psoriasis ger rodnande utslag med en glansig yta i hudvecken. Vanliga ställen är i ljumskarna, armhålorna, naveln och under brösten. Invers psoriasis fjällar inte.',
    },
    nagelPsoriasis: {
      title:'Nagelpsoriasis',
      text: 'Symtom på nagelpsoriasis är runda gropar i naglarnas ovansidor, och att yttersta delen av naglarna ibland lossnar.',
    },
    pustulosisPalmoplantaris : {
      title: 'Pustulosis palmoplantaris',
      text:'Pustulosis palmoplantaris ger utslag i handflatorna och på fotsulorna. Det börjar ofta med gula varblåsor som sedan blir brunaktiga. De torkar in och det bildas en skorpa som lossnar. Huden i handflatorna och fotsulorna kan bli röd. Det kan klia och kännas ömt, speciellt när nya blåsor kommer.'
    }
  },
  {
    behandling : {
      title: 'Behandling',
      text:'Du behöver ofta regelbunden behandling om du har besvär av din psoriasis. Du kan få någon eller några av dessa behandlingar:',
      treatments:[
        'Bad och mjukgörande kräm.',
        'Receptbelagda krämer och salvor som innehåller kortison med eller utan det D-vitaminliknande ämnet kalcipotriol.',
        'Ljusbehandling.',
        'Läkemedel som innehåller metotrexat', 'acitretin eller apremilast.',
        'Biologiska läkemedel.',
        'Buckybehandling, som även kallas mjukröntgen.',
        'Rehabilitering utomlands.'
      ]
    }
  }
]

class Psoriasis extends React.Component {
  static navigationOptions = {
    title: 'Om Psoriasis',
    headerStyle: {
      backgroundColor: '#ff4b1f',
      color:'white'
    },
  };
    render() {
      return (
        <View>
        <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
        <Header text={'Här kan du läsa fakta om Psoriasis och dess olika former samt hur du kan behandla det själv.'}/>
        <View style={{flex:1 , width: '100%', }}>
        <Image 
        style={{ flex: 1,
                width: '100%',
                height: 350,
                resizeMode: 'contain'}}
        source={{uri: 'https://www.adwdiabetes.com/articles/wp-content/uploads/2016/05/The-Histopathology-of-Psoriasis-Featured-Image.jpg'}}/>
        </View>
        <TextBox header={'Vad är Psoriasis?'} text={DATA[0].text}/>
        <TextBox header={DATA[1].title} text={DATA[1].text}/>
        <TextBox header={DATA[1].plackpsoriasis.title} text={DATA[1].plackpsoriasis.text}/>
        <TextBox header={DATA[1].guttatPsoriasis.title} text={DATA[1].guttatPsoriasis.text}/>
        <TextBox header={DATA[1].inverPsoriasis.title} text={DATA[1].inverPsoriasis.text}/>
        <TextBox header={DATA[1].pustulosisPalmoplantaris.title} text={DATA[1].plackpsoriasis.text}/>
        <TextBox header={DATA[2].behandling.title} text={DATA[2].behandling.text}/>
        {DATA[2].behandling.treatments.map((treatment, i) => {
          return (
            <TextBox key={i} text={'* '+treatment}/>
          )
        })}
        </ScrollView>
        </View>
      );
    }
  }

  export default Psoriasis;


