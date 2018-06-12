const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength:5,
        maxlength:500
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true
    }
}));

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(500).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };

    return Joi.validate(movie,schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;