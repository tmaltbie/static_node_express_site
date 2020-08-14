// Import Express and set up the app
const express = require('express');
const path = require('path');
const app = express();

// access routes
const indexRouter = require('./routes/index');
// const errorHandler = require('./routes/errorHandler')
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
app.use('/', indexRouter);
// app.use('/', errorHandler)
/* ERROR HANDLERS */

/* 404 handler to catch undefined or non-existent route requests */ 
app.use((req, res, next) => {

  console.log('404 Error Handler Activated');
  
  res.locals.path = req.path;
  const path = req.path;

  const err = new Error(`The requested URL ${path} was not found on this server.`);
  err.status = 404;
  
  console.error("from 404 handler:", err.message);
  console.error("from 404 handler this is err.status:", err.status);

  res.status(404).render('not-found', {err});
});

/* the global error handler */
app.use((err, req, res, next) => {
  console.log('Global Error Handler Activated');

  err.status = err.status || 500;

  if (err.status === 404) {
    res.render('not-found', {err})
  } else {
    err.message = err.message || 'Oops, something went wrong.'
    res.status(err.status).render('error', {err})
  }

  next(err)
});

// Turn on Express server
app.listen(3000, () => {
  console.log('The app is running on localhost 3000');
});