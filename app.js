// app.js
const express = require('express');
const app = express();
// const passport = require('./middleware/authentication');

const bodyParser = require('body-parser');

const morgan = require('morgan');

// Middleware


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(bodyParser.json());
// app.use(passport.initialize());

// Routes


module.exports = app;