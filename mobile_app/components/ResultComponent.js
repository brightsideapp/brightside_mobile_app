import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearGradient, Font } from 'expo';
import { Animated, Easing, Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, Button, Linking, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';

class ResultComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loadExtra: false,
          fontLoaded:false,
        }
        this.shakeValue = new Animated.Value(0)
        this.bounceValue = new Animated.Value(0)
        this.opacityValue = new Animated.Value(0)
        this.expand = this.expand.bind(this)
    }

    async componentDidMount() {
        await Font.loadAsync({
          'work-sans-reg': require('../assets/WorkSans/WorkSans-Regular.ttf'),
        });
        this.setState({fontLoaded:true})
        this.shake()
        this.bounce()
    }

    shake () {
      this.shakeValue.setValue(0)
      Animated.spring(
        this.shakeValue,
          {
            toValue: 1,
            friction: 0.8,
          }
      ).start(() => this.shake())
    }

    bounce() {
      this.bounceValue.setValue(0)
      Animated.parallel([
        Animated.timing(
          this.bounceValue, {
            toValue: 1,
            duration: 1600,
            easing: Easing.linear,
          }
        ),
        Animated.sequence([
          Animated.timing(
            this.opacityValue, {
              toValue: 0,
              duration: 100
            }
          ),
          Animated.timing(
            this.opacityValue, {
              toValue: 1,
              duration: 400
            }
          ),
          Animated.timing(
            this.opacityValue, {
              toValue: 1,
              duration: 700
            }
          ),
          Animated.timing(
            this.opacityValue, {
              toValue: 0,
              duration: 400
            }
          ),
        ])
      ]).start(() => this.bounce())
    }

    expand() {
      this.state.loadExtra ? this.setState({loadExtra: false}) : this.setState({loadExtra: true})
    }

    render() {
        let contWidth = 0.8*SCREEN_WIDTH
        let schedule = []
        let lineFlex = (SCREEN_WIDTH > 600) ? 'row' : 'column'
        let phonePad = (SCREEN_WIDTH > 600) ? 20 : 0
        let phoneNum = phoneParser(this.props.data.phoneNumber)

        weekday.forEach((day)=>{
          schedule.push(
            <View style={styles.line} key={day}>
              <Text style={styles.text}>{`${day}: `}</Text>
              <Text style={styles.text}>{`${this.props.data.schedule[day]}`}</Text>
            </View>
          )
        })

        const bounceDownAnim = this.bounceValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-5, 8]
        })

        const bounceUpAnim = this.bounceValue.interpolate({
            inputRange: [0, 1],
            outputRange: [8, -5]
        })

        const shakeAnim = this.shakeValue.interpolate({
            inputRange: [0, 1],
            outputRange: [3, 0]
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
                  {this.props.data.location != null && <View style={styles.buttonStyle}>
                  {this.props.animations ? <AnimatedTouchable
                    onPress={()=>this.props.navigation.navigate('MapScreen', {
                      coords: this.props.data.coords,
                      organization: this.props.data.organization
                    })}
                    style={[styles.mapButton, {left: shakeAnim}]}>
                    <Image style={styles.mapIcon}
                    source={require('../assets/map_button.png')} />
                  </AnimatedTouchable> :
                  <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('MapScreen', {
                      coords: this.props.data.coords,
                      organization: this.props.data.organization
                    })}
                    style={[styles.mapButton]}>
                    <Image style={styles.mapIcon}
                    source={require('../assets/map_button.png')} />
                  </TouchableOpacity>}
                  </View>}
                </View>
                <View style={[styles.line, {flexDirection: lineFlex}]}>
                  <View style={styles.block}>
                    <Text style={styles.infoText}>Address:</Text>
                    <Text style={styles.text}>{this.props.data.location == null ? "Phone Only" : this.props.data.location}</Text>
                  </View>
                  <View style={styles.block}>
                    <Text style={[styles.infoText, {paddingLeft: phonePad}]}>Phone:</Text>
                    <Text 
                    style={[styles.text, styles.hyperlink, {paddingLeft: phonePad}]} 
                    onPress={() => {Linking.openURL('tel:'+phoneNum);}}>
                      {phoneNum}
                    </Text>
                  </View>
                </View>
                <Text style={styles.infoText}>Perks:</Text>
                <Text style={styles.text}>{this.props.data.perk.join(", ")}</Text>
                {!this.state.loadExtra && 
                <Animated.Image style={[styles.expand, {top: bounceDownAnim, opacity: this.opacityValue}]} source={require('../assets/down.png')} />}
                {this.state.loadExtra && 
                <View>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.infoText}>Website:</Text>
                    <Text 
                    style={[styles.text, styles.hyperlink]}
                    onPress={() => {Linking.openURL(this.props.data.website)}}>
                      {this.props.data.location == null ? "No Website" : this.props.data.website}
                    </Text>
                  </View>
                  <Text style={styles.infoText}>Description:</Text>
                  <Text style={styles.text}>{this.props.data.description}</Text>
                  <Text style={[styles.titleText, {fontSize: 20}]}>Hours:</Text>
                  {schedule}
                </View>}
                {this.state.loadExtra && 
                <Animated.Image style={[styles.expand, {top: bounceUpAnim, opacity: this.opacityValue}]} source={require('../assets/up.png')} />}
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
  block: {
    flexDirection: 'column',
    flex: 1,
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
  hyperlink: {
    textDecorationLine: 'underline', 
    color: '#0645AD'
  },
  expand: {
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
  separator: {
    width:'10%'
  },
  mapButton: {
    alignItems: 'center', 
    backgroundColor: '#4B306A',
    paddingTop: 5,
    paddingBottom: 8,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 30,
  },
  mapIcon: {
    height:35,
    width:35
  }
});

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);

const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const phoneParser = (phoneNum) => {
  let phoneSplit = phoneNum.split("")
  let list = []
  console.log(phoneSplit);
  if (phoneSplit.length == 10) {
    for (var i = 0; i < 6; i = i + 3){
      var comp  = phoneSplit[i] + phoneSplit[i+1] + phoneSplit[i+2] + '-'
      list.push(comp)
    }
    return list.join('') + phoneSplit[6] + phoneSplit[7] + phoneSplit[8] + phoneSplit[9]
  } else return phoneNum
}