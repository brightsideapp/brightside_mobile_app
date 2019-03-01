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
		let textSize = 0.04*SCREEN_HEIGHT
		return(
			<LinearGradient colors={['#EEEEEE','#d7d7d7']} start={[0, 0.16]} end={[0, 0.85]} style={styles.container}>
				{this.state.fontLoaded ? (<Text style={[styles.catText, {fontSize: textSize}]}>RESOURCES</Text>) : null}
				<FlatList
					style={{paddingLeft: '10%', width: '100%'}}
					contentContainerStyle={{alignItems: 'flex-start'}}
					data = {this.state.data}
					renderItem={({item}) => {
						return (
							<CatCard cat={item.type} img={item.imageFile} />
						)}}
					keyExtractor={item => item.type}
					numColumns={2}
					ItemSeparatorComponent={separator}
			/>
			</LinearGradient>
	)
}}

class separator extends React.Component {
	render() {
		let seperatorHeight = 0.05*SCREEN_HEIGHT
		return (
			<View style={{height: seperatorHeight}}></View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width:'100%',
	    alignItems: 'center'
	},
	catText: {
		paddingTop:'5%',
		left:'10%',
		alignSelf:'flex-start',
		color:'#4B306A',
		marginBottom: '2%',
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