const { model } = require("mongoose");
const { UserSchema } = require("../schemas/UserSchema");

// Compiled model for the 'users' collection to handle authentication and profiles
const UsersModel = model("user", UserSchema);

module.exports = { UsersModel };