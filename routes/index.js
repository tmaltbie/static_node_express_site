const express = require('express');
const router = express.Router();
const { data } = require('../data/data.json');

/* GET home page */
router.get('/', (req, res, next) => {
  console.log(req.params.id)
  res.render('index', { data });
});

/* GET project page */

module.exports = router;