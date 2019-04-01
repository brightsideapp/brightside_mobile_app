import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text, View, Image, StyleSheet, TouchableWithoutFeedback, Dimensions, FlatList } from 'react-native';
import { LinearGradient, Font } from 'expo';
import ResultComponent from './ResultComponent.js';
import Permissions from 'react-native-permissions';
import { NavigationEvents } from 'react-navigation';

export default class ResultListScreen extends React.Component {
	constructor(props){
		super(props);
		this.state={
			fontLoaded:false,
			rawData: [],
			sortedData: null,
			timer: null,
			curLat: null, 
			curLong: null,
			key: null
		}
		this.getResults.bind(this)
	}

	async componentWillMount() {
	    await Font.loadAsync({
	      'work-sans-bold': require('../assets/WorkSans/WorkSans-Bold.ttf'),
	    })
	    .then(async () => {
	    	this.setState({fontLoaded:true});
	    	await this.fetchKey();
	    	await this.getResults();
    		this.getCurrentLocation();
	    });
	    let timer = setTimeout(()=>this.props.navigation.popToTop(), timeOut);
	    this.setState({timer})
	}

	async fetchKey(){
		return await fetch(api.key)
        .then((response) => response.json())
        .then((response) => {if (response == '') {
                              throw new Error('Cannot get location from Google');
                            } else {
                                this.setState({key:response[0].key})
                            }})
        .catch((error) => {console.log(error)})
	}

	async fetchCoord(address){
        let googleApi = "https://maps.googleapis.com/maps/api/geocode/json?address="
        console.log(`key:${this.state.key}`);
        let accessKey = `&key=${this.state.key}`
        let encodedAddr = encodeURIComponent(address)
        let encodedUrl = googleApi + encodedAddr + accessKey
        return await fetch(encodedUrl)
        .then((response) => response.json())
        .then((response) => {if (response.status != 'OK') {
                              throw new Error('Cannot get location from Google');
                            } else {
                                return response.results[0].geometry.location
                            }})
        .catch((error) => {console.log(error)})
    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(async (position) => {
            this.setState({
            	curLat: position.coords.latitude,
            	curLong: position.coords.longitude
            });
    		let dataCopy = this.state.rawData.slice();
    		for (let i = 0; i < dataCopy.length; i++){
    			if (dataCopy[i].location == null){continue};
    			let coords = await this.fetchCoord(dataCopy[i].location);
    			dataCopy[i].coords = coords;
    		}
			dataCopy.sort((a, b) => {
			  if (a.coords == null && b.coords == null) {
			  	return 0
			  } else if (a.coords == null) {
			  	return -1
			  } else if (b.coords == null) {
			  	return 1
			  } else {
			  	let a_dist = Math.hypot(a.coords.lat - this.state.curLat,a.coords.lng - this.state.curLong)
	    		let b_dist = Math.hypot(b.coords.lat - this.state.curLat,b.coords.lng - this.state.curLong)
				return a_dist - b_dist
			  }
			}); 		
			this.setState({sortedData:dataCopy})
        }, (error) => {console.log(error)})
    }

	async getResults() {
		let category = this.props.navigation.getParam('cat','')
		let encodedCat = encodeURIComponent(category)
		let type = this.props.navigation.getParam('type','')
		let url = `${api[type]}${encodedCat}`
		console.log(url);
		await fetch(url)
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				rawData: responseJson
			})
		})
		.catch((error) => console.log(error))
	}

	resetTimer(){
	    clearTimeout(this.state.timer)
	    this.state.timer = setTimeout(()=>this.props.navigation.popToTop(),timeOut)
  	}

	render(){
		let renderData = (this.state.sortedData == null) ? false : true; 
		let textSize = 0.04*SCREEN_HEIGHT;
		let errorTextSize = 0.03*SCREEN_HEIGHT;
		let searchText = (this.props.navigation.getParam('type','') === 'keyword') ? "RESULTS FOR " : "";
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
				<Text style={[styles.catText, {fontSize: textSize}]}>{searchText}{this.props.navigation.getParam('cat','').toUpperCase()}</Text>
				{!renderData && 
				<View style={{width:'100%',top:'35%'}}>
				<ActivityIndicator size="large" color="#4B306A" />
				</View>}
				{this.state.sortedData == '' ? 
				<View style={styles.errorContainer}>
					<Text style={[styles.errorText, {fontSize: errorTextSize}]}>No Results</Text>
				</View> :
				<FlatList
				style={styles.listContainer}
				contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
				data={this.state.sortedData}
				numColumns={1}
				onScroll={()=>this.resetTimer()}
				renderItem={({item}) => {
					return(
						<ResultComponent data={item} animations={this.props.navigation.getParam('animations',true)} timerCallback={()=>this.resetTimer()}/>
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
		marginBottom:20,
		fontFamily:'work-sans-bold',
		paddingRight: '15%'
	},
	errorContainer: {
		height: '85%',
		width: '80%',
		marginTop: '5%'
	},
	errorText: {
		alignSelf:'flex-start',
		color:'#4B306A',
		fontFamily:'work-sans-bold',
	},
	listContainer: {
		width: '100%',
	},
})

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const api = {
	cat:"http://35.166.255.157/xGdZeUwWF9vGiREdDqttqngajYihFUIoJXpC8DVz/category?key=",
	keyword:"http://35.166.255.157/xGdZeUwWF9vGiREdDqttqngajYihFUIoJXpC8DVz/search?keyword=",
	key:"http://35.166.255.157/xGdZeUwWF9vGiREdDqttqngajYihFUIoJXpC8DVz/key"
}

const timeOut = 180000