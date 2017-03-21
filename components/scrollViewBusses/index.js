import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    Dimensions
} from 'react-native'
import styles from './styles.js';

const _ = require('lodash');
const {width, height} = Dimensions.get('window');
const moment = require('moment');

export default class ScrollBusses extends Component {
    constructor(props) {
        super()
        this.state = {
            routes: [],
            cards: []
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps && newProps.routes && newProps.routes.length > 0) {
            if((_.intersection(newProps.routes, this.state.routes)).length === 0) {
                this.setState({
                    routes: newProps.routes
                })
                this.makeCards(newProps.routes);
            }
        }
    }
    // Get the bus details and route details
    getConfiguration(route) {
        const typeBus = _.filter(route[0].legs, {type: '1'});
        const typeWalk = _.filter(route[0].legs, {type: 'walk'});
        const firstStep = route[0].legs[0]
        const lastStep = _.last(route[0].legs)
        return {
            noOfBusses: typeBus.length,
            startingStop: typeBus[0].locs[0].name,
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
            route: route[0]
        }
    }

    makeCards(routes) {
        const cards = _.map(routes, (route,index) => {
            const configBus = this.getConfiguration(route);
            return (
                <TouchableOpacity style={styles.cardContainer} key={index} onPress={ this.props.onSelectRoute.bind(this, configBus) }>
                    <View style={styles.busInfo}>
                      <View style={[styles.rowContainer, styles.startCenter]}>
                        <View style={[styles.iconContainer, styles.startCenter]}>
                          {_.map(configBus.buses, (bus, index) => {
                              return(
                                <View style={styles.busInfoIcon} key={index}><Text style={styles.busInfoText}>{bus}</Text></View>
                              )
                          })}
                          <Text style={[styles.textSmall, styles.textLightGrey]}>{configBus.noOfBusses > 1 ? 'CONNECTING' : 'DIRECT'}</Text>
                        </View>
                      </View>
                        <View style={[styles.rowContainer, styles.startCenter, styles.paddingTopBottom]}>
                          <Text style={[styles.textMedium, styles.textBlack]}>{configBus.startingStop} {configBus.endingStop}</Text>
                        </View>
                        <View style={[styles.columnContainer, styles.startStart]}>
                          <Text style={[styles.textSmall, styles.textLightGrey]}>Walk {configBus.walkDuration} MIN</Text>
                          <Text style={[styles.textSmall, styles.textBlue]}>{configBus.walkDistance} KM</Text>
                        </View>
                    </View>
                    <View style={[styles.routeStats, styles.centerCenter, styles.paddingTopBottom]}>
                        <Text style={[styles.textBig, styles.textBlue]}>{configBus.totalDuration.time}</Text>
                        <Text style={[styles.textSmall, styles.textLightGrey]}>{configBus.totalDuration.unit}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
        this.setState({
            cards: cards
        })
    }

    render() {
        return(
          <ScrollView style={styles.scrollStyle}>
            {this.state.cards}
          </ScrollView>
        )
    }
}

AppRegistry.registerComponent('ScrollBusses', () => ScrollBusses)
