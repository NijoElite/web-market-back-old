const express = require('express');
const router = new express.Router();

// Add user to locals
router.use('/', (req, res, next) => {
  res.locals.user = req.user;
  next();
});

// API
router.use('/api', require('./api'));
router.use('/ajax', require('./ajax'));

router.use('/', require('./endpoints'));


module.exports = router;
