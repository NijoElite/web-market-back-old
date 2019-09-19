const mongoose = require('mongoose');
const uniquireValidator = require('mongoose-unique-validator');

const orderSchema = new mongoose.Schema({
  customer: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, 'can\t be blank'],
  },

  date: {
      type: Date,
      required: [true, 'can\t be blank'],      
  },

  price: {
      type: Number,
      required: [true, 'can\t be blank'], // TODO: add validator
  },

  products: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  }],
}, {timestamps: true});



mongoose.model('Order', orderSchema);
