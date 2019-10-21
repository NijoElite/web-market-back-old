const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');

const Product = mongoose.model('Product');

router.get('/', async function(req, res, next) {
  const cart = req.session.cart || [];
  const articles = cart.map((item) => item.article);

  const games = await Product.find({article: {$in: articles}}).lean();
  games.forEach((game) => {
    game.count = cart.find((item) => item.article === game.article).count;
  });

  res.render('pages/cart', {games});
});

module.exports = router;
