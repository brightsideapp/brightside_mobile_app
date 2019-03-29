import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, Text, View, Image, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { Font } from 'expo';
import { withNavigation } from 'react-navigation';

class CatCard extends React.Component {
	constructor(props){
		super(props);
		this.state={
			fontLoaded:false,
			uri: `${endpoint}${this.props.img}`
		}
		this.shakeValue = new Animated.Value(3)
	}
	async componentDidMount() {
	    await Font.loadAsync({
	      'work-sans-medium': require('../assets/WorkSans/WorkSans-Medium.ttf'),
	    });
	    this.setState({fontLoaded:true})
	    this.shake()
	}

	shake () {
		this.shakeValue.setValue(3)
		Animated.spring(
			this.shakeValue,
				{
					toValue: 0,
					friction: 1,
				}
		).start(() => this.shake())
	}

	render(){
		let cardWidth = (SCREEN_WIDTH > 600) ? 0.375*SCREEN_WIDTH : 0.8*SCREEN_WIDTH
		let cardHeight = (SCREEN_WIDTH > 600) ? 0.375*SCREEN_HEIGHT : 0.5*SCREEN_HEIGHT
		let cardMargin = 0.05*SCREEN_WIDTH
		let textSize = (SCREEN_WIDTH > 600) ? 0.0425*SCREEN_HEIGHT : 0.05*SCREEN_HEIGHT
		let iconSize = (SCREEN_WIDTH > 600) ? 0.2*SCREEN_HEIGHT : 0.3*SCREEN_HEIGHT

        const shakeAnim = this.shakeValue.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
        })

        if (this.props.animations) {
        	return(
				<AnimatedTouchable
				style={[styles.card, {
					width: cardWidth, 
					height: cardHeight, 
					marginRight: cardMargin,
					transform: [{rotate: shakeAnim}]
				}]}
				onPress={()=>this.props.navigation.navigate('ResultList',{cat:this.props.cat,type:'cat'})}>
					<View style={styles.buttContainer}>
						<Image style={{height: iconSize, width: iconSize, resizeMode: 'contain'}} source={{uri:this.state.uri}}/>
						{this.state.fontLoaded ? (<Text style={[styles.cardText, {fontSize: textSize}]}>{this.props.cat}</Text>) : null}
					</View>
				</AnimatedTouchable>
			)
        } else {
        	return (
        		<TouchableHighlight
				style={[styles.card, {
					width: cardWidth, 
					height: cardHeight, 
					marginRight: cardMargin
				}]}
				onPress={()=>this.props.navigation.navigate('ResultList',{cat:this.props.cat,type:'cat',animations:this.props.animations})}>
					<View style={styles.buttContainer}>
						<Image style={{height: iconSize, width: iconSize, resizeMode: 'contain'}} source={{uri:this.state.uri}}/>
						{this.state.fontLoaded ? (<Text style={[styles.cardText, {fontSize: textSize}]}>{this.props.cat}</Text>) : null}
					</View>
				</TouchableHighlight>
        	)
        }
	}
}

export default withNavigation(CatCard);

const styles = StyleSheet.create({
	card:{
		justifyContent:'center',
		alignItems: 'center',
		backgroundColor:'#4B306A',
		borderRadius:10
	},
	buttContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardText: {
		textAlign:'center',
		color:'#DDDDDD',
		fontFamily:'work-sans-medium',
		paddingLeft: '3.5%',
		paddingRight: '3.5%',
	}
})

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);

const endpoint = 'http://35.166.255.157/icon/'