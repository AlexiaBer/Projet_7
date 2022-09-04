const express = require('express');
const router = require("express").Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/register', userCtrl.signUp); //auth, multer avant userCtrl LA route entière : http://localhost:8080/api/users/register (voir ligne 48 de app.js)
router.post('/login', userCtrl.login);
router.put('/settings', auth, multer, userCtrl.modifyUser); //multer après auth
//router.delete('/delete', auth, userCtrl.deleteUser);

module.exports = router;
