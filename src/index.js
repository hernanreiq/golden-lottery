const express = require('express');
const app = express();
const colors = require('colors');
const path = require('path');

//settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares

//routes
app.use(require('./routes/'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//listening
