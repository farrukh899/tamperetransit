import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Dimensions,
    StatusBar,
    LayoutAnimation
} from 'react-native'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from '../../utilities/mapStyle.js';
import BusMap from '../../components/mapView/index.js';
import RouteIcon from '../../components/routeIcon/index.js';
import SearchView from '../searchView/index.js';
import service from '../../services/location/index.js';
import MenuIcon from '../../components/menuIcon/index.js';
import LoadingComponent from '../../components/loadingComponent/index.js';
import BottomFilter from '../../components/bottomFilters/index.js';
import TimerMixin from 'react-timer-mixin';
import FilterView from '../filterView/index.js';
const sample = require('./route-sample.json');

const { width, height } = Dimensions.get('window');
const _ = require('lodash')
const ASPECT_RATIO = width / height;
const LATITUDE = 61.4978;
const LONGITUDE = 23.7610;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class HomeView extends Component {
    constructor(props) {
        super()
        this.state = {
            currentCoordinates: {
                coords: {
                  latitude: 61.446491,
                  longitude: 23.85226
                }
            },
            showSearch: false,
            availableRoutes: sample,
            selectedRoute: {},
            isLoading: false,
            loadingMessage: '',
            busMarkers: [],
            mapState: 'stops',
            filterState: null,
            showRoute: false,
            indexAt: 1
        }
        mixins: [TimerMixin]
    }

    openSearch() {
        if(this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
            this.setState({busMarkers: []});
        }
        this.setState({ showSearch: true });
    }

    unmountSearch(items) {
      if (items) {
        this.setState({ showSearch: false, showRoute: true, selectedRoute: items  });
      } else {
          this.setState({ showSearch: false, showRoute: false})
      }
    }
    componentDidMount() {
        // Get users current location
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
              currentCoordinates: position
          })
        })
    }
    // Activate the bus view version
    busListRequest() {
      if (this.state.mapState === 'buses') {
        service.fetchAllBuses()
            .then((response) => {
                this.setState({
                    busMarkers: response,
                    isLoading: false
                })
            })
      }
    }
    showActiveBuses() {
      this.busListRequest()
      this.setState({ indexAt: 0, mapState: 'buses', isLoading: true, loadingMessage: 'Finding buses'})
      this.intervalId = setInterval(
        () => { this.busListRequest()}, 5000)
    }
    // Switch to showing the stops view here
    showStops(){
        if (this.state.mapState === 'buses') {
            this.setState({
                mapState: 'stops',
                busMarkers: [],
                indexAt: 1
            })
            clearInterval(this.intervalId);
        }
    }
    // Route selected will update and send values to the map component
    // Which will update the markers and draw a polyline
    routeSelected(route) {
        this.setState({ selectedRoute : route })
    }
    // when route selection is closed
    routeClosed() {
        this.setState({ showRoute: false })
    }
    // update state bus
    updateBusState(prop) {
      this.setState({
          filterState: prop.filterState
      });
    }
    // Component will recieve props
    componentWillReceiveProps(newProps) {
        if (!_.isUndefined(newProps.filterState)) {
          if(newProps.filterState === true && this.state.mapState === 'buses') {
            clearInterval(this.intervalId);
            this.updateBusState(newProps)
          } else if (newProps.filterState === false && this.state.mapState === 'buses') {
              this.updateBusState(newProps)
              this.showActiveBuses.bind(this)
          }
        }
    }
    // Render function
    render() {
        return(
          <View style={styles.container}>
            <StatusBar barStyle="light-content"></StatusBar>
            <BusMap styleMap={mapStyle.style}
              coords={ this.state.currentCoordinates }
              selectedRoute={this.state.selectedRoute}
              showRoute={this.state.showRoute}
              routeConfig={this.state.selectedRoute}
              onRouteClosed={this.routeClosed.bind(this)}
              busMarkers={this.state.busMarkers} showState={this.state.mapState}></BusMap>
            { this.state.showSearch ? <SearchView searchState={ this.state.showSearch }
              currentLocation={this.state.currentCoordinates.coords} closeCallback={this.unmountSearch.bind(this)}></SearchView> : null}
            { this.state.isLoading ? <LoadingComponent loadingMessage={ this.state.loadingMessage }></LoadingComponent> : null }
            { this.state.filterState ? <FilterView type={this.state.mapState} allBuses={this.state.busMarkers}></FilterView> : null}
            <View style={{ bottom: this.state.showRoute ? - 50 : 0}}>
              <BottomFilter onSearchOpen={this.openSearch.bind(this)} onStopsShow={this.showStops.bind(this)} indexAt={this.state.indexAt} onActiveBusesShow={this.showActiveBuses.bind(this)}></BottomFilter>
            </View>
          </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
     justifyContent: 'flex-end',
     alignItems: 'center',
     flex: 1
    }
})

AppRegistry.registerComponent('HomeView', () => HomeView)
