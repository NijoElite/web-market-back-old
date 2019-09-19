const mongoose = require('mongoose');
const uniquireValidator = require('mongoose-unique-validator');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'can\'t be blank'],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
  },

  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'can\'t be blank'],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },

  firstName: {
      type: String,
      required: [true, 'can\'t be blank'],
  },

  lastName: {
      type: String,
      required: [true, 'can\'t be blank'],
  },

  secondName: {
      type: Date,
      required: [true, 'can\'t be blank'],
  },

  phone: {
      type: String,
      match: [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'is invalid'],
  },

  password: {
    type: String,
    required: [true, 'can\'t be blank'],
    minlength: [8, 'length must be at least 8'],
    select: false,
  },
  
  birthday: {
    type: Date,
    required: [true, 'can\t be blank'],
  },

  role: {
    type: String,
    default: 'user', // also admin, customer
  },

  orders: {

  },

  salt: {
    type: String,
    select: false,
  },

}, {timestamps: true});

userSchema.plugin(uniquireValidator, {message: 'is already taken'});

userSchema.methods.validatePassword = function(pass) {
  const hash = crypto.pbkdf2Sync(pass, this.salt, 10000, 512, 'sha512').
      toString();
  return this.password === hash;
};

userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  user.salt = crypto.randomBytes(16).toString('hex');
  user.password = crypto.pbkdf2Sync(user.password, user.salt,
      10000, 512, 'sha512');

  next();
});

mongoose.model('User', userSchema);
