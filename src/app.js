const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geolocation = require('./util/geolocation');
const forcast = require('./util/forcast');

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help'
    })
})

app.get('/weather', async (req, res) => {
    const query = req.query;
    if (!query.address) {
        res.status(400).send({
            error: 'Invalid parameter passed'
        })
        return;
    }
    
    const location = await geolocation.getGeoLocation(query.address);
    if (location.error) {
        res.status(400).send({
            error: 'Cannot find location details with the searched string'
        })
        return;
    }

    const weather = await forcast.getForcast(location.lat, location.lon);
    if (weather.error) {
        res.status(500).send({
            error: 'No weather forcast found for this searched address'
        })
        return;
    }
    res.send({
        name: weather.name,
        display_name: location.display_name,
        description: weather.weather[0].description,
        current_temp: weather.main.temp,
        feels_like: weather.main.feels_like,
        max_temp:weather.main.temp_max,
        min_temp: weather.main.temp_min,
        humidity: weather.main.humidity
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})