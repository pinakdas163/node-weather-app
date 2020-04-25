const axios = require('axios');

const appid = '82db7afac59307c8db42dc19c7ad2da1';
const url = 'https://api.openweathermap.org/data/2.5/weather';

const getForcast = async function (lat = null, lon = null) {
    try {
        const res = await axios.get(url, { params: { appid, lat, lon, units: 'metric' } });
        return res.data;
    } catch (error) {
        return { error };
    }
}

module.exports = { getForcast }