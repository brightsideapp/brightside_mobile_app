import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearGradient, Font } from 'expo';
import { Text, View, Image, StyleSheet, Dimensions, TouchableHighlight, Switch } from 'react-native';

export default class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          fontLoaded:false,
          animations: this.props.animations,
        }
    }

    static defaultProps = {
        animations: true
    };

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
        let textSize = 0.03*SCREEN_HEIGHT
        let textMargin = 0.02*SCREEN_HEIGHT
        let switchMargin = 0.01*SCREEN_WIDTH
        let toggle = this.state.animations ? "On" : "Off"
        let switchColor = this.state.animations ? "#E10E49" : "#EEEEEE"
        return (
          <TouchableHighlight onPress={() => this.props.navigation.navigate('CatList', {
            animations: this.state.animations
          })}>
            <View style={styles.container}>
                <View style={[styles.switchContainer, {marginRight: switchMargin}]}>
                  {this.state.fontLoaded && <Text style={[styles.text, {fontSize: textSize, marginRight: switchMargin}]}>Accessibility {toggle}</Text>}
                  <Switch 
                  value={this.state.animations}
                  onValueChange={(value)=>this.setState({animations: value})}
                  thumbColor={switchColor}
                  trackColor={{true: '#6D0724'}}
                  />
                </View>
                <Image source={require('../assets/logo.png')} style={{height: iconSize, width: iconSize, marginBottom: iconMargin}} />
                {this.state.fontLoaded && <Text style={[styles.text, {fontSize: titleSize, fontWeight: '400'}]}>Brightside Homes</Text>}
                {this.state.fontLoaded && <Text style={[styles.text, {fontSize: subtitleSize, marginTop: textMargin}]}>Tap to Start</Text>}
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
  switchContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    flexDirection: 'row'
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