import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearGradient, Font, WebBrowser } from 'expo';
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

    animate(shakeAnim){
      if (this.props.animations) {
        return [styles.mapButton, {left: shakeAnim}]
      }
      else return styles.mapButton
    }

    hyperParser(condition){
      if (condition) {
        return styles.hyperlink
      }
    }

    render() {
        let contWidth = 0.8*SCREEN_WIDTH
        let schedule = []
        let lineFlex = (SCREEN_WIDTH > MIN_TABLET_WIDTH) ? 'row' : 'column'
        let phonePad = (SCREEN_WIDTH > MIN_TABLET_WIDTH) ? 20 : 0

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
                  <AnimatedTouchable
                    onPress={()=>this.props.navigation.navigate('MapScreen', {
                      coords: this.props.data.coords,
                      organization: this.props.data.organization
                    })}
                    style={this.animate(shakeAnim)}>
                    <Image style={styles.mapIcon}
                    source={require('../assets/map_button.png')} />
                  </AnimatedTouchable>
                  </View>}
                </View>
                <View style={[styles.line, {flexDirection: lineFlex}]}>
                  <View style={styles.block}>
                    <Text style={styles.infoText}>Address:</Text>
                    <Text style={styles.text}>{this.props.data.location == null ? "Phone Only" : this.props.data.location}</Text>
                  </View>
                  <View style={styles.block}>
                    <Text style={[styles.infoText, {paddingLeft: phonePad}]}>Phone:</Text>
                    {phoneParser(this.props.data.phoneNumber,phonePad)}
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
                    {websiteParser(this.props.data.website)}
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

const MIN_TABLET_WIDTH = 599;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);

const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const websiteParser = (website) => {
  var websiteDisp = website
  if (website == null) {
    return (
      <Text 
      style={styles.text}>
        No Website
      </Text>
    )
  }
  if (website.slice(0,4) != 'http') {
    websiteDisp = 'http://'+website
  }
  if (SCREEN_WIDTH > MIN_TABLET_WIDTH) {
   return (
    <Text style={[styles.text]}>
    <Text>
      {websiteDisp}
    </Text>
    </Text>   
    )
  }
  return (
    <Text style={[styles.text, styles.hyperlink]}>
    <Text
    onPress={() => {_openLink(websiteDisp)}}>
      {websiteDisp}
    </Text>
    </Text>
  )
}

_openLink = async (link) => {
        await WebBrowser.openBrowserAsync(link);
    }

const phoneParser = (phoneNum, phonePad) => {
  if (phoneNum == null){
    phoneDisp = 'No Phone Number'
    return (
      <Text 
      style={[styles.text, {paddingLeft: phonePad}]}>
        No Phone Number
      </Text>
    )
  }
  let phoneSplit = phoneNum.split("")
  let list = []
  if (phoneSplit.length == 10) {
    for (var i = 0; i < 6; i = i + 3){
      var comp  = phoneSplit[i] + phoneSplit[i+1] + phoneSplit[i+2] + '-'
      list.push(comp)
    }
    phoneNum = list.join('') + phoneSplit[6] + phoneSplit[7] + phoneSplit[8] + phoneSplit[9]
  }
  if (SCREEN_WIDTH > MIN_TABLET_WIDTH) {
    return (
      <Text style={[styles.text, {paddingLeft: phonePad}]} >
      <Text>
        {phoneNum}
      </Text>
      </Text>
    )
  }
  return (
    <Text style={[styles.text, styles.hyperlink, {paddingLeft: phonePad}]} >
    <Text
    onPress={() => {Linking.openURL('tel:'+phoneNum)}}>
      {phoneNum}
    </Text>
    </Text>
  )
}