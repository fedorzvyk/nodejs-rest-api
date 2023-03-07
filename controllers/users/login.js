const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('Email or password is wrong');
      error.status = 401;
      next(error);
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      const error = new Error('Email or password is wrong');
      error.status = 401;
      next(error);
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
