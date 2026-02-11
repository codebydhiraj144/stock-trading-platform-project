const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the Model from the Schema
const UsersModel = model("user", UserSchema);

// Export the Model, not the Schema
module.exports = { UsersModel };