const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// FIXME: env settings

dotenv.config();
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      const error = new Error('Not authorized');
      error.status = 401;
      next(error);
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token) {
      const error = new Error('Not authorized');
      error.status = 401;
      next(error);
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
