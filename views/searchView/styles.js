import React, {Component }from 'react'
import {
    StyleSheet,
    Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  searchContainer: {
      width: width,
      height: height,
      backgroundColor: 'rgba(30,45,74,0.93)',
      position: 'absolute',
      bottom:0,
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 2,
      paddingTop: 40
  },
  inputArea: {
      flex:0.3,
      alignItems: 'center'
  },
  suggestionsContainer: {
      flex: 0.8,
      alignItems: 'center'
  },
  suggestionsList: {
      flex: 0.8
  },
  searchButtonContainer: {
      flex: 0.1,
      width: width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
  },
  searchButton: {
      height: 40,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  centerStart: {
      alignItems: 'flex-start',
      justifyContent: 'center'
  },
  address: {
      fontSize: 14
  },
  city: {
      fontSize: 12,
      color: '#777777'
  },
  buttonText: {
      fontSize: 16,
      color: '#ffffff',
      fontWeight: '600'
  }
})

module.exports = styles;
