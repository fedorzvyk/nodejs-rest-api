// const { addContact } = require('../../models/contacts');

const Contact = require('../../models/contact');

const addContact = async (req, res, next) => {
  try {
    let { name, email, phone, favorite } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    if (!email) {
      return res.status(400).json({ message: 'missing required email field' });
    }
    if (!phone) {
      return res.status(400).json({ message: 'missing required phone field' });
    }
    if (!favorite) {
      favorite = false;
    }

    const contact = await Contact.create({ name, email, phone, favorite });

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
