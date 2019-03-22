import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, Dimensions, FlatList } from 'react-native';
import { LinearGradient, Font } from 'expo';
import ResultComponent from './ResultComponent.js';
import { NavigationEvents } from 'react-navigation';

export default class ResultListScreen extends React.Component {
	constructor(props){
		super(props);
		this.state={
			fontLoaded:false,
			data: [],
			timer: null
		}
		this.getResults.bind(this)
	}

	async componentDidMount() {
	    await Font.loadAsync({
	      'work-sans-bold': require('../assets/WorkSans/WorkSans-Bold.ttf'),
	    })
	    .then(() => this.getResults())
	    this.setState({fontLoaded:true})
	    let timer = setTimeout(()=>this.props.navigation.popToTop(), timeOut);
	    this.setState({timer})
	}
	
	_pressBut(){
		this.props.navigation.navigate('Home');
	}

	getResults() {
		let category = this.props.navigation.getParam('cat','')
		let encodedCat = encodeURIComponent(category)
		let type = this.props.navigation.getParam('type','')
		let url = `${api[type]}${encodedCat}`
		console.log(url);
		fetch(url)
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				data: responseJson
			})
		})
		.catch((error) => console.log(error))
	}

	resetTimer(){
	    clearTimeout(this.state.timer)
	    this.state.timer = setTimeout(()=>this.props.navigation.popToTop(),timeOut)
  	}

	render(){
		return(
			<View>
			    <NavigationEvents
			      onDidFocus={()=>this.resetTimer()}
			      onWillBlur={()=>clearTimeout(this.state.timer)}
			    />
			<TouchableWithoutFeedback onPress={()=>{
				this.resetTimer()
			}}>
			<LinearGradient colors={['#EEEEEE','#D7D7D7']} start={[0, 0.16]} end={[0, 0.85]} style={styles.container}>
				<Text style={styles.catText}>{this.props.navigation.getParam('cat','').toUpperCase()}</Text>
				{this.state.data.code == 'ER_PARSE_ERROR' ? <Text style={styles.catText}>No Results</Text> :
				<FlatList
				style={styles.listContainer}
				contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
				data={this.state.data}
				numColumns={1}
				onScroll={()=>this.resetTimer()}
				renderItem={({item}) => {
					return(
						<ResultComponent data={item} timerCallback={()=>this.resetTimer()}/>
				)}}
				keyExtractor={item => item.organization}
				ListFooterComponent={footer}
				/>}
			</LinearGradient>
			</TouchableWithoutFeedback>
			</View>
		)
	}
}

class footer extends React.Component {
	render() {
		let seperatorHeight = 0.1*SCREEN_HEIGHT
		return (
			<View style={{height: seperatorHeight}}></View>
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
	catText: {
		paddingTop:'5%',
		left:'10%',
		alignSelf:'flex-start',
		color:'#4B306A',
		fontSize: 20,
		marginBottom:20,
		fontFamily:'work-sans-bold',
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

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const api = {
	cat:"http://35.166.255.157/xGdZeUwWF9vGiREdDqttqngajYihFUIoJXpC8DVz/category?key=",
	keyword:"http://35.166.255.157/xGdZeUwWF9vGiREdDqttqngajYihFUIoJXpC8DVz/search?keyword="
}

const timeOut = 180000