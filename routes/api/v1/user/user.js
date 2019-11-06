const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

const partialProjection = '-password -email -updatedAt -__v -salt -birthday';
// const fullProjection = '-password -updatedAt -__v';

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
router.post('/delete', async function(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id);

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
router.get('/', async function(req, res, next) {
  const {id} = req.query;

  try {
    const user = await User.findById(id, partialProjection).lean();

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
