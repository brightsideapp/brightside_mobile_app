import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Icon, Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// import screens from views folder
import CatList from './components/CatList.js';
import HomeComponent from './components/HomeComponent.js';
import ResultListScreen from './components/ResultListScreen.js';
import GeoComponent from './components/GeoComponent.js';
  
// create a navigation stack
const RootStack = createStackNavigator(
  {
    Home: HomeComponent,
    CatList: CatList,
    ResultList: ResultListScreen,
    MapScreen: GeoComponent
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({navigation}) => {
      let iconSize = SCREEN_HEIGHT*0.05
      return {
        headerStyle:{
          backgroundColor: '#EEEEEE',
          elevation: 0
        },
        headerLeft: (
        <TouchableOpacity
          onPress={()=>navigation.goBack(null)} 
          style={styles.backButton}
        >
          <Image
          style={[styles.img, {height: iconSize, width: iconSize}]}
          source={require('./assets/back_arrow.png')}
          />
        </TouchableOpacity>
        ),
        headerRight: (
        <TouchableOpacity
          onPress={()=>navigation.popToTop()} 
          style={styles.homeButton}
        >
          <Image
          style={[styles.img, {height: iconSize, width: iconSize}]}
          source={require('./assets/home_icon.png')}
          />
        </TouchableOpacity>
        )
    }}
  }
)

//  create app container for RootStack
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButton: {
    right: '30%'
  },
  backButton: {
    left: '30%'
  },
  img: {
    resizeMode: 'contain'
  }
});

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');