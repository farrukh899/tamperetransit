import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    Text
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window')
export default class Suggestions extends Component {
    constructor() {
        super()
        this.state = {
            currentUserInformation: { name: 'Loading', city: 'Locating' }
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            currentUserInformation: newProps.currentUserInformation
        })
    }
    render() {
        return(
          <View style={styles.suggestionsContainer}>
              <View style={styles.containerBack}>
                <FontAwesome name="location-arrow" size={15}></FontAwesome>
              </View>
              <View style={[styles.containerInput, styles.centerStart]}>
                <Text style={styles.address}>{this.state.currentUserInformation.name}</Text>
                <Text style={styles.city}>{this.state.currentUserInformation.city}</Text>
              </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  containerBack: {
      flex: 0.15,
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center'
  },
  suggestionsContainer: {
      marginTop: 20,
      width: width -20,
      flexDirection: 'row',
      minHeight: 50,
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: '#F9F9F9F9',
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2
  },
  containerInput: {
      flex: 0.85,
      height: 50
  },
  address: {
      fontSize: 14
  },
  city: {
      fontSize: 12,
      color: '#777777'
  },
  centerStart: {
      alignItems: 'flex-start',
      justifyContent: 'center'
  }
})

AppRegistry.registerComponent('Suggestions', () => Suggestions)
