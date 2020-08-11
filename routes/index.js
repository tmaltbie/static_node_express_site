const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');

/* GET home page */
router.get('/', (req, res) => {
  res.render('index', { projects });
});

/* GET project page */
router.get('/projects/:id', (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find( ({ id }) => id === +projectId );

  if (project) {
    res.render('project', { project }); 
  } else {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

/* GET about page */
router.get('/about', (req, res) => {
  res.render('about')
})

module.exports = router;