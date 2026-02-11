const { model } = require("mongoose");
const { HoldingsSchema } = require("../schemas/HoldingsSchema");

// Compiles the Schema into a Model to enable database CRUD operations
const HoldingsModel = model("holding", HoldingsSchema);

module.exports = { HoldingsModel };