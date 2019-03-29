import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text, View, Keyboard, TouchableWithoutFeedback, StyleSheet, Dimensions, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Permissions from 'react-native-permissions';
import { LinearGradient, Font } from 'expo';
import CatCard from './CatCard.js';
import { NavigationEvents } from 'react-navigation';

export default class CatList extends React.Component {
	constructor(props){
		super(props);
		this.state={
			fontLoaded:false,
			data: undefined,
			value: null,
			timer: null
		};
	}

	fetchData(){
		fetch(api.endpoint)
		.then((response) => response.json())
		.then((response) => {
			this.setState({data:response})
		})
	}

	getSearch(){
		this.props.navigation.navigate('ResultList', {cat: this.state.value,type:'keyword'})
	}

	async componentDidMount() {
	    await Font.loadAsync({
	      'work-sans-bold': require('../assets/WorkSans/WorkSans-Bold.ttf'),
	      'work-sans-medium': require('../assets/WorkSans/WorkSans-Medium.ttf'),
	    })
	    .then(()=>{this.setState({fontLoaded:true})})
	    await this.fetchData()
	    let timer = setTimeout(()=>this.props.navigation.popToTop(), timeOut);
	    this.setState({timer})
	}

	resetTimer(){
	    clearTimeout(this.state.timer)
	    this.state.timer = setTimeout(()=>this.props.navigation.popToTop(),timeOut)
  	}

	render(){
		let textSize = 0.04*SCREEN_HEIGHT
		let searchHeight = 0.07*SCREEN_HEIGHT
		let searchFontSize = 0.035*SCREEN_HEIGHT
		let colNum = (SCREEN_WIDTH > 600) ? 2 : 1
		let renderData = (this.state.data == null) ? false : true; 
		return(
			<View>
			    <NavigationEvents
			      onDidFocus={()=>this.resetTimer()}
			      onWillBlur={()=>clearTimeout(this.state.timer)}
			    />
			<TouchableWithoutFeedback onPress={()=>{
				this.resetTimer()
				Keyboard.dismiss()
			}}>
				<LinearGradient colors={['#EEEEEE','#d7d7d7']} start={[0, 0.16]} end={[0, 0.85]} style={styles.container}>
					{this.state.fontLoaded ? (<Text style={[styles.catText, {fontSize: textSize}]}>SEARCH</Text>) : null}
					{this.state.fontLoaded ? (<SearchBar
					ref={search => this.search = search} 
					lightTheme
					round={true}
					placeholder='Search for a resource'
					placeholderTextColor='#eee'
					searchIcon={false}
					cancelIcon={false}
					clearIcon={false}
					containerStyle={styles.search}
					inputContainerStyle={[styles.searchInput, {height: searchHeight}]}
					inputStyle={[styles.textIn, {fontSize: searchFontSize}]}
					onChangeText={(value)=>{
						this.setState({value})
						this.resetTimer()
					}}
					value={this.state.value}
					onSubmitEditing={()=>{
						this.getSearch()
						this.search.clear()
					}}/>) : null}
					{!renderData && 
					<View style={{width:'100%',top:'35%'}}>
					<ActivityIndicator size="large" color="#4B306A" />
					</View>}
					<FlatList
						style={{width: '100%'}}
						onScroll={()=>this.resetTimer()}
						contentContainerStyle={styles.flatContainer}
						data = {this.state.data}
						renderItem={({item}) => {
							return (
								<CatCard cat={item.type} img={item.imageFile} />
							)}}
						keyExtractor={item => item.type}
						numColumns={colNum}
						ItemSeparatorComponent={separator}
						ListFooterComponent={footer}
					/>
				</LinearGradient>
			</TouchableWithoutFeedback>
			</View>
	)}
}

class separator extends React.Component {
	render() {
		let seperatorHeight = 0.05*SCREEN_HEIGHT
		return (
			<View style={{height: seperatorHeight}}></View>
		)
	}
}

class footer extends React.Component {
	render() {
		let seperatorHeight = 0.4*SCREEN_HEIGHT
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
	search: {
		width: '80%',
		borderTopWidth: 0,
		borderBottomWidth: 0,
		backgroundColor: 'transparent',
		paddingRight: 0
	},
	searchInput: {
		backgroundColor: '#aaa',
		marginLeft: '-2%'
	},
	textIn: {
		color: '#4B306A',
		fontFamily:'work-sans-medium',
	},
	flatContainer: {
		paddingLeft: '10%', 
		paddingTop: '3%', 
		alignItems: 'flex-start',
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

const timeOut = 180000