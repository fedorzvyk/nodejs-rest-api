const User = require('../../models/user');

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    if (!subscription) {
      return res.status(400).json({ message: 'missing field subscription' });
    }

    const { _id } = req.user;
    await User.findByIdAndUpdate(
      _id,
      { subscription },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      email: req.user.email,
      subscription,
    });
  } catch (error) {
    if (!error.status) {
      error.status = 400;
      error.message = `The field field subscription should be 'starter', 'pro' or 'business'`;
    }
    next(error);
  }
};

module.exports = updateSubscription;
