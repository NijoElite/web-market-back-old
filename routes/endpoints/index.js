const express = require('express');
const router = new express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', {title: 'Express'});
});

router.use('/catalog', require('./catalog'));

module.exports = router;
