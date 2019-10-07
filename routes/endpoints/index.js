const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');

const Product = mongoose.model('Product');


/* GET home page. */
router.get('/', async function(req, res, next) {
  const newGames = await Product.find({}).sort('releaseDate').limit(20).exec();
  // const latest or smth = TODO: implement method
  res.render('pages/index', {newGames});
});

router.use('/catalog', require('./catalog'));
router.use('/cart', require('./cart'));

module.exports = router;
