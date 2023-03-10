const User = require('../../models/user');

const fs = require('fs').promises;
const path = require('path');
const jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../public/avatars');

const updateAvatar = async (req, res, next) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, imageName);

    const editImg = await jimp.read(tmpUpload);
    await editImg
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tmpUpload);

    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join('avatars', imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    next(error);
  }
};

module.exports = updateAvatar;
