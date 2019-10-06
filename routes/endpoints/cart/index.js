const express = require('express');
const router = new express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/cart');
});

module.exports = router;
