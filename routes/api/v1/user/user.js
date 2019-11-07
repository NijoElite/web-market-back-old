const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const auth = require('../../../../middlewares/auth');

const User = mongoose.model('User');

const fullProjection = '-password -updatedAt -__v -isDeleted -salt';
const partialProjection = fullProjection + ' -email -birthday';

// Register User
router.post('/', async function(req, res, next) {
  const body = req.body;

  const user = new User({
    email: body['email'],
    password: body['password'],
    firstName: body['first-name'],
    secondName: body['second-name'],
    lastName: body['last-name'],
    birthday: Date.parse(body['birthday']),
  });

  try {
    const savedUser = await user.save();
    res.json({
      status: 'success',
      data: {
        _id: savedUser._id,
      },
    });
  } catch (err) {
    next(err);
  }
});

// Delete User
router.post('/delete', auth.required, async function(req, res, next) {
  const {id} = req.body;

  if (id !== req.userId) {
    return res.status(403).json({
      status: 'error',
      errors: [{
        name: 'Forbidden',
        message: 'You don\'t have permissions',
      }],
    });
  }

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.json({
        status: 'error',
        errors: [{
          name: 'UserNotFound',
          message: 'User cannot be found',
        }],
      });
    }

    res.json({
      status: 'success',
      data: {
        _id: id,
      },
    });
  } catch (err) {
    next(err);
  }
});

// TODO: secure, projection
// Update User Data
router.post('/update', async function(req, res, next) {
  const {id, ...params} = req.body;

  if (params.role) {
    params.role = params.role.split(',');
  }

  try {
    const user = await User.findByIdAndUpdate(id, params,
        {useFindAndModify: false, new: true}).lean();

    if (!user) {
      return res.status(404).json({
        status: 'error',
        errors: [{
          name: 'UserNotFound',
          message: 'User not found',
        }],
      });
    }

    res.json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
});

// TODO: change projection, secure
// Get User Data
router.get('/', auth.optional, async function(req, res, next) {
  const {id} = req.query;
  const projection = req.userId === id ? fullProjection : partialProjection;

  try {
    const user = await User.findById(id, projection).lean();

    if (!user) {
      return res.status(404).json({
        status: 'error',
        errors: [{
          name: 'UserNotFound',
          message: 'User not found',
        }],
      });
    }

    res.json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
