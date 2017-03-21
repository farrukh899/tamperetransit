import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image
} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
const { width, height } = Dimensions.get('window');
import location from '../../services/location/index.js';
import LoadingComponent from '../loadingComponent/index.js';
import BusIcon from '../busIcon/index.js';
import CardItem from '../cardItem/index.js'
const _ = require('lodash')

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0102;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class BusMap extends Component {
    constructor(props) {
        super()
        this.state = {
            markers: [],
            isLoading: false,
            loadingMessage: 'Finding maps',
            type: 'stops',
            polylines: {
              polylines:[],
              type: []
            },
            showState: 'stops',
            selectedRoute: {},
            showRoute: false
        }
    }
    componentDidMount() {
      // Step one is to load all the stops in the area
      const { latitude, longitude } = this.props.coords.coords;
      this.setState({
          showState: this.props.showState
      })
      //  Get the markers for the location
      this.getAreaStops(latitude, longitude, 10000)
      //  Set the markers on the map, by setting the state
    }
    // Make polylines here
    makePolyLines(routeConfig) {
        this.setState({
            polylines: {
                type: _.map(routeConfig.route.legs, (leg) => leg.type),
                polylines: _.map(routeConfig.route.legs, (leg) => {
                    return _.map(leg.shape, (shape) => ({ longitude: shape.x, latitude: shape.y, type: leg.type}))
                })
            }
        })
    }
    //  Have the component will recieve props here

    //  Which, when recieves props for route, will update markers and etc
    componentWillReceiveProps(newProps) {
      if (newProps.showState === 'buses' && newProps.busMarkers.length > 0) {
          this.getActiveBuses(newProps.busMarkers, newProps.showState)
      } else if (newProps.showState === 'stops') {
          this.setState({ showState: 'stops' })
          const { latitude, longitude } = this.props.coords.coords;
          this.getAreaStops(latitude, longitude, 1500)
      }

      if (newProps.showRoute === true && newProps.routeConfig) {
          this.setState({ type: 'route', showState: 'route', showRoute: newProps.showRoute, selectedRoute: newProps.routeConfig.selectedRoute })
          this.makePolyLines(newProps.routeConfig.selectedRoute);
      }

      else if(this.state.showRoute === true && newProps.showRoute === false) {
          this.setState({ type: 'stops', showState: 'stops', showRoute: newProps.showRoute, selectedRoute: {}, polylines: {polylines:[], type:[]} })
      }
    }
    // Gets the stops in the specific area
    getAreaStops(latitude, longitude, radius) {
      if(this.state.polylines.polylines.length === 0) {
        this.setState({ markers: [], isLoading: true, loadingMessage: 'Finding stops'})
        location.getStopsInArea(latitude, longitude, 2000)
            .then((response) => {
                this.setState({
                    markers: response,
                    isLoading: false,
                    type: 'stops'
                })
            })
      }
    }
    // gets markers for active buses
    getActiveBuses(buses, showState) {
        const busLocations = _.map(buses, (bus) => {
            return {
                lineNo: bus.MonitoredVehicleJourney.LineRef.value,
                longitude: bus.MonitoredVehicleJourney.VehicleLocation.Longitude,
                latitude: bus.MonitoredVehicleJourney.VehicleLocation.Latitude,
                direction: bus.MonitoredVehicleJourney.DirectionRef.value
            }
        });
        this.setState({
            showState: showState,
            markers: busLocations
        })
    }
    updateStops(coords) {
      if (this.state.showState === 'stops') {
        this.getAreaStops(coords.latitude, coords.longitude, 2000)
      }
    }
    closeRoute() {
        this.setState({ showRoute: false })
    }
    render() {
        return(
          <View style={styles.MapContainer}>
            <MapView
               customMapStyle = { this.props.styleMap }
               provider={PROVIDER_GOOGLE}
               style={styles.mapStyle}
               showsUserLocation={true}
               onRegionChangeComplete={this.updateStops.bind(this)}
               followsUserLocation={true}
               showsMyLocationButton={true}
               initialRegion={{
                 latitude: this.props.coords.coords.latitude,
                 longitude: this.props.coords.coords.longitude,
                 latitudeDelta: LATITUDE_DELTA,
                 longitudeDelta: LONGITUDE_DELTA,
               }}>
              {this.state.showState === 'stops'?this.state.markers.map((marker, index) => (
                  <MapView.Marker key={index}
                    coordinate={{ latitude: parseFloat(_.split(marker.coords, ',')[1]), longitude: parseFloat(_.split(marker.coords, ',')[0]) }}>
                    <View style={styles.markerStop}><View style={styles.markerInner}></View></View>
                  </MapView.Marker>
              )): null}
              {this.state.showState === 'buses' ? this.state.markers.map((marker, index) => (
                <MapView.Marker key={index}
                  coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}>
                  <BusIcon busInfo={marker}></BusIcon>
                </MapView.Marker>
              )): null}
              {this.state.polylines.type.map((line, index) => (
                  <MapView.Polyline coordinates={this.state.polylines.polylines[index]} key={index} strokeColor='#46C1EC' miterLimit={13} fillColor={line === 'walk' ? '#2c2c2c' : '#46C1EC'} strokeWidth={line === 'walk' ? 3 : 5}></MapView.Polyline>
              ))}
            </MapView>
            {this.state.showRoute ? <CardItem routeConfig={this.state.selectedRoute} closeRoute={this.props.onRouteClosed.bind(this)}
            hasClose={true} onSelect={this.props.onRouteClosed.bind(this)}/> : null}
            {this.state.isLoading ? <LoadingComponent loadingMessage={this.state.loadingMessage}></LoadingComponent> : null }
        </View>
        )
    }
}

const styles = StyleSheet.create({
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  MapContainer: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'flex-end'

  },
  markerStop: {
      width: 20,
      height: 20,
      backgroundColor: '#00CEBD',
      borderRadius: 40,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
  },
  markerInner: {
     width: 15,
     height: 15,
     backgroundColor: '#ffffff',
     borderRadius: 40
  }
})

AppRegistry.registerComponent('BusMap', () => BusMap)
