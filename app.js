const express = require('express');
const path = require('path');
const app = express();

// access routes
const indexRouter = require('./routes/index');

// view engine setup
  // app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// add static middleware
app.use('/static', express.static('public'));

// handle post and put requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use routes
app.use('/', indexRouter);

// host locally
app.listen(3000, () => {
  console.log('This is running on localhost 3000')
});