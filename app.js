const express = require('express')
const path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// add static middleware
app.use('/static', express.static('public'))



app.listen(3000);