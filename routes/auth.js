const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/',async (req,res) => {
    const {error} = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    console.log(user);
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    console.log(validPassword);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    return res.header('x-auth-token',user.generateAuthToken()).status(200).send(true);
})

function validateAuth(req){
   const schema = {
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(50).required()
   }
   return Joi.validate(req,schema);
}

module.exports = router;