import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native'

export default class BusIcon extends Component {
    constructor(props) {
        super()
    }

    render() {
        return(
          <View style={[styles.busIcon, {backgroundColor: this.props.busInfo.direction === '1' ? '#00CEBD' : '#FC718B'}]}>
            <Text style={styles.busIconText}>{this.props.busInfo.lineNo}</Text>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    busIcon: {
        width: 30,
        height: 30,
        flexDirection: 'column',
        borderRadius: 26,
        alignItems:'center',
        justifyContent: 'center'
    },
    busIconText: {
        color: '#FFFFFF',
        fontSize: 12
    }
})

AppRegistry.registerComponent('BusIcon', ()=> BusIcon)
