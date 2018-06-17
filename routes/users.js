const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const {User,validate} = require('../models/user');
const auth = require('../middleware/authcheck')

router.get('/me', auth, async (req,res) => {
  const user = await User.findById(req.user_id).select('password');
  res.send(user);

})

router.get('/', async (req, res) => {
    const users = await User.find().sort('user');
    res.send(users);
  });

  router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email: req.body.email});
    console.log(user);
    if (user) return res.status(400).send('Email already used');

    user = new User (_.pick(req.body,['user','email','password']));

    console.log(user);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password,salt);

    user.password = hashedPassword;
    user = await user.save();

    
    res.header('x-auth-token',user.generateAuthToken());
    res.send(_.pick(user,['user','email']));
  });

  module.exports = router;