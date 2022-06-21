require('dotenv').config();

const appUrlBuilder = function(href) {
    return process.env.APP_URL + '?' + href.split('?')[1];
}

module.exports.appUrlBuilder = appUrlBuilder;
