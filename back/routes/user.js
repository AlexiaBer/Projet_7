const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/', auth, userCtrl.signUp); //multer après auth
router.get('/', auth, userCtrl.signIn);
//router.put('/', auth, userCtrl.modifyUser); //multer après auth
//router.delete('/', auth, userCtrl.deleteUser);


