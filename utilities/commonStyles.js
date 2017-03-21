import React, {Component }from 'react'
import {
    StyleSheet,
    Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    containerColumn: {
        flexDirection: 'column'
    },
    containerRow: {
        flexDirection: 'row'
    },
    centerCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    startCenter: {
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    centerStart: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    endCenter: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    centerEnd: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    flex100: {
        flex: 1
    },
    flex90: {
        flex: 0.9
    },
    flex85: {
        flex: 0.85
    },
    flex80: {
        flex: .80
    },
    flex75: {
        flex: 0.75
    },
    flex70: {
        flex: 0.70
    },
    flex65: {
        flex: 0.65
    },
    flex60: {
        flex: 0.60
    },
    flex55: {
        flex: 0.55
    },
    flex50: {
        flex: 0.50
    },
    flex45: {
        flex: 0.45
    },
    flex40: {
        flex: 0.40
    },
    flex35: {
        flex: 0.35
    },
    flex30: {
        flex: 0.30
    },
    flex25: {
        flex: 0.25
    },
    flex20: {
        flex: 0.20
    },
    flex15: {
        flex: 0.15
    },
    flex10: {
        flex: 0.10
    },
    flex05: {
        flex: 0.05
    },
    flexWrap: {
        flexWrap: 'wrap'
    },
    boldText: {
        fontWeight: 'bold'
    },
    blueText: {
        color: '#3F4F65'
    },
    textLarge: {
        fontSize: 28
    },
    textSmall: {
        fontSize: 10
    }
})

module.exports = styles;
