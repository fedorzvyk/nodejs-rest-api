const express = require('express');

const router = express.Router();

const validation = require('../../middlewares/validation');
const postSchema = require('../../schemas/postSchema');
const putSchema = require('../../schemas/putSchema');

const ctrl = require('../../controllers/contacts');

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validation(postSchema), ctrl.postContact);

router.delete('/:contactId', ctrl.delContact);

router.put('/:contactId', validation(putSchema), ctrl.updateById);

module.exports = router;
