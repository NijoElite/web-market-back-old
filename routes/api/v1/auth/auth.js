const jwt = require('jsonwebtoken');
const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

// Generate JWT
router.post('/login', async function(req, res, next) {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});

    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({
        status: 'error',
        errors: [{name: 'AuthenticationError',
          message: 'Wrong email or password'}],
      });
    }

    const payload = {id: user._id.toString()};
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '6h',
    });

    res.cookie('token', token, {httpOnly: true});

    res.json({status: 'success'});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
