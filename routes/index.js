const express = require('express');
const router = express.Router();

// Add user to locals
router.use('/', (req, res, next) => {
  res.locals.user = req.user;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// API
router.use('/api', require('./api'));

module.exports = router;
