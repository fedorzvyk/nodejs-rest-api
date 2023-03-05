// const { removeContact } = require('../../models/contacts');
const Contact = require('../../models/contact');

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findByIdAndRemove(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: `Contact deleted` });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
