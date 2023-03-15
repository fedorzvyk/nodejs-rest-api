const sendEmail = require('../../helpers/sendEmail');
const User = require('../../models/user');
const { NotFound, BadRequest } = require('http-errors');

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new BadRequest('missing required field email');
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFound('User not found');
    }

    if (user.verify) {
      throw new BadRequest('Verification has already been passed');
    }

    const emailOptions = {
      to: email,
      subject: 'Verify your account on Phonebook',
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
    };
    await sendEmail(emailOptions);

    res.status(200).json({
      message: 'Verification email sent',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
