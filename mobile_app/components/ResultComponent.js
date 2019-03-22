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
            <TouchableOpacity style={[resultStyles.container, {width: contWidth}]} onPress={()=>{
              this.expand()
              this.props.timerCallback()
            }}>
                <View>
                <View style={resultStyles.titleLine}>
                  <Text style={resultStyles.titleText}>{this.props.data.organization}</Text>
                  {this.props.data.location != "Phone Only" && <TouchableOpacity
                    style={resultStyles.buttonStyle}
                    onPress={()=>this.props.navigation.navigate('MapScreen', {
                      address: this.props.data.location,
                      organization: this.props.data.organization
                  })}>
                    <Image style={resultStyles.mapButton}
                    source={{uri:"http://35.166.255.157/icon/map_button.png"}} />
                  </TouchableOpacity>}
                </View>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.infoText}>Address:</Text>
                  <Text style={[resultStyles.infoText,{paddingLeft:20}]}>Phone:</Text>
                </View>
                <View style={resultStyles.line}>
                  <Text style={resultStyles.text}>{this.props.data.location}</Text>
                  <Text style={[resultStyles.text,{paddingLeft:20}]}>{this.props.data.phoneNumber}</Text>
                </View>
                <Text style={resultStyles.infoText}>Perks:</Text>
                <Text style={resultStyles.text}>{this.props.data.perk.join(", ")}</Text>
                {this.state.loadExtra && 
                <View>
                  <Text style={resultStyles.infoText}>Description:</Text>
                  <Text style={resultStyles.text}>{this.props.data.description}</Text>
                  <Text style={[resultStyles.titleText, {fontSize: 20}]}>Hours:</Text>
                    {schedule}
                  </View>}
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
  titleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleText: {
    color: '#4B306A',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'work-sans-reg',
  },
  buttonStyle: {
    marginRight: 20,
    width: '7%'
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
  },
  separator: {
    width:'10%'
  },
  mapButton: {
    height:50,
    width:50
  }
});

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']