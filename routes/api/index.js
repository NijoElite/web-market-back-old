const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.use('/reg', require('./registration')); 


module.exports = router;