const express = require('express')
const router = express.Router()
const PostCtrl = require('../controllers/postsController');

router.get("/", PostCtrl.getPosts);
router.get("/:postId", PostCtrl.getSinglePost);

module.exports = router
