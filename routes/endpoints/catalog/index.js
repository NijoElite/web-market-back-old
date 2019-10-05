const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');

const Product = mongoose.model('Product');

router.param('article', async function(req, res, next, article) {
  try {
    req.product = await Product.findOne({article});
    next();
  } catch (err) {
    next(err);
  }
});

router.get('/:article', function(req, res, next) {
  res.render('pages/product', {product: req.product});
});

module.exports = router;
