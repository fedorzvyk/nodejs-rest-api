const Joi = require('joi');

const putSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30),
  phone: Joi.string(),
  email: Joi.string().email(),
});

module.exports = putSchema;
