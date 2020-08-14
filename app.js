// Import Express and set up the app
const express = require('express');
const path = require('path');
const app = express();

// access routes
const indexRouter = require('./routes/index');
const errorHandler = require('./routes/errorHandler')
const { render } = require('pug');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// add static middleware
app.use('/static', express.static('public'));

// handle post and put requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes
app.use(indexRouter);
app.use(errorHandler.handleNotFound)
app.use(errorHandler.handleGlobalErrors)

// Turn on Express server
app.listen(3000, () => {
  console.log('The app is running on localhost 3000');
});