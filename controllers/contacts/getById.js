// const { getContactById } = require('../../models/contacts');
const Contact = require('../../models/contact');

const getById = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { contactId } = req.params;
    // const contact = await Contact.findById(contactId);
    const contact = await Contact.findOne({ _id: contactId, owner: _id });

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
