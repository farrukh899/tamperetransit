import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    AppRegistry,
    ActivityIndicator,
} from 'react-native';
const {width, height} = Dimensions.get('window')
export default class LoadingComponent extends Component {
    constructor(props) {
        super()
    }

    render() {
        return(
          <View style={styles.loadingContainer}>
            <View style={styles.loadingView}>
              <View style={styles.loadingSpinnerContainer}>
                <ActivityIndicator
                    animating={true}
                    color={'#ffffff'}
                  />
              </View>
              <View style={styles.loadingMessageContainer}>
                <Text style={styles.messageText}>{this.props.loadingMessage}</Text>
              </View>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  loadingContainer: {
      position: 'absolute',
      top: 60,
      width: width,
      height: 35,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
  },
  loadingView: {
      height: 35,
      width: width,
      backgroundColor: '#46C1EC',
      flexDirection: 'row',
      padding: 8
  },
  loadingSpinnerContainer: {
      flex: 0.2,
      height: 40,
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'absolute',
      left: 8,
      top: 10
  },
  loadingMessageContainer: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center'
  },
  messageText: {
      color: '#FFFFFF'
  }
})

AppRegistry.registerComponent('LoadingComponent', () => LoadingComponent)
