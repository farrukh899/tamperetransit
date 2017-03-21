import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native'
const _ = require('lodash')
const {width, height} = Dimensions.get('window');
import commonStyles from '../../utilities/commonStyles.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardItem from '../cardItem/index.js'
export default class SearchResults extends Component {
    constructor(props) {
        super()
        this.state = {
            routes: [],
            cards: []
        }
    }
    // Get the bus details and route details
    getRouteConfig(route) {
        const typeBus = _.filter(route[0].legs, {type: '1'});
        const typeWalk = _.filter(route[0].legs, {type: 'walk'});
        const firstStep = route[0].legs[0]
        const lastStep = _.last(route[0].legs)
        return {
            noOfBusses: typeBus.length,
            startingStop: typeBus[0].locs ? typeBus[0].locs[0].name : 'N/A',
            endingStop: _.last(typeBus[typeBus.length-1].locs).name,
            buses: _.map(typeBus, (bus) =>  bus.code),
            departAt: moment(firstStep.locs[0].arrTime, 'YYYYMMDDHHmm').format('HH:mm'),
            arriveAt: moment((_.last(lastStep.locs)).depTime, 'YYYYMMDDHHmm').format('HH:mm'),
            walkDistance: (parseFloat(_.sumBy(typeWalk, 'length') / 1000)).toFixed(2),
            walkDuration: (parseFloat(_.sumBy(typeWalk, 'duration') / 60)).toFixed(2),
            totalDuration: {
                time: ((route[0].duration) / 60) > 60 ? ((route[0].duration / 120)) : ((route[0].duration) / 60),
                unit: ((route[0].duration) / 60) > 60 ? 'HRS' : 'MIN'
            },
            route: route[0],
            startStopCode: typeBus[0].locs[0].shortCode
        }
    }
    getDistance(distance, leg) {
        return leg.type === '1' ? leg.code : distance < 1000 ? `${(distance).toFixed(0)}m` : `${(distance / 1000).toFixed(0)}km`
    }
    /**
      * Make the route cards over here
      * {[Array] => layoutArray}
      */
    calculateRoutes(routes) {
        const card = _.map(routes, (route, index) => {
            const routeConfig = this.getRouteConfig(route);
            return (
                <CardItem key={index} onSelect={this.props.onSelect.bind(this)} hasClose={false} routeConfig={routeConfig}/>
            )
        })
        this.setState({
            cards: card
        })
    }
    /**
      * {componentWillReceiveProps} set the route cards
      * {routeArray[]}
      */
    componentWillReceiveProps(newProps) {
        this.setState({
            routes: newProps.routes
        })
        this.calculateRoutes(newProps.routes);
    }
    /**
      * Component will mount and recieve two values
      * {startingLoc, toLoc}
      **/
    componentDidMount() {

    }
    render() {
        return(
          <View style={styles.parentScroll}>
            <ScrollView contentContainerStyle={styles.listViewStyle} automaticallyAdjustContentInsets={false}>
              {this.state.cards}
            </ScrollView>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    parentScroll: {
        flex: 1,
    },
    containeLeft: {
      flex: 0.75
    },
    containerRight: {
      flex: 0.25
    },
    listViewStyle: {
      flexDirection: 'column',
      width: width,
      flex: 1,
      alignItems: 'center'
    },
    infoContainer: {
        marginTop: 5
    }
})

AppRegistry.registerComponent('SearchResults', () => SearchResults)
