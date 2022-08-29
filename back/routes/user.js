const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/', userCtrl.signUp); //auth, multer avant userCtrl
router.get('/', auth, userCtrl.login);
router.put('/', auth, multer, userCtrl.modifyUser); //multer après auth
router.delete('/', auth, userCtrl.deleteUser);

module.exports = router;
