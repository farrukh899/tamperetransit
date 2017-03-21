import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    LayoutAnimation,
    TextInput,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import service from '../../services/location/index.js'
import SearchList from '../../components/searchList/index.js'
import Suggestions from '../../components/suggestions/index.js'
import InputContainer from '../../components/inputComponent/index.js'
import SearchResults from '../../components/searchResults/index.js'
import styles from './styles.js'

const {width, height} = Dimensions.get('window')

export default class SearchView extends Component {
    constructor(props) {
        super()
        this.state= {
          showSearch: props.searchState,
          coords: props.currentLocation,
          currentUserInformation: {
              name: 'Locating'
          },
          searchPhrase: undefined,
          editingField: undefined,
          fromValue: undefined,
          fromCoords: undefined,
          toValue: undefined,
          toCoords: undefined,
          searching: false,
          searchEnabled: false,
          routes: []
        }
    }

    textChange(type, location) {
        switch (type) {
          case 'from':
            this.setState({searchPhrase: location, editingField: 'from', fromValue: location});
          break;
          case 'to':
            this.setState({searchPhrase: location, editingField: 'to', toValue: location});
          break;
        }
        if (this.state.fromValue !== undefined && this.state.toValue !== undefined) {
            this.setState({ searchEnabled: true })
        }
    }
    componentWillReceiveProps(newProps) {
        LayoutAnimation.easeInEaseOut()
        newProps.searchState === false ? this.setState({ searchOpacity: 1 })
        : this.setState({ searchOpacity: 0 })
    }

    componentDidMount() {
        service.getNameFromCoordinates(this.props.currentLocation.latitude, this.props.currentLocation.longitude)
            .then((response) => {
                if (response && response.length > 0) {
                    this.setState({ currentUserInformation: response[0] })
                }
            })
    }

    closeSearch() {
        LayoutAnimation.easeInEaseOut()
        this.setState({ searchOpacity: 0, showSearch: false })
        this.props.closeCallback({ from: this.state.fromCoords, to: this.state.toCoords })
    }
    cancelSearch() {
        this.setState({ searchOpacity: 0, showSearch: false })
    }
    setField(value, item) {
        switch (this.state.editingField) {
          case 'from':
            this.setState({ fromValue: value })
            break;
          case 'to':
            this.setState({ toValue: value })
            break;
        }
    }
    /**
      * Route selected function, send the values back to main
      * {Object} route shape and information
      */
    selectRoute(route) {
        this.setState({ searchOpacity: 0, showSearch: false })
        this.props.closeCallback({ selectedRoute: route })
    }
    /**
      * Search for route TODO search partial addresses
      * {params none}
      */
    searchForRoutes() {
        this.setState({
          searching: true,
          searchEnabled: true
        })
        if (this.state.fromValue.coords && this.state.toValue.coords && this.state.searchEnabled) {
          service.searchRoute(this.state.fromValue.coords, this.state.toValue.coords)
              .then((response) => {
                  this.setState({
                      routes: response
                  })
              })
        } else if (this.state.searchEnabled && (!this.state.fromValue.coords || !this.state.toValue.coords)) {
            console.log('got here');
        }
    }

    render() {
        return(
          <View style={[styles.searchContainer, {opacity: this.state.searchOpacity}]}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.inputArea}>
              <InputContainer onChangeEvent={this.textChange.bind(this)}
                placeholderFroms={this.state.currentUserInformation}
                cancelSearch={this.cancelSearch.bind(this)}
                currentUserInformation={this.state.currentUserInformation}
                fromValue={this.state.fromValue} toValue={this.state.toValue}>
              </InputContainer>
            </View>
            { !this.state.searching ? <View style={styles.suggestionsContainer}>
              <Suggestions currentUserInformation={this.state.currentUserInformation}></Suggestions>
              <SearchList phrase={ this.state.searchPhrase } onSelectItem={ this.setField.bind(this) }></SearchList>
            </View> : null }
            { this.state.searching ? <View style={styles.suggestionsList}><SearchResults onSelect={this.selectRoute.bind(this)} routes={this.state.routes}></SearchResults></View> : null}
            <TouchableOpacity style={styles.searchButtonContainer} onPress={this.searchForRoutes.bind(this)}>
              <View style={[styles.searchButton, {backgroundColor: this.state.searchEnabled ? '#FC718B' : '#BBBBBB'}]}>
                <Text style={styles.buttonText}>Search</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
    }
}
AppRegistry.registerComponent('SearchView', () => SearchView)
