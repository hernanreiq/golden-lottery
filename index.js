const { Console } = require('console');
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

//settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//routes
app.use(require('./routes/'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//listening
app.listen(PORT, () => {
    console.log('Listening on PORT:', PORT);
});