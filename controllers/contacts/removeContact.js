// const { removeContact } = require('../../models/contacts');
const Contact = require('../../models/contact');

const removeContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { contactId } = req.params;

    // const contact = await Contact.findByIdAndRemove(contactId);
    const contact = await Contact.findOneAndRemove({
      _id: contactId,
      owner: _id,
    });

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: `Contact deleted` });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
