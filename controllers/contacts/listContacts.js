// const { listContacts } = require('../../models/contacts');
const Contact = require('../../models/contact');

const listContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const contactsList = await Contact.find({ owner: _id }).populate(
      'owner',
      '_id email subscription'
    );
    res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
