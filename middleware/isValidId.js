const { isValidObjectId } = require('mongoose');

const isValid = (req, res, next) => {
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    const error = new Error(`id=${contactId} is not correct`);
    error.status = 400;
    next(error);
  }
  next();
};

module.exports = isValid;
