const User = require('../../models/user');
const { Unauthorized } = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BadRequest } = require('http-errors');
// require('dotenv').config();

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized('Email or password is wrong');
    }

    if (!user.verify) {
      throw new BadRequest('Verify your email address');
    }
    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      throw new Unauthorized('Email or password is wrong');
    } else {
      const payload = {
        id: user._id,
      };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
      await User.findByIdAndUpdate(user._id, { token });
      res.status(200).json({
        token,
        user: {
          email,
          subscription: user.subscription,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = login;
