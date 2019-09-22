const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('User');

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  User.findOne({email: email}).
      then((user) => done(null, user)).catch((err) => done(err));
});

passport.use(new LocalStrategy(
    async function(email, password, done) {
      try {
        const user = await User.findOne({email});

        if (!user) {
          return done(null, false);
        }

        if (user.validatePassword(password)) {
          return done(null, user);
        }

        return done(null, false);
      } catch (err) {
        return done(err);
      }
    }
));

// TODO: add custom callback
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({error: {
        message: 'Invalid email or password',
      }});
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({data: {
        email: user.email,
      }});
    });
  })(req, res, next);
});

// TODO: use json instead of redirect
router.get('/logout', (req, res, next) => {
  req.logout();
  res.json({});
});


module.exports = router;
