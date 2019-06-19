const Undo = require("../models/undo");
const Todo = require("../models/todos");
const User = require("../models/user");

exports.getTodoHist = (req, res, next) => {
  Undo.find({ todoId: req.params.id })
    .sort("-_id")
    .limit(1)
    .then(result => {
      res.status(200).json({
        message: "undo-ed!!",
        result: result
      });
    })
    .catch(err => {
      res.json({
        message: "cannot be undo-ed!!",
        error: err
      });
    });
};

exports.deleteLatest = (req, res, next) => {
  /*  User.findOne({_id: req.userData.id}).then((result) => {
    console.log('result', result.friends)
  }) */
  Undo.findOneAndDelete({ todoId: req.params.id }, { sort: { _id: -1 } })
    .then(result => {
      res.status(200).json({
        message: "undo data deleted!!"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "something occured while deleting",
        error: err
      });
    });
};
