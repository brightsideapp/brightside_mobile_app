import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearGradient, Font } from 'expo';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class ResultComponent extends Component {

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
        let schedule = []
        weekday.forEach((day)=>{
          schedule.push(
            <View style={resultStyles.line} key={day}>
              <Text style={resultStyles.text}>{`${day}: `}</Text>
              <Text style={resultStyles.text}>{`${this.props.data.schedule[day]}`}</Text>
            </View>
          )
        })
        return (
            <TouchableOpacity style={[resultStyles.container, {width: contWidth}]} onPress={this.expand}>
                <View>
                <View style={[resultStyles.line]}>
                  <View style={resultStyles.buttonStyle}>
                  <Button
                  onPress={()=>this.props.navigation.navigate('MapScreen', {data: this.props.data})}
                  color='#4B306A'
                  title='MAP'
                  />
                  </View>
                  <Text style={resultStyles.titleText}>{this.props.data.organization}</Text>
                </View>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.infoText}>Address:</Text>
                  <Text style={resultStyles.infoText}>Phone:</Text>
                </View>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.text}>{this.props.data.location}</Text>
                  <Text style={resultStyles.text}>{this.props.data.phoneNumber}</Text>
                </View>
                {this.state.loadExtra && <View>
                <Text style={[resultStyles.titleText, {fontSize: 20}]}>Hours:</Text>
                  {schedule}
                </View> }
                </View>
            </TouchableOpacity>
        )
    }
}

export default withNavigation(ResultComponent)

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
  buttonStyle: {
    marginRight: 20
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

const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']