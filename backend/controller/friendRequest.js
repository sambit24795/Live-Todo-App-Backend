const FriendRequest = require("../models/friendRequest");
const User = require("../models/user");

exports.sendRequest = (req, res, next) => {
  const friend = new FriendRequest({
    sender: req.userData.id,
    receiver: req.body.id,
    email: req.body.email,
    fullName: req.body.fullName
  });

  friend
    .save()
    .then(result => {
      res.status(201).json({
        message: `Friend request sent to ${req.body.fullName}`,
        result: result
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err,
        message: "couldn't send friend request!!"
      });
    });
};

exports.getRequests = (req, res, next) => {
  FriendRequest.find({ sender: req.userData.id })
    .then(users => {
      res.json({
        message: "All pending requests",
        user: users
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "error in getting pending user requests",
        error: err
      });
    });
};

exports.getSentRequests = (req, res, next) => {
  FriendRequest.find({ receiver: req.userData.id }).then(result => {
    const mappedResult = result.map(data => data.sender);
    User.find({ _id: mappedResult })
      .then(userData => {
        res.status(200).json({
          message: "all received requests",
          result: userData
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "error in getting the requests",
          error: error
        });
      });
  });
};

exports.deleteFriendRequest = (req, res, next) => {
  FriendRequest.deleteOne({ sender: req.query.sender, receiver: req.query.receiver})
 
  .then(result => {
    if (result.n > 0) {
      FriendRequest.find().then((result) => {
        
        res.status(200).json({
          message: "friend request canceled successfully!!",
          result: result
        });
      })
      
    } else {
      res.status(401).json({
        message: "not authorized!!"
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "something occured while deleting",
      error: err
    });
  });
};
