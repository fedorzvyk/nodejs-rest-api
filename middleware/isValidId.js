const { isValidObjectId } = require('mongoose');
const { NotFound } = require('http-errors');

const isValid = (req, res, next) => {
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    throw new NotFound('Not found');
  }
  next();
};

module.exports = isValid;
