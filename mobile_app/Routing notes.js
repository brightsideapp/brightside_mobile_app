// class example and use of navigations

class AddScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
        data: this.props.userData.currentData,
        fullData: this.props.userData.currentData,
        image: null,
        food: {
          food_name: "",
          img: "",
          price: "",
          notes: "",
          date: new Date().toDateString(),
          address: "",
          restaurant: "",
        }
    }
  }

  // option for hiding header bar
  static navigationOptions = {
    header: null
  }

  // touchable text "Go to next screen" will navigate to "Next Screen" component declared in rootstack
  render() {
    return (
      <View>
        <TouchableHighlight
          style={styles.cancelButton}
          onPress={() => { this.props.navigation.navigate('Next Screen') }}
          underlayColor="white"
        >
          <Text>Go to next screen</Text>
        </TouchableHighlight>
      </View>
    )
  }

}