// Import Express and set up the app
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

/*
* 404 and Global Error Handlers
*/

// this creates error object and hands it off to the handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.locals.path = req.path
  console.log(req.path)
  res.status(err.status)
  res.render('error');
})

// Turn on Express server
app.listen(3000, () => {
  console.log('The app is running on localhost 3000')
});