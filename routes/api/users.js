const express = require('express');

const router = express.Router();

const validation = require('../../middleware/validation');
const auth = require('../../middleware/auth');
const userJoiSchema = require('../../schemas/userJoiSchema');
const ctrl = require('../../controllers/users');
const upload = require('../../middleware/upload');

router.post('/register', validation(userJoiSchema), ctrl.register);

router.post('/login', validation(userJoiSchema), ctrl.login);

router.get('/current', auth, ctrl.getCurrent);

router.post('/logout', auth, ctrl.logout);

router.patch('/', auth, ctrl.updateSubscription);

router.patch('/avatars', auth, upload.single('image'), ctrl.updateAvatar);

module.exports = router;
