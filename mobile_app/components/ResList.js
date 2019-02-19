import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import { LinearGradient, Font } from 'expo';

export default class ResList extends React.Component {
	constructor(props){
		super(props);
		this.state={
			fontLoaded:false
		}
	}
	async componentDidMount() {
	    await Font.loadAsync({
	      'work-sans-bold': require('../assets/WorkSans/WorkSans-Bold.ttf'),
	    });
	    this.setState({fontLoaded:true})
	}
	_pressBut(){
		this.props.navigation.navigate('ResultList');
	}
	render(){
		return(
			<LinearGradient colors={['#EEEEEE','#D7D7D7']} start={[0, 0.16]} end={[0, 0.85]} style={style.container}>
				<ScrollView contentContainerStyle={{flexDirection:'column',alignItems: 'center'}} style={style.list}>
					{this.state.fontLoaded ? (<Text style={style.resText}>RESOURCES</Text>) : null}
					<CardPair navigation={() => this._pressBut()} />
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
		return(
			<TouchableHighlight style={style.card} 
			onPress={this.props.navigation}>
				<View>
					<Image style={style.icon} source={require('../assets/taxi.png')}/>
					{this.state.fontLoaded ? (<Text style={style.cardText}>Transportation</Text>) : null}
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
					<ResCard navigation={this.props.navigation} />
					<View style={{width:'10%'}}></View>
					<ResCard navigation={this.props.navigation} />
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
	    justifyContent: 'center',
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
		color:'#DDDDDD',
		fontFamily:'work-sans-medium'
	},
	cardPair: {
		flex:1,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems: 'center',
		width:'70%'
	},
	resText: {
		paddingTop:'5%',
		left:'15%',
		alignSelf:'flex-start',
		color:'#4B306A',
		fontSize: 20,
		marginBottom:20,
		fontFamily:'work-sans-bold',
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