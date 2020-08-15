const express = require('express');
const router = express.Router();

/* ERROR HANDLERS */

/* 404 handler to catch undefined or non-existent route requests */ 
const handleNotFound = ((req, res, next) => {
  res.locals.path = req.path;
  const path = req.path;

  const err = new Error(`The requested URL ${path} was not found on this server.`);
  err.status = 404;

  res.status(404).render('not-found', {err});
});

/* the global error handler */
const handleGlobalErrors = ((err, req, res, next) => {
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