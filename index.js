/* eslint-disable no-undef */
require('dotenv').config() ;
const Application = require('./app/app.js');

new Application(process.env.PORT , process.env.DB_URL);