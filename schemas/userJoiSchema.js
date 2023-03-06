const Joi = require('joi');

const userSchema = Joi.object({
  password: Joi.string().min(6).max(30),
  email: Joi.string().email(),
  subscription: Joi.string(),
});

module.exports = userSchema;
