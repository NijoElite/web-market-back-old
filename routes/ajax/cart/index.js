const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');

const Product = mongoose.model('Product');

/* GET home page. */
router.post('/', async function(req, res, next) {
  const reqGames = req.body;
  const games = [];

  // TODO: shit
  try {
    // eslint-disable-next-line guard-for-in
    for (const article in reqGames) {
      const dbGame = await Product.findOne({article});
      dbGame.count = reqGames[article];
      games.push(dbGame);
    }
    res.render('components/cart-list', {games});
  } catch (err) {
    next(err);
  }
});


module.exports = router;
