const express = require('express');

const friendRequestController = require('../controller/friendRequest');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.post("", checkAuth, friendRequestController.sendRequest);

router.get("", checkAuth, friendRequestController.getRequests);

router.get("/receiver", checkAuth, friendRequestController.getSentRequests); 

router.delete("",  friendRequestController.deleteFriendRequest);


module.exports = router; 