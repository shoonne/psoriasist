import React from 'react';
import { ScrollView,View } from 'react-native';
import Input from './../common/Input';

export default class DoctorNotesTest extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
      };
    };
    

    render(){
        return (
        <View>
            <View style={styles.inputContainer}>
                <Input/>
            </View>

            <View style={styles.list}>
            <ScrollView contentContainerStyle={styles.scrollableList}>
                {/* {Object.values(allItems)
                .reverse()
                .map(item => (
                    <List
                    key={item.id}
                    {...item}
                    deleteItem={this.deleteItem}
                    completeItem={this.completeItem}
                    incompleteItem={this.incompleteItem}
                    />
                ))} */}
            </ScrollView>
            </View>
        </View>

        )
    }
}

const styles = {
inputContainer: {
    marginTop: 40,
    paddingLeft: 15
    },
    list: {
        flex: 1,
        marginTop: 70,
        paddingLeft: 15,
        marginBottom: 10
      },
      scrollableList: {
        marginTop: 15
      },
}