import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Dimensions,
    LayoutAnimation,
    ScrollView,
    TouchableOpacity,
    ListView
} from 'react-native';
const {width, height} = Dimensions.get('window');
const _ = require('lodash')
export default class FilterView extends Component {
    constructor(props) {
        super()
        this.state = {
            buses:[]
        }
    }

    componentDidMount() {
        const buses = _.map(_.uniqBy(this.props.allBuses, 'MonitoredVehicleJourney.LineRef.value'), (bus, index) => {
            return (
              <TouchableOpacity style={styles.busIcon} key={index}>
                <Text style={styles.iconText}>{bus.MonitoredVehicleJourney.LineRef.value}</Text>
              </TouchableOpacity>
            )
        });
        this.setState({
            buses: buses
        });
    }

    render() {
        return(
          <View style={styles.filterView}>
                <ScrollView contentContainerStyle={styles.listViewStyle}>
                  {this.state.buses}
                </ScrollView>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    filterView: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        paddingTop: 70,
        backgroundColor: 'rgba(30,45,74,0.93)',
        zIndex: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    },
    busIcon: {
        width: width/5 - 5,
        height: width/5 - 5,
        backgroundColor: '#00CEBD',
        borderRadius: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    scrollStyle: {
        width: width
    },
    listViewStyle: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: width,
      justifyContent: 'center'
    },
    iconText: {
        fontSize: 14,
        color: '#ffffff'
    }
});

AppRegistry.registerComponent('FilterView', () => FilterView)
