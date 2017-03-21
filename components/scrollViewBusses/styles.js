import React, {Component }from 'react'
import {
    StyleSheet,
    Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollStyle: {
      flex: 1,
      backgroundColor: '#FFFFFF'
  },
  cardContainer: {
      width: width,
      borderBottomWidth: 1,
      borderBottomColor: '#F7F7F7',
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      padding: 15
  },
  busInfo: {
      flex: 1,
      flexDirection: 'column'
  },
  routeStats: {
      flex: 0.2,
      flexDirection: 'column'
  },
  iconContainer: {
      flex: 0.55,
      flexDirection: 'row'
  },
  busInfoIcon: {
      width: 25,
      height: 25,
      borderRadius: 30,
      backgroundColor: '#46C1EC',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8
  },
  busInfoText: {
      color: '#FFFFFF',
      fontSize: 12
  },
  typeContainer: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      flex: 0.45
  },
  rowContainer: {
      flexDirection: 'row',
      flex: 1
  },
  columnContainer: {
      flexDirection: 'column',
      flex: 1
  },
  startCenter: {
      alignItems: 'center',
      justifyContent: 'flex-start'
  },
  startStart: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
  },
  centerCenter: {
      alignItems: 'center',
      justifyContent: 'center'
  },
  textBig: {
      fontSize: 24
  },
  textBlue: {
      color: '#46C1EC'
  },
  textSmall: {
      fontSize: 12
  },
  textLightGrey: {
      color: '#6A6A6A'
  },
  textMedium: {
      fontSize: 16
  },
  textBlack: {
      color: '#0C0C0C'
  },
  paddingTopBottom: {
      marginTop: 4,
      marginBottom: 4
  }
})

module.exports = styles;
