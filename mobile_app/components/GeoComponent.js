import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient, Font } from 'expo';
import Permissions from 'react-native-permissions';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import { NavigationEvents } from 'react-navigation';


export default class GeoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationPermission: 'unknown',
            resName: this.props.navigation.getParam('organization',''),
            resMarker: {
                latitude: this.props.navigation.getParam('coords','').lat,
                longitude: this.props.navigation.getParam('coords','').lng
            },
            region: undefined,
            marker: null,
            displayRegion: undefined,
            fontLoaded: false,
            timer: null
        }
        this.onRegionChange = this.onRegionChange.bind(this)
    }

    async componentWillMount() {
        this.getCurrentLocation();
        await Font.loadAsync({
          'work-sans-reg': require('../assets/WorkSans/WorkSans-Regular.ttf'),
        });
        this.setState({fontLoaded:true})
        let timer = setTimeout(()=>this.props.navigation.popToTop(), timeOut);
        this.setState({timer})
    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            let latDelta = Math.abs(this.state.resMarker.latitude - position.coords.latitude)*1.15
            let longDelta = Math.abs(this.state.resMarker.longitude - position.coords.longitude)*1.15
            let displayLat = (this.state.resMarker.latitude + position.coords.latitude)/2
            let displayLong = (this.state.resMarker.longitude + position.coords.longitude)/2
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
                },
                displayRegion:{
                    latitude: displayLat,
                    latitudeDelta: latDelta,
                    longitude: displayLong,
                    longitudeDelta: longDelta,
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
                {!this.state.marker && 
                <View style={{width:'100%'}}>
                <ActivityIndicator size="large" color="#4B306A" />
                </View>}
                {this.state.region && this.state.marker && this.state.fontLoaded &&
                    <View style={styles.legend}>
                        <View style={styles.marker}>
                            <Image source={require('../assets/blue-pin.png')} 
                            style = {styles.pin}/>
                            <Text style={styles.legendText}>{this.state.resName}</Text>
                        </View>
                        <View style={styles.marker}>
                            <Image source={require('../assets/red-pin.png')}
                            style = {styles.pin}/>
                            <Text style={styles.legendText}>Your Location</Text>
                        </View>
                    </View>
                }
                {this.state.region && this.state.resMarker && this.state.fontLoaded &&
                    <MapView
                    initialRegion={this.state.displayRegion}
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