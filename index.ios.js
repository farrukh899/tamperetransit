/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  Dimensions,
  StatusBar,
  Navigator,
  TouchableOpacity
} from 'react-native';
const {width, height} = Dimensions.get('window');

import HomeView from './views/home/index.js'
import MenuView from './views/menuView/index.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import Service from './services/location/index.js';
import DBQueries from './services/database/index.js';
global.moment = require('moment');

export default class tamperetransit extends Component {
  constructor() {
      super()
      this.state = {
        menuOpen: false,
        menu: {
          marginLeft: 0,
          height: height,
          borderRadius: 0,
          marginTop: 0
        },
        filterOpen: false
      }
  }

  static NavigationBarRouterMapper = props => ({
    LeftButton(route, navigator, index)  {
      if(index === 0) {
        return (<TouchableOpacity style={styles.padded}><Icon name={'bars'} size={22} color={'#ffffff'}></Icon></TouchableOpacity>)
      } else {
          return null
      }
    },
    RightButton(route, navigator, index) {
      return (<TouchableOpacity style={styles.padded} onPress={props.openFilter.bind(props)}>
                <Icon name={'filter'} size={22} color={'#ffffff'}></Icon>
              </TouchableOpacity>)
    },
    Title(route, navigator, index) {
      if(index === 0) {
          return (<View style={styles.padded}><Text style={styles.headerText}>Transit</Text></View>)
      } else {
          return null;
      }
    }
  });

  // close databse callback
  openFilter() {
      this.setState({
          filterOpen: !this.state.filterOpen
      })
  }
  menuState() {
      LayoutAnimation.spring();
      if (this.state.menuOpen) {
        this.setState({ menuOpen: false, menu: { marginLeft: 0 , borderRadius: 0, marginTop: 0 } })
      } else {
        this.setState({ menuOpen: true, menu: { marginLeft: width - 150, borderRadius: 4, shadowOpacity: 0.15, shadowRadius:4, shadowOffset: {width: -1, height: 0}, shadowColor: '#000000'} })
      }
  }
  renderScene(route, navigator) {
      switch (route.index) {
        case 0:
          return <HomeView menuState={ this.menuState.bind(this) }
            navigator={ navigator } filterState={ this.state.filterOpen }></HomeView>
          break;
        default:
          return <HomeView menuState={ this.menuState.bind(this) } navigator={ navigator }></HomeView>
      }
  }
  render() {
    return (
      <View style={styles.container}>
        <Navigator
            initialRoute={{ index: 0 }}
            renderScene={ this.renderScene.bind(this) }
            navigationBar={
              <Navigator.NavigationBar
                style={ styles.navigatorStyle }
                routeMapper= {tamperetransit.NavigationBarRouterMapper(this)}/>
            }
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#DFDFDF'
  },
  homeContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    justifyContent: 'center',
    width: width,
    backgroundColor: '#ffffff',
    height: height
  },
  navigatorStyle: {
      backgroundColor: '#1E2D4A',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 15
  },
  padded: {
      padding: 8
  },
  headerText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 18,
      alignSelf: 'flex-end'
  }
});

AppRegistry.registerComponent('tamperetransit', () => tamperetransit);
