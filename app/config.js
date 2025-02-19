const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    urlDb : process.env.URL_MONGODB_DEV,
    jwtTokenSecret : process.env.JWT_TOKEN_SECRET,
    jwtTokenExpiration: process.env.JWT_TOKEN_EXPIRATION

}