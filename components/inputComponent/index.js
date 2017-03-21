import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window')
export default class InputContainer extends Component {
    constructor() {
        super()
        this.state = {
          currentUserInformation: {
              name: 'Locating',
              fromValue: undefined,
              toValue: undefined
          },
          fromValue: {
            name: undefined,
            city: undefined,
            coords: undefined
          },
          toValue: {
            name: undefined,
            city: undefined,
            coords: undefined
          }
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            currentUserInformation: newProps.currentUserInformation
        })
        if (newProps.fromValue) {
            this.setState({ fromValue: newProps.fromValue })
        }
        if (newProps.toValue) {
            this.setState({ toValue: newProps.toValue })
        }
    }
    render() {
        return(
          <View style={styles.inputContainerParent}>
            <View style= { styles.inputContainerBack }>
                <TouchableOpacity style={styles.containerBack} onPress={ this.props.cancelSearch.bind(this) }>
                  <Icon name="arrow-left" size={22} color='#46C1EC'></Icon>
                </TouchableOpacity>
                <View style={styles.containerInput}>
                  <TextInput style={styles.inputText}
                     onChangeText={ this.props.onChangeEvent.bind(this, 'from')}
                     placeholder={this.state.currentUserInformation.name} value={this.state.fromValue.name}/>
                </View>
            </View>
            <View style= { styles.inputContainer }>
              <View style={styles.containerBack}>
              </View>
              <View style={styles.containerInput}>
                <TextInput style={styles.inputText} placeholder={'Destination'}
                  onChangeText={ this.props.onChangeEvent.bind(this, 'to')}
                  value={this.state.toValue.name}/>
              </View>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  inputContainerBack: {
      flexDirection: 'row',
      width: width - 20,
      backgroundColor: '#FFFFFF',
      height: 50,
      marginTop: 40,
      borderBottomWidth: 1,
      borderBottomColor: '#F9F9F9',
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
  },
  inputContainer: {
      flexDirection: 'row',
      width: width - 20,
      backgroundColor: '#FFFFFF',
      height: 50,
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
  },
  containerInput: {
      flex: 0.85,
      height: 50
  },
  inputText: {
      height: 50,
      backgroundColor: 'transparent'
  },
  containerBack: {
      flex: 0.15,
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center'
  }
})

AppRegistry.registerComponent('InputContainer', () => InputContainer)
