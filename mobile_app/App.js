import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// import screens from views folder
import ResList from './components/ResList.js';
import HomeComponent from './components/HomeComponent.js';
import ResultListScreen from './components/ResultListScreen.js';

// create a navigation stack
const RootStack = createStackNavigator(
  {
    Home: HomeComponent,
    ResList: ResList,
    ResultList: ResultListScreen
  },
  {
    initialRouteName: "Home"
  }
)
const AppContainer = createAppContainer(RootStack)

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
});
