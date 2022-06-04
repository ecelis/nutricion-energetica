require('dotenv').config();

const urlBuilder = function(href) {
    if (process.env.PORT) {
        return process.env.BASE_URL + ':' + process.env.PORT + href;
    }
}

module.exports.urlBuilder = urlBuilder;
