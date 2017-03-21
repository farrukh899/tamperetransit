const config = require('../../utilities/config.js').default.config;
const _ = require('lodash')

function getStopsInArea(latitude, longitude, diameter) {
    const url = `${config.API_BASE_URL}${config.ACCESS.stopArea}&user=${config.API_USER}&pass=${config.API_PASS}&&center_coordinate=${longitude},${latitude}&diameter=${diameter}&epsg_out=4326&epsg_in=4326`
    return fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(responseJson => responseJson)
}

function getNameFromCoordinates(latitude, longitude) {
    const url = `${config.API_BASE_URL}${config.ACCESS.reverseGeoCode}&user=${config.API_USER}&pass=${config.API_PASS}&coordinate=${longitude},${latitude}&epsg_in=4326&&epsg_out=4326`;
    return fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(responseJson => responseJson)

}

function searchLocation(name) {
    const url = `${config.API_BASE_URL}${config.ACCESS.geocode}&user=${config.API_USER}&pass=${config.API_PASS}&key=${name}&limit=4&epsg_out=4326`;
    return fetch(url, { method: 'GET' }).then(response => response.json())
    .then(responseJson => responseJson)
    .catch(error => error)
}

function searchRoute(from, to) {
    const url = `${config.API_BASE_URL}${config.ACCESS.route}&user=${config.API_USER}&pass=${config.API_PASS}&from=${from}&to=${to}&show=5&detail=full&epsg_out=4326&epsg_in=4326`;
    return fetch(url, { method: 'GET' })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        });
}

function fetchAllBuses() {
    const url = `${config.SIRI_ACCESS}`
    return fetch(url, { method: 'GET'})
        .then((response) => response.json())
        .then((responseJson) => responseJson.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].VehicleActivity)
}

function fetchAllStops(latitude, longitude) {
    const url = `${config.ALL_STOPS}?location=${latitude},${longitude}`
    return fetch(url, { method: 'GET'})
        .then((response) => response.json())
        .then((responseJson) => responseJson.body)
}

function searchLocationGoogle(phrase) {
    const url = `${config.GOOGLE_SEARCH_URL}?address=${phrase},+Finland&language=fi&key=${config.GOOGLE_API_KEY}`
    console.log(url);
    return fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(responseJson => responseJson)
}
export default {
    getStopsInArea,
    getNameFromCoordinates,
    searchLocation,
    searchRoute,
    fetchAllBuses,
    fetchAllStops,
    searchLocationGoogle
}
