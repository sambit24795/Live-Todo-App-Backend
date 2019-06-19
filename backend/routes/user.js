const express = require("express");
const userController = require("../controller/user");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", userController.createUser);

router.post("/signin", userController.userLogin);

router.get("/getUsers", userController.getUsers);

router.put('/friends',checkAuth, userController.updateFriendsArray);

router.post('', userController.checkUserbyEmail)

router.put('', userController.resetPassword)



module.exports = router;