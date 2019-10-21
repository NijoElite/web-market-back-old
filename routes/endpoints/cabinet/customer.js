const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const slug = require('slug');

const Product = mongoose.model('Product');

function generateSlug(str) {
  return slug(str + '-' + Date.now().toString(16));
}

router.get('/', async function(req, res, next) {
  const user = req.user;
  const products = await Product.find({owner: user}).lean();

  res.render('pages/cabinet/customer', {products});
});


router.get('/product', function(req, res, next) {
  res.render('pages/cabinet/add-product');
});

router.post('/product', async function(req, res, next) {
  const {name, price,
    publisher, releaseDate,
    description} = req.body;
  const genresList = req.body['genres-list'] || '';
  const user = req.user;

  const genres = genresList.split(',').map((genre) => genre.trim());
  const article = generateSlug(name);

  const product = new Product({name, price, publisher,
    releaseDate, description, genres, article, owner: user});

  try {
    await product.save();
    res.redirect(`/catalog/${article}`);
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
