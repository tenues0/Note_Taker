// this is the api file that will be called
// in the server.js

const express = require('express');

// import modular router for the database
const dbrouter = require('./db');

const app = express();

app.use('/db', dbrouter);

module.exports = app;