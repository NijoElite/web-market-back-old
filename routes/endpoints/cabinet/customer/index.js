const express = require('express');
const router = new express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/cabinet/customer');
});

module.exports = router;