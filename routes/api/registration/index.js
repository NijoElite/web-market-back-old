const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

router.post('/', function(req, res, next) { 
    const body = req.body;
    console.log(body);
    const user = new User({
        email: body.email,
        password: body['password'],
        firstName: body['first-name'],
        secondName: body['second-name'],
        lastName: body['last-name'],
        // birthday: body['birthday'],
        birthday: Date.now(),
    });

    user.save();
}); 

module.exports = router;