import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// import screens from views folder
import ResList from './components/ResList.js';

// create a navigation stack
const RootStack = createStackNavigator(
  {
    Home: ResList,
  }
)

//  create app container for RootStack
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
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
