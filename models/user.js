const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema =new mongoose.Schema ({
  user: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1200
  },
  isAdmin : {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
}

const User = mongoose.model('User',userSchema);

  function validateUser(user) {
    const schema = {
        user: Joi.string().min(5).max(55).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required(), 
        isAdmin: Joi.boolean()
    };
  
    return Joi.validate(user, schema);
  }

  
  exports.User = User;
  exports.validate = validateUser;