const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

// const Joi = require('joi');

// const contactsSchema = Joi.object({
//   name: Joi.string().required(),
//   phone: Joi.number().required(),
//   email: Joi.string().required(),
// });

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.postContact);

router.delete('/:contactId', ctrl.delContact);

router.put('/:contactId', ctrl.putContacts);

module.exports = router;
