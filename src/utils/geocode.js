const request = require('request');
const debug = require('debug')('app:geocode');

const geocode = (address, callback) => {
    debug('geocode called.................')
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoid2lsbGFjYWNpdXMiLCJhIjoiY2p3dDRhNjgyMDJhcDN6cGtxdGM0bzJzMCJ9.bSO0RLU3jz7V23HFBrw06Q`

    //instead of using res i.e response we use property of response in distinct variable { body }
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            debug(err)
            callback('Uanble to connect to server.', undefined);
            
            //for error even when we have right url
        } else if (body.features.length === 0) {
            debug('Unable to get the weather of given location. Try search again!');
            callback('Unable to get the weather of given location. Try search again!', undefined);
            
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
            // debug(Chalk.blue(`latitude: ${latitude} and longitude: ${longitude}`));
        }
    })

}

module.exports = geocode;