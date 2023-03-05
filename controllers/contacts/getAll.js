// const { listContacts } = require('../../models/contacts');
const Contact = require('../../models/contact');

const getAll = async (_, res, next) => {
  try {
    const contactsList = await Contact.find();
    res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
