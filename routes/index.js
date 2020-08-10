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
    res.sendStatus(404); 
  }
});

// // if user accidentally gets directed to /projects without an id
// router.get('/projects', (req, res) => {
//   res.redirect('/');
// })

/* GET about page */
router.get('/about', (req, res) => {
  res.render('about')
})

module.exports = router;