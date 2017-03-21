import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MenuIcon extends Component {
    constructor() {
        super()
    }

    render() {
        return(
          <TouchableOpacity style={ styles.menuIconArea} onPress={ this.props.selection }>
            <Icon name="md-menu" size={24} color={'#FFFFFF'}></Icon>
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
  menuIconArea: {
      width:50,
      height: 50,
      backgroundColor: '#46C1EC',
      borderRadius: 4,
      position: 'absolute',
      top: 35,
      left: 15,
      shadowOffset: { width:0, height: 0},
      shadowRadius: 4,
      shadowOpacity: 0.2,
      shadowColor: '#000000',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
  }
})

AppRegistry.registerComponent('MenuIcon', () => MenuIcon);
