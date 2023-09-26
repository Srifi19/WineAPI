// app.js
const express = require('express');
const app = express();
// const passport = require('./middleware/authentication');
const BrandRoute = require('./api/Routes/BrandRoute');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const cors = require("cors");
const morgan = require('morgan');


// Middleware

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(bodyParser.json());
app.use(fileupload())
app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());


// Routes
app.use('/api/Brands' , BrandRoute);

module.exports = app;