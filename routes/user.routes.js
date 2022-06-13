const router =require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

// login
router.post('/login',authController.signIn)

//logout
router.get('/logout',authController.logOut)


// signup
router.post('/register',authController.signUp)

//user 
router.get('/',userController.getAllUsers)

//user by id
router.get('/:id',userController.userInfo)

//update user by id
router.put("/:id",userController.updateUser)

//delete user by id
router.delete('/:id',userController.deleteUser)

// follow user by id
router.patch('/follow/:id',userController.followUser)
//unfollow user by id
router.patch('/unFollow/:id',userController.unFollowUser)


module.exports = router;