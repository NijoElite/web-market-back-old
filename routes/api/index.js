const express = require('express');
const router = express.Router();

router.use('/reg', require('./registration')); 
router.use('/auth', require('./auth'));

module.exports = router;