const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
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
        required: true,
        minlength:5,
        maxlength:5
    }
  }));

  function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(3).required(),
      phone: Joi.string().min(7).max(7).required(),
      phone: Joi.boolean().required()
    };
    return Joi.validate(customer, schema);
  }

  router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let customer = new Customer ({
      name: req.body.name,
      isGold: req.body.name,
      name: req.body.name
    });
    customer = await customer.save();
    res.send(customer);
  });

module.exports = router;

