const axios = require('axios');

const key = '4d06eb2767c7c5';
const url = 'https://us1.locationiq.com/v1/search.php';

const getGeoLocation = async function (address = '') {
    try {
        const response = await axios.get(url, { params: { key, format: 'json', limit: 1, q: encodeURIComponent(address) } });
        return response.data[0];
    } catch (error) {
        return { error };
    }
}

module.exports = { getGeoLocation };