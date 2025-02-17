// const { listContacts } = require('../../models/contacts');
const Contact = require('../../models/contact');

const listContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;
    const filterContacts = favorite ? { favorite, owner: _id } : { owner: _id };

    const contactsList = await Contact.find(filterContacts, '', {
      skip,
      limit: Number(limit),
    }).populate('owner', '_id email subscription');

    res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
