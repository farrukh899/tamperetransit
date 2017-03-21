import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    AppRegistry
} from 'react-native'
const {width, height} = Dimensions.get('window');
const _ = require('lodash')
import commonStyles from '../../utilities/commonStyles.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class CardItem extends Component {
    constructor(props) {
        super()
    }
    getDistance(distance, leg) {
        return leg.type === '1' ? leg.code : distance < 1000 ? `${(distance).toFixed(0)}m` : `${(distance / 1000).toFixed(0)}km`
    }
    render() {
        return(
          <TouchableOpacity style={[styles.cardView, commonStyles.containerColumn]} onPress={this.props.onSelect.bind(this, this.props.routeConfig)}>
            <View style={[commonStyles.containerRow, commonStyles.flex100]}>
              {this.props.hasClose ? <TouchableOpacity onPress = {this.props.closeRoute.bind(this)} style={styles.closeIcon}><Icon name={'close'} color={'#BBBBBB'} size={18} /></TouchableOpacity> : null}
              <View style={[commonStyles.containerColumn, commonStyles.flex80]}>
                <View style={commonStyles.flex100, commonStyles.containerRow}>
                  {_.map(this.props.routeConfig.route.legs, (leg) => {
                      return(
                        <View style={[commonStyles.containerColumn, commonStyles.centerCenter, styles.icon]}>
                          <View style={[styles.iconRound, commonStyles.centerCenter, {backgroundColor: leg.type === 'walk' ? '#00CEBD' : '#FC718B'}]}><Icon name={ leg.type === 'walk' ? 'walk' : 'bus'} color={'#FFFFFF'} size={20}></Icon></View>
                          <Text style={[commonStyles.textSmall, commonStyles.textBlue]}>{this.getDistance(leg.length, leg)}</Text>
                        </View>
                      )
                  })}
                </View>
                <View style={[commonStyles.flex100, commonStyles.containerRow, commonStyles.centerStart]}>
                  <Text style={[commonStyles.blueText]}>
                    {this.props.routeConfig.startingStop}</Text><Icon style={styles.arrow} name={'arrow-right-bold'} size={16} color={'#3F4F65'}></Icon>
                  <Text style={[commonStyles.blueText]}>{this.props.routeConfig.endingStop}</Text>
                </View>
              </View>
              <View style={[commonStyles.flex20, commonStyles.centerCenter, commonStyles.containerColumn]}>
                <Text style={[commonStyles.boldText, commonStyles.textLarge, commonStyles.blueText]}>
                  {this.props.routeConfig.totalDuration.time}
                </Text>
                <Text style={commonStyles.blueText}>{this.props.routeConfig.totalDuration.unit}</Text>
              </View>
            </View>
            <View style={[commonStyles.flex05, commonStyles.centerCenter, commonStyles.containerRow]}>
              <View style={styles.seperator}></View>
            </View>
            <View style={[commonStyles.containerRow, commonStyles.flex25, commonStyles.centerStart, styles.infoContainer]}>
              <Icon name={'bus'} size={22} color={'#3F4F65'}/>
              <Text style={commonStyles.blueText}>{this.props.routeConfig.departAt} {this.props.routeConfig.startingStop}</Text>
              <View style={[commonStyles.centerCenter, styles.codeContainer]}><Text style={commonStyles.textSmall}>{this.props.routeConfig.startStopCode}</Text></View>
            </View>
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
  cardView: {
      width: width - 20,
      height: 150,
      marginBottom: 8,
      backgroundColor: '#ffffff',
      borderRadius: 2,
      flexDirection: 'row',
      padding: 14
  },
  icon: {
      marginRight: 8
  },
  arrow: {
    marginLeft: 10,
    marginRight: 10
  },
  iconRound: {
      height: 35,
      width: 35,
      borderRadius: 40,
      flexDirection: 'column',
      overflow: 'hidden'
  },
  seperator: {
      flex: 1,
      height: 1,
      backgroundColor: '#F8F8F8'
  },
  infoContainer: {
      marginTop: 5
  },
  closeIcon: {
      position: 'absolute',
      right: 0,
      top: 0
  },
  codeContainer: {
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    marginLeft: 10,
    padding: 4
  },
})

AppRegistry.registerComponent('CardItem', () => CardItem)
