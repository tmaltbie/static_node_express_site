const express = require('express');
const router = express.Router();

/* ERROR HANDLERS */

/* 404 handler to catch undefined or non-existent route requests */ 
const handleNotFound = ((req, res, next) => {

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
const handleGlobalErrors = ((err, req, res, next) => {
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

module.exports = {handleNotFound, handleGlobalErrors};