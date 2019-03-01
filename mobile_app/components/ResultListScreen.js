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
			data: [],
		}
	}
	async componentDidMount() {
	    await Font.loadAsync({
	      'work-sans-bold': require('../assets/WorkSans/WorkSans-Bold.ttf'),
	    });
	    this.setState({fontLoaded:true})
	    this.getResults()
	}
	_pressBut(){
		this.props.navigation.navigate('Home');
	}

	getResults() {
		fetch(`http://35.166.255.157/xGdZeUwWF9vGiREdDqttqngajYihFUIoJXpC8DVz/category?key=legal`)
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson);
			this.setState({
				data: responseJson
			})
		})
		.catch((error) => console.log(error))
	}

	render(){
		return(
			<LinearGradient colors={['#EEEEEE','#D7D7D7']} start={[0, 0.16]} end={[0, 0.85]} style={styles.container}>
				<FlatList
				style={styles.listContainer}
				contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
				data={this.state.data}
				numColumns={1}
				renderItem={({item}) => {return(<ResultComponent data={item}/>)}}
				keyExtractor={item => item.description}
				/>
			</LinearGradient>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flexDirection:'column',
	    height:'100%',
	    alignItems: 'center',
	    justifyContent: 'center',
	},
	listContainer: {
		width: '100%',
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