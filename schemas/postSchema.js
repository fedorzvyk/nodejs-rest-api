const Joi = require('joi');

const postSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = postSchema;
