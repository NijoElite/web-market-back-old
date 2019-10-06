const express = require('express');
const router = new express.Router();

router.use('/cart', require('./cart'));

module.exports = router;
