import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableHighlight, ScrollView, Dimensions, FlatList } from 'react-native';
import { LinearGradient, Font } from 'expo';
import CatCard from './CatCard.js';

export default class CatList extends React.Component {
	constructor(props){
		super(props);
		this.state={
			fontLoaded:false,
			data: undefined
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
	    })
	    .then(()=>{this.setState({fontLoaded:true})})
	    await this.fetchData()
	}
	render(){
		return(
			<View style={style.container}>
				{this.state.fontLoaded ? (<Text style={style.resText}>RESOURCES</Text>) : null}
				{this.state.data && <FlatList 
					style={{width:'100%'}}
					data = {this.state.data}
					renderItem={({item}) => {
						return (
							<CatCard cat={item.type} img={item.imageFile} />
						)}}
					keyExtractor={item => item.type}
					numColumns={2}
					ItemSeparatorComponent={separator}
					ListFooterComponent={footer}
					columnWrapperStyle={style.wrapper}
				/>}
			</View>
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

class footer extends React.Component {
	render() {
		return (
			<View style={style.footer}></View>
		)
	}
}

const style = StyleSheet.create({
	container: {
		width:'100%',
	    alignItems: 'center'
	},
	separator:{
		height:100
	},
	footer:{
		height:200
	},
	wrapper: {
		marginLeft:80,
		marginRight:80
	},
	resText: {
		paddingTop:'2%',
		left:'15%',
		alignSelf:'flex-start',
		color:'#4B306A',
		fontSize: 32,
		marginBottom:20,
		fontFamily:'work-sans-bold',
	}
})

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const api = {
	endpoint:"http://35.166.255.157/xGdZeUwWF9vGiREdDqttqngajYihFUIoJXpC8DVz/category"
}