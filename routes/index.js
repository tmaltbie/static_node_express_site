const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');

/* GET home page */
router.get('/', (req, res) => {
  res.render('index', { projects });
});

/* GET about page */
router.get('/about', (req, res) => {
  res.render('about')
})

/* GET error route - create + throw 500 server error */
router.get('/', (req, res, next) => {
  console.log('non-projects error thrown:')
  const err = new Error()
  err.status = 500
  if (err.status === 400) {
    err.message = `The requested URL ${path} was not found on this server.`
  }
  console.log("message:", err.message)
  console.log("status:", err.status)
  console.log("stack:", err.stack)
  throw err
});

/* GET project page */
router.get('/projects/:id', (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find( ({ id }) => id === parseInt(projectId) );

  console.log(`project ${projectId} route called`);

  // URL after /projects/
  res.locals.path = req.path
  const path = req.path

  if (project) {
    res.render('project', { project }); 
  } else {
    const err = new Error();
    err.status = 404;
    err.message = `Looks like the project you requested doesn't exist... yet.`
    next(err);
  }
});

module.exports = router;