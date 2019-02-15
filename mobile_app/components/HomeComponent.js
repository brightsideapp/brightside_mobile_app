import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';

export default class HomeComponent extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
          <TouchableHighlight onPress={() => this.props.navigation.navigate('ResList')}>
            <View style={homeStyles.container}>
                <Image source={require('../assets/logo.png')} style={homeStyles.logo} />
                <Text style={[homeStyles.text, {fontSize: 28}]}>Brightside Community Homes</Text>
                <Text style={[homeStyles.text, {fontSize: 20}]}>Mobile App</Text>
                <Text style={[homeStyles.text, {fontSize: 16, marginTop: 20}]}>Tap to Start</Text>
            </View>
          </TouchableHighlight>
        )
    }
}

const homeStyles = StyleSheet.create({
  container: {
    backgroundColor: '#4B306A',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  text: {
    color: '#eee'
  }
});

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');