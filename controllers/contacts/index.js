const listContacts = require('./getAll');
const getById = require('./getById');
const addContact = require('./postContact');
const removeContact = require('./delContact');
const updateContact = require('./updateById');

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
