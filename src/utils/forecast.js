const request = require('request');
const debug = require('debug')('app:forecast');

const forecast = (latitude, longitude, callback) => {
    debug('forecast called..................')
    const url = `https://api.darksky.net/forecast/a132317dff02f1ecd62bee581f3bd400/${latitude},${longitude}?units=si`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Server error!', undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            const data = `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degree out. There is a ${body.currently.precipProbability}% chance of raining.`;
            callback(undefined, data);
        }
    });

}

module.exports = forecast;