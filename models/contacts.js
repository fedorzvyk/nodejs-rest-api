const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const contactsPath = path.join(__dirname, './contacts.json');
// const contactsPath = path.resolve('models/contacts.json');

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};

const getContactById = async contactId => {
  const contactsList = await listContacts();
  const contact = contactsList.find(({ id }) => id === contactId);
  return contact || null;
};

const removeContact = async contactId => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(
    contact => String(contact.id) === contactId
  );

  if (index === -1) {
    return null;
  }

  const deletedContact = contactsList.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList));

  return deletedContact;
};

const addContact = async body => {
  const contactsList = await listContacts();
  const newContact = {
    id: randomUUID(),
    ...body,
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();

  const index = contactsList.findIndex(
    contact => String(contact.id) === contactId
  );

  if (index === -1) {
    return null;
  }

  contactsList[index] = { ...contactsList[index], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return contactsList[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
