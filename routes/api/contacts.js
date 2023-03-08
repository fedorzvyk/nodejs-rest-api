const express = require('express');

const router = express.Router();

const contactsSchema = require('../../schemas/contactsSchema');
// const favoriteSchema = require('../../schemas/favoriteSchema');
const validation = require('../../middleware/validation');
const isValid = require('../../middleware/isValidId');
const auth = require('../../middleware/auth');

const ctrl = require('../../controllers/contacts');

router.get('/', auth, ctrl.listContacts);

router.get('/:contactId', auth, isValid, ctrl.getById);

router.post('/', auth, validation(contactsSchema), ctrl.addContact);

router.delete('/:contactId', auth, isValid, ctrl.removeContact);

router.put(
  '/:contactId',
  auth,
  isValid,
  validation(contactsSchema),
  ctrl.updateContact
);

router.patch(
  '/:contactId/favorite',
  auth,
  isValid,
  validation(contactsSchema),
  ctrl.updateStatusContact
);

module.exports = router;
