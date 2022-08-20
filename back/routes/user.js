const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

//sign in

//sign up

router.post('/', auth, multer, userCtrl.signUp);
router.put('/', auth, multer, userCtrl.modifyUser);
router.delete('/', auth, userCtrl.deleteUser);
router.get('/', auth, userCtrl.signIn);
