import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, Button, StyleSheet, Text, View } from 'react-native';
import { LinearGradient, Font } from 'expo';
import Permissions from 'react-native-permissions'
import MapView from 'react-native-maps'
import Marker from 'react-native-maps'

export default class GeoComponent extends Component {

    constructor() {
        super();
        this.state = {
            locationPermission: 'unknown',
            position: 'unknown',
            region: undefined,
            marker: undefined
        }
        this.onRegionChange = this.onRegionChange.bind(this)
        this.getCurrentLocation = this.getCurrentLocation.bind(this)
        this.goLocation = this.goLocation.bind(this)
    }


    componentDidMount() {
        this.getCurrentLocation()
    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            console.log('my position: ' + position.coords.latitude + ', ' + position.coords.longitude);
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    latitudeDelta: 0.05,
                    longitude: position.coords.longitude,
                    longitudeDelta: 0.05,
                },
                marker: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            })
        }, (error) => {console.log(error)})
    }

    goLocation() {
        this.setState({
            region: {
                latitude: 50.6,
                latitudeDelta: 0.27,
                longitude: 16.7,
                longitudeDelta: 0.26
            },
        })
    }

    onRegionChange(region) {
        console.log(region);
        this.setState({
            region
        })
    }

    render() {
        return (
            <View style={styles.container}>
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
        )
    }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'    
  },
  map: {
    width: '90%',
    height: '80%'
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