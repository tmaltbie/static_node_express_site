// Import Express and set up the app
const express = require('express');
const path = require('path');
const app = express();

// access routes
const indexRouter = require('./routes/index');

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

/* ERROR HANDLERS */

/* 404 handler to catch undefined or non-existent route requests */ 
app.use((req, res, next) => {
  console.log('404 error handler called');
  
  // access to URL causing error
  res.locals.path = req.path;
  const path = req.path;

  const err = new Error();
  err.status = 404;

  res.status(404).render('not-found', {err})
});

// the global error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  

  if (err) {
    console.log('Global error handler has been called:', err);
  }
  
  if (err.status === 404 ) {
    res.locals.path = req.path;
    const path = req.path;
    err.message = `The requested URL ${path} was not found on this server.`
    res.render('not-found', { err });
    
  } else {

    // res.locals.path = req.path;
    // const path = req.path;

    err.message = err.message || `It looks like something went wrong.`;
    res.status(err.status || 500).render('error', { err });
    
  } 
})



// Turn on Express server
app.listen(3000, () => {
  console.log('The app is running on localhost 3000');
});