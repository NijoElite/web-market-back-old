const express = require('express');
const router = express.Router();
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

// TODO: use await
passport.use(new LocalStrategy(
    function(email, password, done) {
      User.findOne({email: email}).then((user) => {
        if (!user) {
          return done(null, false);
        }
        console.log(user);
        const isValid = user.validatePassword(password);
        if (isValid) {
          return done(null, user);
        } else {
          return done(null, false);
        }

      }).catch((err) => done(err));
    }
));


// TODO: add custom callback
router.post('/login', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/login',
}));

// TODO: use json instead of redirect 
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
