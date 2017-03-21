const config = {
    API_USER: 'transit',
    API_PASS: 'transit_app8925',
    API_BASE_URL: 'http://api.publictransport.tampere.fi/prod',
    ACCESS: {
        geocode: '?request=geocode',
        route: '?request=route',
        stop: '?request=stop',
        stopArea: '?request=stops_area',
        reverseGeoCode:'?request=reverse_geocode'
    },
    BUSES: {
        WITH_LINE: 'http://data.itsfactory.fi/siriaccess/vm/json?lineRef=',
        WITH_STOP: 'http://data.itsfactory.fi/journeys/api/1/stop-monitoring?stops='
    },
    SIRI_ACCESS: 'http://data.itsfactory.fi/siriaccess/vm/json',
    ALL_STOPS: 'http://data.itsfactory.fi/journeys/api/1/stop-points',
    GOOGLE_API_KEY: 'AIzaSyB3IEM1fCr5aLygviAdGVdW1iT3E3exzCg',
    GOOGLE_SEARCH_URL: 'https://maps.googleapis.com/maps/api/geocode/json'
}

export default {
    config
}
