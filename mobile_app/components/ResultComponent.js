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
            <View style={styles.line} key={day}>
              <Text style={styles.text}>{`${day}: `}</Text>
              <Text style={styles.text}>{`${this.props.data.schedule[day]}`}</Text>
            </View>
          )
        })
        return (
            <TouchableOpacity style={[styles.container, {width: contWidth}]} onPress={()=>{
              this.expand()
              this.props.timerCallback()
            }}>
                <View>
                <View style={styles.titleLine}>
                  <View style={{flex: 4}}>
                    <Text style={styles.titleText}>{this.props.data.organization}</Text>
                  </View>
                  {this.props.data.location != "Phone Only" && <View style={styles.buttonStyle}>
                  <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('MapScreen', {
                      address: this.props.data.location,
                      organization: this.props.data.organization
                    })}
                    style={{alignItems: 'flex-end'}}>
                    <Image style={styles.mapButton}
                    source={{uri:"http://35.166.255.157/icon/map_button.png"}} />
                  </TouchableOpacity>
                  </View>}
                </View>
                <View style={styles.line}>
                  <Text style={styles.infoText}>Address:</Text>
                  <Text style={[styles.infoText,{paddingLeft:20}]}>Phone:</Text>
                </View>
                <View style={styles.line}>
                  <Text style={styles.text}>{this.props.data.location}</Text>
                  <Text style={[styles.text,{paddingLeft:20}]}>{this.props.data.phoneNumber}</Text>
                </View>
                <Text style={styles.infoText}>Perks:</Text>
                <Text style={styles.text}>{this.props.data.perk.join(", ")}</Text>
                {this.state.loadExtra && 
                <View>
                  <Text style={styles.infoText}>Description:</Text>
                  <Text style={styles.text}>{this.props.data.description}</Text>
                  <Text style={[styles.titleText, {fontSize: 20}]}>Hours:</Text>
                    {schedule}
                  </View>}
                </View>
            </TouchableOpacity>
        )
    }
}

export default withNavigation(ResultComponent)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 15,
    marginBottom:20
  },
  line: {
    flexDirection: 'row'
  },
  titleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0
  },
  titleText: {
    color: '#4B306A',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'work-sans-reg',
  },
  buttonStyle: {
    flex: 1
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