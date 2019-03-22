import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient, Font } from 'expo';
import Permissions from 'react-native-permissions'
import MapView from 'react-native-maps'
import Marker from 'react-native-maps'
import { NavigationEvents } from 'react-navigation';


export default class GeoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationPermission: 'unknown',
            position: 'unknown',
            resAddr: this.props.navigation.getParam('address',''),
            resName: this.props.navigation.getParam('organization',''),
            resMarker: undefined,
            region: undefined,
            marker: undefined,
            fontLoaded: false,
            timer: null
        }
        this.onRegionChange = this.onRegionChange.bind(this)
        this.getCurrentLocation = this.getCurrentLocation.bind(this)
    }

    async componentDidMount() {
        this.getCurrentLocation()
        await this.fetchCoord()
        await Font.loadAsync({
          'work-sans-reg': require('../assets/WorkSans/WorkSans-Regular.ttf'),
        });
        this.setState({fontLoaded:true})
        let timer = setTimeout(()=>this.props.navigation.popToTop(), timeOut);
        this.setState({timer})
    }

    async fetchCoord(){
        let api = "https://maps.googleapis.com/maps/api/geocode/json?address="
        let key = "&key=AIzaSyDY7ZYa5qUgs5IYLtWG7MSK6rIvSYUVKVc"
        let encodedAddr = encodeURIComponent(this.state.resAddr)
        let encodedUrl = api + encodedAddr + key
        await fetch(encodedUrl)
        .then((response) => response.json())
        .then((response) => {if (response.status != 'OK') {
                              throw new Error('Cannot get location from Google');
                            } else {
                                let cord = response.results[0].geometry.location
                                this.setState({
                                    resMarker:{
                                        latitude:cord.lat,
                                        longitude:cord.lng
                                    }
                                })
                                console.log(this.state.resMarker);
                            }})
        .catch((error) => {console.log(error)})
    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('my position: ' + position.coords.latitude + ', ' + position.coords.longitude);
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    latitudeDelta: 0.30,
                    longitude: position.coords.longitude,
                    longitudeDelta: 0.30,
                },
                marker: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            })
        }, (error) => {console.log(error)})
    }

    resetTimer(){
        clearTimeout(this.state.timer)
        this.state.timer = setTimeout(()=>this.props.navigation.popToTop(),timeOut)
    }

    onRegionChange(region) {
        this.setState({
            region
        })
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>{
                this.resetTimer()
            }}>
            <View style={styles.container}>
                <NavigationEvents
                  onDidFocus={()=>this.resetTimer()}
                  onWillBlur={()=>clearTimeout(this.state.timer)}
                />
                {this.state.region && this.state.resMarker && this.state.fontLoaded &&
                    <View style={styles.legend}>
                        <View style={styles.marker}>
                            <Image source={{uri: 'http://www.clker.com/cliparts/T/Z/k/E/K/s/blue-pin-hi.png'}} 
                            style = {styles.pin}/>
                            <Text style={styles.legendText}>{this.state.resName}</Text>
                        </View>
                        <View style={styles.marker}>
                            <Image source={{uri: 'http://www.clker.com/cliparts/1/l/n/3/G/9/red-pin-hi.png'}}
                            style = {styles.pin}/>
                            <Text style={styles.legendText}>Your Location</Text>
                        </View>
                    </View>
                }
                {this.state.region && this.state.resMarker && this.state.fontLoaded &&
                    <MapView
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChange}
                    style={styles.map}>
                        <MapView.Marker
                            coordinate={this.state.marker}
                            title={"Your Location"}
                        />
                        <MapView.Marker
                            coordinate={this.state.resMarker}
                            title={this.state.resName}
                            pinColor='blue'
                        />
                    </MapView>
                }
            </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE'    
  },
  map: {
    width: '90%',
    flex:4,
    marginBottom:'5%'
  },
  legend: {
    flexDirection:'column',
    width:'90%',
    flex:1,
    alignSelf:'flex-start',
    left:'5%'
  },
  marker:{
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    flexDirection:'row'
  },
  pin: {
    flex:1,
    height: '80%',
    width: '10%',
    resizeMode:'contain',
  },
  legendText: {
    flex:7,
    alignSelf:'center',
    left:'15%',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'work-sans-reg',
    color: '#4B306A'
  }
});

const timeOut = 180000