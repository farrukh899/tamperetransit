import React, {Component} from 'react'
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons';


export default class RouteIcon extends Component {
    constructor() {
        super()
    }

    componentDidMount() {

    }

    render() {
        return(
          <TouchableOpacity style={ styles.routeIconArea} onPress={ this.props.selection }>
            <Icon name="search" size={24}></Icon>
          </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    routeIconArea: {
        width:50,
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        position: 'absolute',
        top: 35,
        right: 15,
        shadowOffset: { width:0, height: 0},
        shadowRadius: 4,
        shadowOpacity: 0.2,
        shadowColor: '#000000',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

AppRegistry.registerComponent('RouteIcon', () => RouteIcon)
