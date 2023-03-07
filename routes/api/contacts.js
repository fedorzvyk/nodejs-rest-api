const express = require('express');

const router = express.Router();

const contactsSchema = require('../../schemas/contactsSchema');
// const favoriteSchema = require('../../schemas/favoriteSchema');
const validation = require('../../middleware/validation');
const isValid = require('../../middleware/isValidId');
const auth = require('../../middleware/auth');

const ctrl = require('../../controllers/contacts');

router.get('/', auth, ctrl.listContacts);

router.get('/:contactId', isValid, ctrl.getById);

router.post('/', auth, validation(contactsSchema), ctrl.addContact);

router.delete('/:contactId', isValid, ctrl.removeContact);

router.put(
  '/:contactId',
  isValid,
  validation(contactsSchema),
  ctrl.updateContact
);

router.patch(
  '/:contactId/favorite',
  isValid,
  validation(contactsSchema),
  ctrl.updateStatusContact
);

module.exports = router;
