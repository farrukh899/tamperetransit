import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView, VibrancyView} from 'react-native-blur';
import Icon from 'react-native-vector-icons/Ionicons';


const {width, height} = Dimensions.get('window');

export default class BottmFilter extends Component {
    constructor(props) {
        super()
        this.state = {
            currentViewIndex: 1
        }
    }
    updateState() {
        this.setState({
            currentViewIndex: 2
        });
    }
    render() {
        return(
            <View style={styles.bottomFilter}>
                <View style={styles.iconContainer}>
                  <TouchableOpacity style={styles.filterIconItem} onPress={this.props.onActiveBusesShow.bind(this)}>
                    <Icon name={'ios-bus'} size={28} color={this.props.indexAt === 0 ? '#FFFFFF' : '#4C5870'}/>
                    <Text style={[styles.textIcon, {color: this.props.indexAt === 0 ? '#FFFFFF' : '#4C5870'}]}>Buses</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterIconItem} onPress={this.props.onStopsShow.bind(this)}>
                    <Icon name={'ios-map'} size={28} color={this.props.indexAt === 1 ? '#FFFFFF' : '#4C5870'}/>
                    <Text style={[styles.textIcon, {color: this.props.indexAt === 1 ? '#FFFFFF' : '#4C5870'}]}>Stops</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterIconItem} onPress={this.updateState.bind(this), this.props.onSearchOpen.bind(this)}>
                    <Icon name={'ios-search'} size={28} color={this.props.indexAt === 2 ? '#FFFFFF' : '#4C5870'}/>
                    <Text style={[styles.textIcon, {color: this.props.indexAt === 2 ? '#FFFFFF' : '#4C5870'}]}>Search</Text>
                  </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bottomFilter: {
        height: 50,
        backgroundColor: '#1E2D4A',
        width: width,
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        zIndex: 1,
        paddingTop: 4,
        paddingBottom: 4
    },
    iconContainer: {
      flexDirection: 'row',
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'flex-end',
      height: 45
    },
    filterIconItem: {
        flex:0.33,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomSelect: {
        height: 4,
        width: width/6,
        justifyContent: 'center',
        marginTop: 8,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textIcon: {
        fontSize: 10
    }
});

AppRegistry.registerComponent('BottomFilter', () => BottomFilter);
