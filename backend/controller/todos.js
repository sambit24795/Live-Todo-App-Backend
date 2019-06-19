const Todo = require("../models/todos");
const User = require("../models/user");
const Undo = require("../models/undo");

exports.createTodo = (req, res, next) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    date: req.body.date,
    status: req.body.status,
    subTodos: req.body.subTodos,
    creator: req.userData.id
  });

  todo
    .save()
    .then(result => {
      const undo = new Undo({
        todoId: result.id,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        status: req.body.status,
        subTodos: req.body.subTodos, 
        creator: req.userData.id
      });
      undo
        .save()
        .then(result => {
          res.status(200).json({
            message: "you can undo this document!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "you cannot undo the document!!",
            error: err
          });
        });
      console.log("save", result);
      res.status(201).json({
        message: `Task ${req.body.title} posted successfully by ${req.userData.fullName}`,
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "Task creation failed"
      });
    });
};

exports.getTodos = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const todoQuery = Todo.find();
  let fetchedTasks;

  if (pageSize && currentPage) {
    todoQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  todoQuery
    .then(documents => {
      fetchedTasks = documents;
      return Todo.count();
    })
    .then(count => {
      res.status(200).json({
        message: "all tasks retrieved successfully",
        result: fetchedTasks,
        maxtodos: count
      });
    })

    .catch(err => {
      res.status(500).json({
        error: err,
        message: "error in getting tasks"
      });
    });
};

exports.deleteTodo = (req, res, next) => {
  Todo.deleteOne({ _id: req.params.id, creator: req.userData.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: `has been deleted by ${req.userData.fullName}`
        });
      } else {
        res.status(401).json({
          message: "not authorized!! Please send a friend request to the creator"
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

exports.editTodo = (req, res, next) => {
  const editedTodo = new Todo({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    date: req.body.date,
    status: req.body.status,
    subTodos: req.body.subTodos,
    creator: req.userData.id
  });

  User.find({ _id: req.userData.id })
    .then(result => {
      const friendsArr = result[0].friends.map(user => user.id);
      friendsArr.push(req.userData.id);

      Todo.updateOne(
        { _id: req.params.id, creator: { $in: friendsArr } },
        editedTodo
      )
        .then(result => {
          if (result.nModified > 0) {
            const undo = new Undo({
              todoId: req.body.id,
              title: req.body.title,
              description: req.body.description,
              status: req.body.status,
              date: req.body.date,
              subTodos: req.body.subTodos,
              creator: req.userData.id
            });
            undo
              .save()
              .then(docs => {
                res.status(200).json({
                  message: "you can undo this document!",
                  result: docs
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  message: "you cannot undo the document!!",
                  error: err
                });
              });
            res.status(200).json({
              message: `Task ${req.body.title} has been successfully updated by ${req.userData.fullName}`,
              documents: result
            });
          } else {
            res.status(401).json({
              message: "not authorized!! Please send a friend request to the creator"
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            message: "cannot undo",
            error: err
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        message: "you are not authorized to edit!!",
        error: err
      });
    });
};

