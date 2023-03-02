const { listContacts } = require('../../models/contacts');

const getAll = async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    res.status(200).json({
      contacts: contactsList,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
