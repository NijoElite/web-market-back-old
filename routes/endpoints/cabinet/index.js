const express = require('express');
const router = new express.Router();

const auth = require('../../../middlewares/auth');
const roles = require('../../../middlewares/roles');

router.use('/', auth.required);

router.use('/user',
    roles.isUser,
    require('./user'));

router.use('/customer',
    roles.isCustomer,
    require('./customer'));

module.exports = router;
