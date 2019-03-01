import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Font } from 'expo';
import { withNavigation } from 'react-navigation';

class CatCard extends React.Component {
	constructor(props){
		super(props);
		this.state={
			fontLoaded:false,
			uri: `${endpoint}${this.props.img}`
		}
	}
	async componentDidMount() {
	    await Font.loadAsync({
	      'work-sans-medium': require('../assets/WorkSans/WorkSans-Medium.ttf'),
	    });
	    this.setState({fontLoaded:true})
	}

	render(){
		console.log(this.state.uri);
		return(
			<TouchableOpacity style={style.card} 
			onPress={()=>this.props.navigation.navigate('ResultList',{cat:this.props.cat})}>
				<View>
					<Image style={style.icon} source={{uri:'https://www.w3schools.com/w3css/img_lights.jpg'}}/>
					{this.state.fontLoaded ? (<Text style={style.cardText}>{this.props.cat}</Text>) : null}
				</View>
			</TouchableOpacity>
		)
	}
}

export default withNavigation(CatCard);

const style = StyleSheet.create({
	card:{
		height:200,
		width:300,
		marginLeft:70,
		marginRight:70,
		flexDirection:'column',
		justifyContent:'center',
		alignItems: 'center',
		backgroundColor:'#4B306A',
		borderRadius:10
	},
	cardText: {
		flex:2,
		textAlign:'center',
		color:'#DDDDDD',
		fontFamily:'work-sans-medium',
		fontSize:28,
		backgroundColor:'yellow'
	},
	icon: {
		flex:5,
		marginTop:'5%',
		alignSelf:'center',
		marginBottom:'6%',
		resizeMode:'contain',
		backgroundColor:'black'
	}
})

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const endpoint = 'http://35.166.255.157/'