// const { updateContact } = require('../../models/contacts');
const Contact = require('../../models/contact');

const updateStatusContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({ message: 'missing field favorite' });
    }

    // const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    //   new: true,
    // });
    const contact = await Contact.findByIdAndUpdate(
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

module.exports = updateStatusContact;
