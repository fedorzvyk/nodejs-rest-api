const { addContact } = require('../../models/contacts');

const contactsSchema = require('../../schemas/contactsSchema');

const postContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    const { error } = contactsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const contact = await addContact({ name, email, phone });

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
