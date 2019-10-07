const express = require('express');
const router = new express.Router();

const auth = require('../../../middlewares/auth');
const roles = require('../../../middlewares/roles');

router.use('/user',
    auth.required, roles.isUser,
    require('./user'));

router.use('/customer',
    auth.required, roles.isCustomer,
    require('./customer'));

module.exports = router;
