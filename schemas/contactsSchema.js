const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  phone: Joi.string(),
  email: Joi.string().email(),
  favorite: Joi.boolean(),
});

module.exports = contactsSchema;
