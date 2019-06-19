const express = require("express");
const undoController = require("../controller/undo");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:id", undoController.getTodoHist);

router.delete("/:id",checkAuth, undoController.deleteLatest);

module.exports = router;
