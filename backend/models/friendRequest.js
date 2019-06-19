const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const friendRequestSchema = mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  email: { type: String, required: true },
  fullName: { type: String, required: true}
});
friendRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });
friendRequestSchema.plugin(uniqueValidator);

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
