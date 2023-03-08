const Joi = require('joi');

const userSchema = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

module.exports = userSchema;
