
//built-in
const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

const app = express();

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')

console.log(__dirname);
console.log(path.join(__dirname, '..'));

//setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        detail: 'Use this site to check weather in your location.',
        name: 'Rohan Rajthala'
    });
})

//route to help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Here !!!',
        helpTxt: 'This is some helpful text.',
        name: 'Rohan Rajthala'
    })
});

//route to about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me!!!',
        name: 'Rohan Rajthala'
    })
});


//route to show weather data
app.get('/weather', (req, res) => {

    const { query } = req;

    if (!query.address) {
        return res.send({
            error: 'You must provide the search address'
        })
    }
    console.log(query.address);
    geocode(query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                title: 'Error',
                name: 'Rohan Rajthala',
                error
            });
        };

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    title: 'Error',
                    name: 'Rohan Rajthala',
                    error
                });
            }

            res.send({
                location,
                forecast: data
            });
        });


    });
});


app.get('/products', (req, res) => {
    const { query } = req;

    if (!query.search) {
        return res.send({
            error: 'You must provide the search query.'
        })
    }


    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Rohan Rajthala',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Rohan Rajthala',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up and running in port 3000');
});