const User = require('../../models/user');

const fs = require('fs').promises;
const path = require('path');

const avatarsDir = path.join(__dirname, '../../public/avatars');

const avatar = async (req, res, next) => {
  const { path: tmpUpload, originalname } = req.file;
  try {
    const resultUpload = path.join(avatarsDir, originalname);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join('avatars', originalname);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    next(error);
  }
};

module.exports = avatar;
