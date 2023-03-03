const { addContact } = require('../../models/contacts');

const postContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    const contact = await addContact({ name, email, phone });

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
