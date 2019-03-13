import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Font } from 'expo';
import { Text, View, Alert, Button, Picker, StyleSheet, Dimensions } from 'react-native';

export default class LanguageComponent extends Component {

    constructor() {
        super();
        this.state = {
            fontLoaded:false,
            language: "en"
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
          'work-sans-reg': require('../assets/WorkSans/WorkSans-Regular.ttf'),
        });
        this.setState({fontLoaded:true})
    }


    render() {
        let textSize = 0.02*SCREEN_HEIGHT
        return (
            <View style={{marginTop: 20}}>
                {this.state.fontLoaded && <Text style={[styles.text, {fontSize: textSize}]}>Select your preferred language:</Text>}
                {this.state.fontLoaded && <Picker
                  selectedValue={this.state.language}
                  style={{height: 50, width: 300}}
                  itemStyle={{fontSize: textSize}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({language: itemValue})
                  }>
                  <Picker.Item label="English" value="en" />
                  <Picker.Item label="Mandarin" value="cn" />
                  <Picker.Item label="Russian" value="rs" />
                </Picker>}
            </View>
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
    fontFamily: 'work-sans-reg'
    }
});

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');