const express = require('express');
const todoController = require('../controller/todos');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.post("", checkAuth, todoController.createTodo);

/**
	 * @api {post} /api/todos post all tasks
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiHeader {String} authToken The token for authentication.(Send authToken as authorization header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "message": `Task ${req.body.title} posted successfully by ${req.userData.fullName}`,
	    "status": 200,
	    "issues": [
					{
						todoId: result.id,
                        title: string,
                        description: string,
                        status: string,
                        date: string,
                        subTodos: Array,
                        creator: mongoose.objectID
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "message": "Task creation failed",
	    "status": 500,
	   }
	 */

 
router.get("", checkAuth, todoController.getTodos);

/**
	 * @api {get} /api/todos Get all tasks
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiHeader {String} authToken The token for authentication.(Send authToken as authorization header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "message": "issues retrieved successfully",
	    "status": 200,
	    "issues": [
					{
                        title: string,
                        description: string,
                        status: string,
                        date: string,
                        subTodos: Array,
                        creator: mongoose.objectID
                        },
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "message": "message: "error in getting tasks"",
	    "status": 500
	   }
	 */

router.delete("/:id", checkAuth, todoController.deleteTodo);

/**
	 * @api {delete} /api/todos/:id delete a task
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiHeader {String} authToken The token for authentication.(Send authToken as authorization header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
        "message":  `has been deleted by ${req.userData.fullName}`,
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "message": "not authorized!! Please send a friend request to the creator"
	   }
	 */

router.put("/:id",checkAuth, todoController.editTodo);

/**
	 * @api {put} /api/issues/:id update tasks
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiHeader {String} authToken The token for authentication.(Send authToken as authorization header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
        "message": you can undo this document!",
        "result": {
              title: string,
              description: string,
              status: string,
              date: string,
              subTodos: Array,
              creator: Mongoose.objectId
        }
	    }
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "message": "not authorized!! Please send a friend request to the creator",
	    "status": 500,
	   }
	 */

module.exports = router; 
