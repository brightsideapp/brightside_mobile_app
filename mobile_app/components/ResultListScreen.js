import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, StyleSheet, TouchableHighlight, ScrollView, Dimensions, FlatList } from 'react-native';
import { LinearGradient, Font } from 'expo';
import ResultComponent from './ResultComponent.js';
import ResultBigComponent from './ResultBigComponent.js';

export default class ResultListScreen extends React.Component {
	constructor(props){
		super(props);
		this.state={
			fontLoaded:false,
			data: undefined
		}
	}

	fetchData(){
		let category = this.props.navigation.getParam('cat','')
		let url = `${api.endpoint}${category}`
		fetch(url)
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
	    .then(() => this.fetchData())
	    this.setState({fontLoaded:true})
	}
	_pressBut(){
		this.props.navigation.navigate('Home');
	}
	render(){
		return(
			<LinearGradient colors={['#EEEEEE','#D7D7D7']} start={[0, 0.16]} end={[0, 0.85]} style={style.container}>
				<FlatList  
					data={this.state.data}
					renderItem={({item}) => (
							<ResultComponent data={item} />
						)}
				/>
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

const api = {
	endpoint:"http://35.166.255.157/xGdZeUwWF9vGiREdDqttqngajYihFUIoJXpC8DVz/category?key="
}