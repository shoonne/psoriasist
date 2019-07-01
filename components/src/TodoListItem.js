import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import PropTypes from 'prop-types';


const {height, width} = Dimensions.get('window');

class TodoListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            // isCompleted: false,
            todoValue: props.textValue
        }
    }

    static protTypes = {
        textValue : PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequireds
      };
    


    toggleItem = () => {
        this.setState(prevstate =>  {
            return {
                isCompleted: !prevstate.isCompleted
            }
        });
    };

    startEditing = () => {
        this.setState({
            isEditing: true,
        });
    };

    finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };

    controllInput = textValue => {
        this.setState({ todoValue: textValue});
    };

    render(){

        const { textValue, id, deleteTodo } = this.props;
        const {isCompleted, isEditing, todoValue} = this.state;

        

        return(
            <View style={styles.container}>
            <View style={styles.rowContainer}>
            <TouchableOpacity onPress={this.toggleItem}>
            <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.incompleteCircle]}>
     
            </View>
          </TouchableOpacity>
          
          { 
            isEditing ? (
            <TextInput
            value={todoValue}
            style={[styles.text, styles.input, isCompleted ? styles.strikeText : styles.unstrikeText]}
            multiline={true}
            returnKeyType={'done'}
            onBlur={this.finishEditing}
            onChangeText={this.controllInput} 
            />
            ) : 
            (
            <Text style={[
                styles.text,
                isCompleted ? styles.strikeText : styles.unstrikeText
            ]}>
                {textValue}
            </Text>
            )
          }
            </View>
            {isEditing ? (
              <View style={styles.buttons}>
              <TouchableOpacity onPressOut={this.finishEditing}>
                <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>✅</Text>
                </View>
              </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttons}>
              <TouchableOpacity onPressOut={this.startEditing}>
                <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>✏</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={() => deleteTodo(id)}>
                <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>❌</Text>
                </View>
              </TouchableOpacity>
              </View>
            )}
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }, 
    rowContainer: {
        flexDirection:'row',
        width: width / 2,
        alignItems: 'center',
        // justifyContent:'space-between'
    },
    buttons:{
        flexDirection:'row',
    },
    buttonContainer:{
        marginVertical: 10,
        marginHorizontal: 10,
    },
    text: {
        fontWeight:'500',
        fontSize: 18,
        marginVertical: 20,
    },
    strikeText: {
        color:'#bbb',
        textDecorationLine: 'line-through',
    },
    unstrikeText: {
        color:'#29323c'
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 3,
        marginRight: 20,
    },
    completedCircle: {
        borderColor:'#bbb',
    },
    incompletedCircle: {
        borderColor:'#DA4453'
    },
    input: {
        marginVertical: 15,
        width: width / 2,
        paddingBottom: 5,
    }
})

export default TodoListItem;