const mongoose = require("mongoose");

const undoSchema = mongoose.Schema({
  todoId:{ type: String, required: true},  
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true }, 
  status: { type: String, required: true },
  subTodos:{ type: Array, default: null},
  creator: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true}
});

module.exports = mongoose.model("Undo", undoSchema);
