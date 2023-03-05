// const { updateContact } = require('../../models/contacts');
const Contact = require('../../models/contact');

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // const { name, phone, email, favorite } = req.body;

    // if (!name && !phone && !email && !favorite) {
    //   return res.status(400).json({ message: 'missing fields' });
    // }

    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
