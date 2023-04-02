const User = require('../../models/user');
const { Conflict } = require('http-errors');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
// const sendEmail = require('../../helpers/sendEmail');
const sendEmailBySendGrid = require('../../helpers/sendEmailBySendGrid');
const { nanoid } = require('nanoid');

const register = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict('Email in use');
    }

    const avatarURL = gravatar.url(email, { protocol: 'http', s: '250' });

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const verificationToken = nanoid();
    const newUser = await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
      verificationToken,
    });

    const emailOptions = {
      to: email,
      subject: 'Verify your account on Phonebook',
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to verify email</a>`,
    };
    // await sendEmail(emailOptions);
    await sendEmailBySendGrid(emailOptions);

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
