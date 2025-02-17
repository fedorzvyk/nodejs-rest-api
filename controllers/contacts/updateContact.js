// const { updateContact } = require('../../models/contacts');
const Contact = require('../../models/contact');

const updateContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { contactId } = req.params;
    const { name, phone, email, favorite } = req.body;

    if (!name && !phone && !email && favorite === undefined) {
      return res.status(400).json({ message: 'missing fields' });
    }

    // const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    //   new: true,
    // });
    const contact = await Contact.findOneAndUpdate(
      {
        _id: contactId,
        owner: _id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
