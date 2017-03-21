import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Dimensions,
    LayoutAnimation
} from 'react-native';
const { width, height } = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const _ = require('lodash');

import service from '../../services/location/index.js'

export default class SearchList extends Component {
    constructor(props) {
        super()
        this.state = {
            suggestions: [],
            scrollViewHeight: 0
        }
    }

    componentWillReceiveProps(newProps) {
      if (newProps.phrase && newProps.phrase.length > 2) {
        service.searchLocation(newProps.phrase)
            .then((response) => {
                this.makeSuggestions(response)
            })
            .catch((error) => {
            })
      }
    }

    makeSuggestions(locations) {
        const suggestionView = _.map(locations, (item, index) => {
            return(
              <TouchableOpacity style={ styles.listItem } key={index} onPress={this.props.onSelectItem.bind(this, item)}>
                  <View style={styles.listIcon}>
                    <FontAwesome name={'crosshairs'} size={18}></FontAwesome>
                  </View>
                  <View style={styles.listDescription}>
                    <Text style={styles.address}>{item.name}</Text>
                    <Text style={styles.city}>{item.city}</Text>
                  </View>
              </TouchableOpacity>
            )
        });
        LayoutAnimation.easeInEaseOut();
        this.setState({ suggestions: suggestionView })
        if (locations.length > 2) {
            this.setState({ scrollViewHeight: 150 })
        } else {
            this.setState({ scrollViewHeight: 100 })
        }
    }

    render() {
        return(
          <View style={[styles.searchListContainer, {height: this.state.scrollViewHeight}]}>
            <ScrollView style={styles.scrollViewStyle}>
              {this.state.suggestions}
            </ScrollView>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollViewStyle: {
        backgroundColor: '#ffffff',
        flex: 1,
        borderBottomRightRadius: 2,
        borderBottomLeftRadius: 2
    },
    listItem: {
        flexDirection: 'row',
        height: 50,
        width: width -20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F9F9F9F9'
    },
    listIcon: {
        flex: 0.15,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listDescription: {
        flex: 0.85,
        height: 50,
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
    searchListContainer: {
        width: width - 20,
        flexDirection: 'column'
    }
})

AppRegistry.registerComponent('SearchList', () => SearchList)
