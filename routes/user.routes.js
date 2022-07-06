const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");

const multer = require("multer");
const upload = multer();

// login
router.post("/login", authController.signIn);

//logout
router.get("/logout", authController.logOut);

// signup
router.post("/register", authController.signUp);

//  get all users
router.get("/", userController.getAllUsers);

//user by id
router.get("/:id", userController.userInfo);

//update user by id
router.put("/:id", userController.updateUser);

//delete user by id
router.delete("/:id", userController.deleteUser);

// follow user by id
router.put("/follow/:id", userController.followUser);
//unFollow user by id
router.patch("/unFollow/:id", userController.unFollowUser);

// add user to the followers list by id

router.patch("/AddToFollowerList/:id", userController.AddToFollowerList);

// remove  user from the follower list  by id

router.patch("/RemoveUserFL/:id", userController.RemoveFollower);

// upload profile picture

router.post(
  "/uploadProfilePicture",
  upload.single("file"),
  uploadController.uploadProfile
);

module.exports = router;
