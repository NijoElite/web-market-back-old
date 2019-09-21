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
      }
      catch (err) {
        return done(err);
      }     
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
