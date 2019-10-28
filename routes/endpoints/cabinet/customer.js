const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const slug = require('slug');
const createError = require('http-errors');

const Product = mongoose.model('Product');

function generateSlug(str) {
  return slug(str + '-' + Date.now().toString(16));
}

async function isOwner(req, res, next) {
  const article = req.body.article;
  if (!article) {
    return next();
  }

  const product = await Product.findOne({article});

  if (!product) {
    return next();
  }

  if (product.owner.equals(req.user._id)) {
    return next();
  }

  next(createError(403, 'Not enough permissions to edit product'));
}

router.get('/', async function(req, res, next) {
  const user = req.user;
  const products = await Product.find({owner: user}).lean();

  res.render('pages/cabinet/customer', {products});
});


router.get('/product', async function(req, res, next) {
  const article = req.query.article;

  if (!article) {
    return res.render('pages/cabinet/edit-product',
        {actionTitle: 'Добавление товара', product: {}});
  }

  const product = await Product.findOne({article});
  if (!product) {
    next(createError(404));
    return;
  }

  res.render('pages/cabinet/edit-product',
      {actionTitle: 'Изменение товара', product});
});

router.post('/product', isOwner, async function(req, res, next) {
  const {name, price,
    publisher, releaseDate,
    description, article: oldArticle} = req.body;
  const genresList = req.body['genres-list'] || '';
  const user = req.user;

  const genres = genresList.split(',').map((genre) => genre.trim());
  const params = {name, price, publisher,
    releaseDate, description, genres,
    article: oldArticle || generateSlug(name), owner: user};

  try {
    const oldProduct = await Product.findOne({article: oldArticle});

    if (oldProduct) {
      await oldProduct.update(params);
    } else {
      const newProduct = new Product(params);
      newProduct.save();
    }

    res.redirect(`/catalog/${params.article}`);
  } catch (e) {
    res.json(e); // TODO: change response
  }
});

module.exports = router;
