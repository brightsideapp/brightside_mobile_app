import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearGradient, Font } from 'expo';
import { Text, View, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';

export default class HomeComponent extends Component {

    constructor() {
        super();
        this.state = {
          fontLoaded:false,
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
          'work-sans-reg': require('../assets/WorkSans/WorkSans-Regular.ttf'),
        });
        this.setState({fontLoaded:true})
    }

    render() {
        return (
          <TouchableHighlight onPress={() => this.props.navigation.navigate('ResList')}>
            <View style={homeStyles.container}>
                <Image source={require('../assets/logo.png')} style={homeStyles.logo} />
                {this.state.fontLoaded && <Text style={[homeStyles.text, {fontSize: 28}]}>Brightside Community Homes</Text>}
                {this.state.fontLoaded && <Text style={[homeStyles.text, {fontSize: 20}]}>Mobile App</Text>}
                {this.state.fontLoaded && <Text style={[homeStyles.text, {fontSize: 16, marginTop: 20}]}>Tap to Start</Text>}
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
    color: '#eee',
    fontFamily: 'work-sans-reg',
  }
});

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');