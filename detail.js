import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity,TouchableHighlight, View, Text} from 'react-native';


export default class detail extends React.Component {
    render() {
        console.log(this);
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={
                    // this._pressBack
                    ()=>{
                        const {navigator} = this.props;
                        if(navigator){
                            navigator.pop();
                        }
                    }
                }>

                    <Text style={styles.text}>详情</Text>
                </TouchableHighlight>
            </View>

        )
    }
    _pressBack(){
        console.log(this);
        /*const {navigator} = this.props;
        if(navigator){
            navigator.pop();
        }*/
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black'
    },
    text: {

        fontSize: 20,
        backgroundColor: '#7777ff'
    }
})
