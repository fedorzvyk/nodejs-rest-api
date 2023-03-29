const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email(),
});

module.exports = userSchema;
