import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView, Dimensions, FlatList } from 'react-native';
import { LinearGradient, Font } from 'expo';
import CatCard from './CatCard.js';

export default class CatList extends React.Component {
	constructor(props){
		super(props);
		this.state={
			fontLoaded:false,
			data: ['Transportation','legal','Health', 'black', 'white', 'green', 'yellow']
		}
	}

	fetchData(){
		fetch(api.endpoint)
		.then((response) => response.json())
		.then((response) => {
			console.log(response)
			this.setState({data:response})
		})
	}

	async componentDidMount() {
	    await Font.loadAsync({
	      'work-sans-bold': require('../assets/WorkSans/WorkSans-Bold.ttf'),
	    });
	    this.setState({fontLoaded:true})
	}
	render(){
		return(
			<LinearGradient colors={['#EEEEEE','#d7d7d7']} start={[0, 0.16]} end={[0, 0.85]} style={style.container}>
				{this.state.fontLoaded ? (<Text style={style.resText}>RESOURCES</Text>) : null}
				<FlatList 
					data = {this.state.data}
					renderItem={({item}) => {
						return (
							<CatCard cat={item} />
						)}}
					keyExtractor={item => item}
					numColumns={2}
					ItemSeparatorComponent={separator}
					ListFooterComponent={separator}
				/>
			</LinearGradient>
		)
	}
}

class separator extends React.Component {
	render() {
		return (
			<View style={style.separator}></View>
		)
	}
}

const style = StyleSheet.create({
	container: {
	    height:'100%',
	    alignItems: 'center'
	},
	separator:{
		height:50
	},
	resText: {
		paddingTop:'5%',
		left:'15%',
		alignSelf:'flex-start',
		color:'#4B306A',
		fontSize: 20,
		marginBottom:20,
		fontFamily:'work-sans-bold',
	}
})

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const api = {
	endpoint:"http://35.166.255.157/xGdZeUwWF9vGiREdDqttqngajYihFUIoJXpC8DVz/"
}