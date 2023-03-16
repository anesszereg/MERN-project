const router = require('express').Router()
const postController = require('../controllers/post.controller')
// const { route } = require('./user.routes')


router.get('/',postController.readPosts)

router.post('/',postController.createPost)

router.put('/:id',postController.updatePost)

router.delete('/:id',postController.deletePost)

router.get('/PostDetails/:id',postController.getPostInfo)

router.get('/PostOfUser/:id',postController.postUser)


router.put ('/userPost/:id',postController.userPosts)

// likes a post 

router.put('/like/:id',postController.likePost)

// unlike a post

router.put('/unlike/:id',postController.unLikePost)

// add id to user likes array

router.put('/userLikes/:id',postController.userLikes)

// pull id from user likes array

router.put('/userUnLikes/:id',postController.userUnLikes)


// add comment to post

router.put('/AddComment/:id',postController.addComment)

// delete comment from post

router.delete('/deleteComment/:id',postController.deleteComment)

// update comment 

router.put('/UpdateComment/:id',postController.updateComment)

// delete all comments from post

router.delete('/deleteAllComment/:id',postController.deleteAllComments)


module.exports = router;
