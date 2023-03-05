const listContacts = require('./getAll');
const getById = require('./getById');
const addContact = require('./postContact');
const removeContact = require('./delContact');
const updateContact = require('./updateById');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
