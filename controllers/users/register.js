const User = require('../../models/user');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const error = new Error('Email in use');
      error.status = 409;
      next(error);
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = await User.create({
      email,
      password: hashPassword,
      subscription,
    });

    res.status(201).json({
      user: {
        email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
