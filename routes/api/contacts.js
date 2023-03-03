const express = require('express');

const router = express.Router();

const contactsSchema = require('../../schemas/contactsSchema');
const validation = require('../../middleware/validation');

const ctrl = require('../../controllers/contacts');

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getById);

router.post('/', validation(contactsSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', validation(contactsSchema), ctrl.updateContact);

module.exports = router;
