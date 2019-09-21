const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

router.post('/', function(req, res, next) {
  const body = req.body;

  const user = new User({
    email: body['email'],
    password: body['password'],
    firstName: body['first-name'],
    secondName: body['second-name'],
    lastName: body['last-name'],
    birthday: Date.parse(body['birthday']),
  });

  user.save();
});

module.exports = router;
