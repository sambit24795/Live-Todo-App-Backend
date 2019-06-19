const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, default: "" },
  friends: { type: Array}
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
