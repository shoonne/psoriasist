import React from 'react';
import { View, ImageBackground, ScrollView, Dimensions } from 'react-native';
import Header from './../Header';
import TextBox from './../TextBox';

let deviceWidth = Dimensions.get('window').width;

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
        <ImageBackground source={require('./../../../assets/background/cleanred.png')} style={{width: '100%', height: '100%'}}>
        <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
        <Header text={'Här kan du läsa fakta om Psoriasis och dess olika former samt hur du kan behandla det själv.'}/>
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
        </ImageBackground>
        </View>
      );
    }
  }

  export default Psoriasis;


  // <Text style={{fontSize: 40, fontFamily:'raleway-light'}}>Vad är Psoriasis?</Text>
  //       <View style={{flex: 1,backgroundColor:'white', borderRadius: 5,  width: deviceWidth * 0.95, borderWidth: 0.5, borderColor: 'black',  }}>
  //         <Text style={{margin: 20, fontSize: 20, fontFamily:'raleway-light' }}>
  //         Psoriasis är en kronisk sjukdom som oftast ger utslag på huden. Orsaken är en alltför snabb tillväxt av hudceller och en inflammation i huden. Utslagen kan försvinna i långa perioder med hjälp av olika behandlingar. Psoriasis smittar inte.
  //         </Text>
  //         <Text style={{margin: 20, fontSize: 20, fontFamily:'raleway-light'  }}>Psoriasis kommer ofta i så kallade skov. Det innebär perioder med små eller inga besvär och perioder med mer besvär och större utslag.</Text>
  //       </View>

  //       <Text style={{paddingTop:40,fontSize: 40, fontFamily:'raleway-light'}}>Psoriasis i Sverige</Text>
  //       <View style={{flex: 1, marginTop: 10,backgroundColor:'white', borderRadius: 5,  width: deviceWidth * 0.95, borderWidth: 0.5, borderColor: 'black' }}>
  //         <Text style={{margin: 20, fontSize: 18, fontFamily:'raleway-light',  }}>
  //         I Sverige beräknas att cirka 250 000 till 300 000 individer har psoriasis. 
  //         Det gör den till en av våra vanligaste folksjukdomar, en sjukdom som ibland kan innebära ett stort lidande för den enskilde individen. 
  //         </Text>
  //         <Text style={{margin: 20, fontSize: 18, fontFamily:'raleway-light',  }}>Trots att så många har sjukdomen finns ett stort kunskapsglapp både hos gemene man och inom vården. Föråldrade föreställningar tenderar att hänga kvar, exempelvis att det är en form av hudutslag/hudsjukdom eller att den är smittsam.
  //         </Text>
  //         <Text style={{margin: 20, fontSize: 18, fontFamily:'raleway-light',  }}>
  //         För människor med psoriasis innebär det att kroppens immunsystem inte fungerar som det ska göra. En del människor utvecklar ett immunförsvar som reagerar mot och går till angrepp mot den egna vävnaden, reaktionen är att vävnaden inflammeras.
  //         </Text>
  //     </View>