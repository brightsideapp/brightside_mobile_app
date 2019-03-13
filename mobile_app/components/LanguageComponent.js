import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Font } from 'expo';
import { Text, View, Alert, Button, Picker, StyleSheet, Dimensions } from 'react-native';

export default class DummyComponent extends Component {

    constructor() {
        super();
        this.state = {
            fontLoaded:false,
            language: "en"
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
          'work-sans-medium': require('../assets/WorkSans/WorkSans-Medium.ttf'),
        });
        this.setState({fontLoaded:true})
    }


    render() {
        return (
            <View>
                {this.state.fontLoaded && <Text style={styles.text}>Select your preferred language:</Text>}
                <Picker
                  selectedValue={this.state.language}
                  style={{height: 50, width: 150}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({language: itemValue})
                  }>
                  <Picker.Item label="English" value="en" />
                  <Picker.Item label="Mandarin" value="cn" />
                  <Picker.Item label="Russian" value="rs" />
                </Picker>
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
    fontFamily: 'work-sans-medium'
    }
});

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');