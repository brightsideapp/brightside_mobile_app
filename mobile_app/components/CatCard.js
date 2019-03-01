import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { Font } from 'expo';
import { withNavigation } from 'react-navigation';

class CatCard extends React.Component {
	constructor(props){
		super(props);
		this.state={
			fontLoaded:false
		}
	}
	async componentDidMount() {
	    await Font.loadAsync({
	      'work-sans-medium': require('../assets/WorkSans/WorkSans-Medium.ttf'),
	    });
	    this.setState({fontLoaded:true})
	}

	render(){
		let cardWidth = 0.375*SCREEN_WIDTH
		let cardHeight = 0.375*SCREEN_HEIGHT
		let cardMargin = 0.05*SCREEN_WIDTH
		let textSize = 0.04*SCREEN_HEIGHT
		let iconSize = 0.2*SCREEN_HEIGHT
		return(
			<TouchableHighlight 
			style={[styles.card, {
				width: cardWidth, 
				height: cardHeight, 
				marginRight: cardMargin,
			}]} 
			onPress={()=>this.props.navigation.navigate('ResultList',{cat:this.props.cat})}>
				<View style={styles.buttContainer}>
					<Image style={{height: iconSize, width: iconSize}} source={require('../assets/taxi.png')}/>
					{this.state.fontLoaded ? (<Text style={[styles.cardText, {fontSize: textSize}]}>{this.props.cat}</Text>) : null}
				</View>
			</TouchableHighlight>
		)
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
		fontFamily:'work-sans-medium'
	}
})

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');