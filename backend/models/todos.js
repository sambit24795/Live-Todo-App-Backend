const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true }, 
  status: { type: String, required: true },
  subTodos:{ type: Array, default: null},
  creator: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true}
});


module.exports = mongoose.model("Todo", todoSchema);
