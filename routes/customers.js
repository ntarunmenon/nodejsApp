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
        required: true
    }
  }));

  function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(3).required(),
      phone: Joi.string().min(7).max(7).required(),
      isGold: Joi.boolean().required()
    };
    return Joi.validate(customer, schema);
  }

  router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let customer = new Customer ({
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
  });

  router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
  });

  router.delete('/:id', async (req, res) => {
    
    const customer = await Customer.findByIdAndRemove(req.params.id);
    
    if (!customer) return res.status(404).send('The Customer with the given ID was not found.');

    res.send(customer);
  });

  router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findByIdAndUpdate(req.params.id,{name: req.body.name},{
      new :  true
    })
    if (!customer) return res.status(404).send('The Customer with the given ID was not found.');

    res.send(customer);
  });

module.exports = router;

