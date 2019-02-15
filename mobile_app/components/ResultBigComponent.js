import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';

export default class ResultBigComponent extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <View style={resultStyles.container}>
                <Text style={resultStyles.titleText}>Gordon Neighboorhood House</Text>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.infoText}>Address:</Text>
                  <Text style={resultStyles.infoText}>Phone:</Text>
                </View>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.text}>123 Haha St.</Text>
                  <Text style={resultStyles.text}>604-604-6040</Text>
                </View>
                <Text style={[resultStyles.titleText, {fontSize: 20}]}>Hours:</Text>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.text}>Sunday:</Text>
                  <Text style={resultStyles.text}>8:00AM - 5:00PM</Text>
                </View>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.text}>Monday:</Text>
                  <Text style={resultStyles.text}>8:00AM - 5:00PM</Text>
                </View>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.text}>Tuesday:</Text>
                  <Text style={resultStyles.text}>8:00AM - 5:00PM</Text>
                </View>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.text}>Wednesday:</Text>
                  <Text style={resultStyles.text}>8:00AM - 5:00PM</Text>
                </View>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.text}>Thursday:</Text>
                  <Text style={resultStyles.text}>8:00AM - 5:00PM</Text>
                </View>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.text}>Friday:</Text>
                  <Text style={resultStyles.text}>8:00AM - 5:00PM</Text>
                </View>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.text}>Saturday:</Text>
                  <Text style={resultStyles.text}>8:00AM - 5:00PM</Text>
                </View>
            </View>
        )
    }
}

const resultStyles = StyleSheet.create({
  container: {
    backgroundColor: '#c4c4c4',
    width: '90%',
    borderRadius: 10,
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  line: {
    flexDirection: 'row'
  },
  titleText: {
    color: '#4B306A',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#4B306A',
    fontSize: 20,
    fontWeight: '700',
    flex: 1
  },
  text: {
    color: '#222',
    fontSize: 20,
    flex: 1
  }
});

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');