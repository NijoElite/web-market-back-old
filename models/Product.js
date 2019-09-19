const mongoose = require('mongoose');
const uniquireValidator = require('mongoose-unique-validator');

const productSchema = new mongoose.Schema({
    article: {
        type: String,
        required: [true, 'can\t be blank'],
        unique: true,
    },

    name: {
        type: String,
        required: [true, 'can\t be blank'],
    },

    description: String,

    price: {
        type: Number, // TODO: add validator
        required: [true, 'can\t be blank'],
    },

    publisher: String,

    releaseDate: Date,

    imageLink: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'is invalid'], // TODO: update regex to use relative path
    },

    votes: [{
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
        },
        mark: {
            type: Number, // TODO: add validator
        },
    }], 

    rating: Number,

    genres: [String],
});

productSchema.plugin(uniquireValidator, {message: 'is already taken'});

productSchema.pre('validate', function (next) {
    if (this.isModified('rating')) {
        this.invalidate('rating');
    }
    next();
});


productSchema.pre('save', function(next) {
    if (!this.isModified('votes')) {
        return next();
    }

    const sum = this.votes.reduce((prev, val) => prev += val);
    const count = this.votes.length === 0 ? 1 : this.votes.length;
    this.rating = sum / count;
    this.save(); // TODO: mb use update
});

mongoose.model('Product', productSchema);
