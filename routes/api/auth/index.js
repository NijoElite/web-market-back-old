const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

router.post('/', async function(req, res, next) { 
    let isAuthorized = false;

    const user = await User.findOne({email: req.body.email});

    if (user) {
        isAuthorized = user.validatePassword(req.body.password);
    }

    console.log('ggggggggg: ' + isAuthorized);

    res.send(isAuthorized);
}); 

module.exports = router;