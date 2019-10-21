const express = require('express');
const router = new express.Router();

// init cart in session
router.use('/', function(req, res, next) {
  req.session.cart = req.session.cart || [];
  next();
});

router.post('/add', function(req, res, next) {
  const article = req.body.article;

  if (!article) {
    return res.json({errors: {title: 'Field article is empty'}});
  }

  const cart = req.session.cart;
  const itemInCart = cart.find((item) => item.article === article);
  if (itemInCart) {
    itemInCart.count++;
  } else {
    cart.push({article, count: 1});
  }

  // TODO: change reply
  res.send(req.session.cart);
});

router.post('/remove', function(req, res, next) {
  const article = req.body.article;
  const count = req.body.count || 1;

  const cart = req.session.cart;
  const itemInCart = cart.find((item) => item.article === article);

  if (!itemInCart) {
    return res.json({errors: {title: `Cart doesn't contain ${item.article}`}});
  }

  if (count === 'all') {
    itemInCart.count = 0;
  } else {
    itemInCart.count -= count;
  }

  if (itemInCart.count <= 0) {
    cart.splice(cart.indexOf(itemInCart), 1);
  }

  res.json({data: {title: 'Product added to cart'}});
});

module.exports = router;
