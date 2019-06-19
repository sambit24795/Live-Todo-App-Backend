define({ "api": [
  {
    "type": "delete",
    "url": "/api/todos/:id",
    "title": "delete a task",
    "version": "0.0.1",
    "group": "read",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as authorization header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n        \"message\":  `has been deleted by ${req.userData.fullName}`,\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"message\": \"not authorized!! Please send a friend request to the creator\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todos.js",
    "groupTitle": "read",
    "name": "DeleteApiTodosId"
  },
  {
    "type": "get",
    "url": "/api/todos",
    "title": "Get all tasks",
    "version": "0.0.1",
    "group": "read",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as authorization header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"message\": \"issues retrieved successfully\",\n\t    \"status\": 200,\n\t    \"issues\": [\n\t\t\t\t\t{\n                        title: string,\n                        description: string,\n                        status: string,\n                        date: string,\n                        subTodos: Array,\n                        creator: mongoose.objectID\n                        },\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"message\": \"message: \"error in getting tasks\"\",\n\t    \"status\": 500\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todos.js",
    "groupTitle": "read",
    "name": "GetApiTodos"
  },
  {
    "type": "post",
    "url": "/api/todos",
    "title": "post all tasks",
    "version": "0.0.1",
    "group": "read",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as authorization header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"message\": `Task ${req.body.title} posted successfully by ${req.userData.fullName}`,\n\t    \"status\": 200,\n\t    \"issues\": [\n\t\t\t\t\t{\n\t\t\t\t\t\ttodoId: result.id,\n                        title: string,\n                        description: string,\n                        status: string,\n                        date: string,\n                        subTodos: Array,\n                        creator: mongoose.objectID\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"message\": \"Task creation failed\",\n\t    \"status\": 500,\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todos.js",
    "groupTitle": "read",
    "name": "PostApiTodos"
  },
  {
    "type": "put",
    "url": "/api/issues/:id",
    "title": "update tasks",
    "version": "0.0.1",
    "group": "read",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as authorization header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n        \"message\": you can undo this document!\",\n        \"result\": {\n              title: string,\n              description: string,\n              status: string,\n              date: string,\n              subTodos: Array,\n              creator: Mongoose.objectId\n        }\n\t    }\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"message\": \"not authorized!! Please send a friend request to the creator\",\n\t    \"status\": 500,\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todos.js",
    "groupTitle": "read",
    "name": "PutApiIssuesId"
  }
] });
