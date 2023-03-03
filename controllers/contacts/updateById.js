const { updateContact } = require('../../models/contacts');
const contactsSchema = require('../../schemas/contactsSchema');

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, phone, email } = req.body;

    if (!name && !phone && !email) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const { error } = contactsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const contact = await updateContact(contactId, req.body);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
