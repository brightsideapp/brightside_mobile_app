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
		return(
			<TouchableHighlight style={style.card} 
			onPress={()=>this.props.navigation.navigate('ResultList',{cat:this.props.cat})}>
				<View>
					<Image style={style.icon} source={require('../assets/taxi.png')}/>
					{this.state.fontLoaded ? (<Text style={style.cardText}>{this.props.cat}</Text>) : null}
				</View>
			</TouchableHighlight>
		)
	}
}

export default withNavigation(CatCard);

const style = StyleSheet.create({
	card:{
		height:150,
		marginLeft:15,
		marginRight:15,
		flexDirection:'column',
		justifyContent:'center',
		alignItems: 'center',
		backgroundColor:'#4B306A',
		borderRadius:10
	},
	cardText: {
		flex:1,
		textAlign:'center',
		color:'#DDDDDD',
		fontFamily:'work-sans-medium'
	},
	icon: {
		height:'55%',
		marginTop:'15%',
		marginBottom:'10%',
		resizeMode:'contain'
	}
})