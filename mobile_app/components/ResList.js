import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo'

export default class ResList extends React.Component {
	constructor(props){
		super(props);

	}

	render(){
		return(
			<LinearGradient colors={['#EEEEEE','#D7D7D7']} style={style.container}>
				<ScrollView contentContainerStyle={{flexDirection:'column',alignItems: 'center'}} style={style.list}>
					<Text style={style.resText}>RESOURCES</Text>
					<CardPair />
					<CardPair />
					<CardPair />
					<CardPair />
					<CardPair />
					<CardPair />
					<CardPair />
				</ScrollView>
			</LinearGradient>
		)
	}
}

class ResCard extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<TouchableHighlight style={style.card}>
				<View>
					<Image style={style.icon} source={require('../assets/taxi.png')}/>
					<Text style={style.cardText}>OMEGALUL</Text>			
				</View>
			</TouchableHighlight>
		)
	}
}

class CardPair extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		let height = 0.20*SCREEN_HEIGHT;
		return(
			<View style={{marginBottom:'2%',height:height, flex:1}}>
				<View style={style.cardPair}>
					<ResCard />
					<View style={{width:'10%'}}></View>
					<ResCard />
				</View>
			</View>

		)
	}
}

const style = StyleSheet.create({
	container: {
		flexDirection:'column',
	    width:'100%',
	    height:'100%',
	    alignItems: 'center',
	    justifyContent: 'center'
	},
	card:{
		flex:1,
		flexDirection:'column',
		justifyContent:'center',
		alignItems: 'center',
		backgroundColor:'#4B306A',
		width:'10%',
		borderRadius:10,
	},
	cardText: {
		flex:1,
		textAlign:'center',
		color:'#DDDDDD'
	},
	cardPair: {
		flex:1,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems: 'center',
		width:'70%'
	},
	resText: {
		paddingTop:'20%',
		left:'15%',
		alignSelf:'flex-start',
		color:'#4B306A',
		fontSize: 20,
		marginBottom:20
	},
	list: {
		width:'100%'
	},
	icon: {
		height:'55%',
		marginTop:'15%',
		marginBottom:'10%',
		resizeMode:'contain'
	}
})

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');