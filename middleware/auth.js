const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new Unauthorized('Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      //   (error.message === 'invalid token' || error.message === 'jwt expired')
      !error.status
    ) {
      error.status = 401;
      error.message = 'Not authorized';
    }
    next(error);
  }
};

module.exports = auth;
