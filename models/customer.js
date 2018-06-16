const mongoose = require('mongoose');
const Joi = require('joi');


const Customer = mongoose.model('Customer',new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:5,
        maxlength:50
    },
    isGold: {
        type: Boolean,
        required: true,
        default: false
    },
    phone: {
        type: String,
        required: true
    }
  }));

  function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(3).required(),
      phone: Joi.string().min(7).max(7).required(),
      isGold: Joi.boolean().required()
    };
    console.log(Joi.validate(customer, schema))
    return Joi.validate(customer, schema);
  }

  exports.Customer = Customer;
  exports.validate = validateCustomer;
