import React, {Component} from 'react'
import {
    AppRegistry,
    View,
    Text,
    LayoutAnimation,
    Dimensions,
    StyleSheet
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default class MenuView extends Component {
    constructor(props) {
        super()
        this.state = {
            menuOpen: props.menuOpen,
            menuWidth: props.menuOpen ? 150 : 0
        }
    }

    componentWillReceiveProps(newProps) {
      if (newProps && newProps.menuOpen) {
          this.setState({
              menuOpen: newProps.menuOpen,
              menuWidth: 150
          })
      }
    }
    render() {
        return(
          <View style={ [styles.menuView, {width: this.state.menuWidth}] }></View>
        )
    }
}

const styles = StyleSheet.create({
    menuView: {
        height: height
    }
})
