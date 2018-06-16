const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer : {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength:5,
                maxlength:50
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        })
    },
    movie: {
        type: new mongoose.Schema({
                title: {
                    type: String,
                    required: true,
                    minlength:5,
                    maxlength:500
                },
                dailyRentalRate: {
                    type: Number,
                    required: true
                }
            }),
            required: true
        },
        dateOut: {
            type: Date,
            required: true,
            default: Date.now
        },
        dateReturned: {
            type: Date
        },
        rentalFee: {
            type: Number,
            min: 0
        }
    }
));

function validateRental(rental){
    console.log(rental);
    const schema = {
        customerId : Joi.string().required,
        movieId: Joi.string().required
    };
    return Joi.valid(rental,schema);
}

exports.Rental = Rental;
exports.validate = validateRental;