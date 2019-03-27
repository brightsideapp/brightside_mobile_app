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
			rawData: [],
			sortedDate: null,
			timer: null,
			curLat: null, 
			curLong: null
		}
		this.getResults.bind(this)
	}

	async componentWillMount() {
	    await Font.loadAsync({
	      'work-sans-bold': require('../assets/WorkSans/WorkSans-Bold.ttf'),
	    })
	    .then(async () => {
	    	this.setState({fontLoaded:true});
	    	await this.getResults();
	    	this.getCurrentLocation();
	    });
	    let timer = setTimeout(()=>this.props.navigation.popToTop(), timeOut);
	    this.setState({timer})
	}

	async fetchCoord(address){
        let api = "https://maps.googleapis.com/maps/api/geocode/json?address="
        let key = "&key=AIzaSyDY7ZYa5qUgs5IYLtWG7MSK6rIvSYUVKVc"
        let encodedAddr = encodeURIComponent(address)
        let encodedUrl = api + encodedAddr + key
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
    			if (dataCopy[i].location == "Phone Only"){continue};
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
				{this.state.rawData.code == 'ER_PARSE_ERROR' ? <Text style={styles.catText}>No Results</Text> :
				<FlatList
				style={styles.listContainer}
				contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
				data={this.state.sortedData}
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