import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearGradient, Font } from 'expo';
import { Text, View, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';

import LanguageComponent from './LanguageComponent'

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

    static navigationOptions = {
      header: null
    }

    render() {
        let iconSize = 0.35*SCREEN_HEIGHT
        let iconMargin = 0.025*SCREEN_HEIGHT
        let titleSize = 0.05*SCREEN_HEIGHT
        let subtitleSize = 0.04*SCREEN_HEIGHT
        let textSize = 0.035*SCREEN_HEIGHT
        let textMargin = 0.02*SCREEN_HEIGHT
        return (
          <TouchableHighlight onPress={() => this.props.navigation.navigate('CatList')}>
            <View style={styles.container}>
                <Image source={require('../assets/logo.png')} style={{height: iconSize, width: iconSize, marginBottom: iconMargin}} />
                {this.state.fontLoaded && <Text style={[styles.text, {fontSize: titleSize, fontWeight: '400'}]}>Brightside Homes</Text>}
                {this.state.fontLoaded && <Text style={[styles.text, {fontSize: textSize, marginTop: textMargin}]}>Tap to Start</Text>}
                <LanguageComponent />
            </View>
          </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4B306A',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#eee',
    fontFamily: 'work-sans-reg',
    textAlign:'center'
  }
});

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');