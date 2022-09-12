const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/', postCtrl.postsList); //auth, 
router.get('/:id', auth, postCtrl.findOnePost);
router.post('/', postCtrl.createPost); //auth, multer avant postCtrl
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likePost);

module.exports = router;