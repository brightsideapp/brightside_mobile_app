import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearGradient, Font } from 'expo';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

export default class ResultComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loadExtra: false,
          fontLoaded:false,
        }
        this.expand = this.expand.bind(this)
    }

    async componentDidMount() {
        await Font.loadAsync({
          'work-sans-reg': require('../assets/WorkSans/WorkSans-Regular.ttf'),
        });
        this.setState({fontLoaded:true})
    }

    expand() {
      this.state.loadExtra ? this.setState({loadExtra: false}) : this.setState({loadExtra: true})
    }

    render() {
        let contWidth = 0.8*SCREEN_WIDTH
        return (
            <TouchableOpacity style={[resultStyles.container, {width: contWidth}]} onPress={this.expand}>
                <View>
                <Text style={resultStyles.titleText}>{this.props.data.organization}</Text>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.infoText}>Address:</Text>
                  <Text style={resultStyles.infoText}>Phone:</Text>
                </View>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.text}>{this.props.data.location}</Text>
                  <Text style={resultStyles.text}>{this.props.data.contact}</Text>
                </View>
                {this.state.loadExtra && <View>
                <Text style={[resultStyles.titleText, {fontSize: 20}]}>Hours:</Text>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.text}>{this.props.data.hours}</Text>
                </View>
                </View> }
                </View>
            </TouchableOpacity>
        )
    }
}

const resultStyles = StyleSheet.create({
  container: {
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom:20
  },
  line: {
    flexDirection: 'row'
  },
  titleText: {
    color: '#4B306A',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'work-sans-reg',
  },
  infoText: {
    color: '#4B306A',
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    fontFamily: 'work-sans-reg',
  },
  text: {
    color: '#222',
    fontSize: 20,
    flex: 1,
    fontFamily: 'work-sans-reg',
  }
});

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');