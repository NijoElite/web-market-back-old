const express = require('express');
const router = new express.Router();

router.use('/reg', require('./registration'));
router.use('/auth', require('./auth'));
router.use('/cart', require('./cart'));

// Errors
router.use(function(err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key) {
        errors[key] = err.errors[key].message;
        return errors;
      }, {}),
    });
  }

  next(err);
});


module.exports = router;
