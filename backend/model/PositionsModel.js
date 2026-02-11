const { model } = require("mongoose");
const { PositionsSchema } = require("../schemas/PositionsSchema");

// Compiled model for the 'positions' collection to track active intraday trades
const PositionsModel = model("position", PositionsSchema);

module.exports = { PositionsModel };