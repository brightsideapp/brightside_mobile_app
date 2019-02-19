import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import { LinearGradient, Font } from 'expo';
import ResultComponent from './ResultComponent.js';
import ResultBigComponent from './ResultBigComponent.js';

export default class ResultListScreen extends React.Component {
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
		this.props.navigation.navigate('Home');
	}
	render(){
		return(
			<LinearGradient colors={['#EEEEEE','#D7D7D7']} start={[0, 0.16]} end={[0, 0.85]} style={style.container}>
				<ScrollView contentContainerStyle={{flexDirection:'column',alignItems: 'center'}} style={style.list}>
					{this.state.fontLoaded ? (
						<View style={style.header}>
							<Text style={style.headerText}>RECREATION</Text>
							<Image style={style.icon} source={require('../assets/biker.png')} />
						</View>) : null}
					<ResultComponent />
					<ResultComponent />
					<ResultComponent />
					<ResultComponent />
					<ResultComponent />
				</ScrollView>
			</LinearGradient>
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
	header: {
		flexDirection:'row',
		width:'45%',
		paddingTop:'5%',
		left:'6%',
		alignSelf:'flex-start',
		justifyContent:'flex-start',
		marginBottom:20,
	},
	headerText:{
		height:'300%',
		flex:3,
		color:'#4B306A',
		fontSize: 20,
		fontFamily:'work-sans-bold',
	},
	list: {
		flex:1,
		width:'100%',
	},
	icon: {
		height:'300%',
		flex:1,
		resizeMode:'contain'
	}
})