const { Schema, model } = require("mongoose");

const PositionsSchema = new Schema({
  product: String,
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
  isLoss: Boolean,
  user: { type: String, required: true }, // Required for dashboard filtering
});

const PositionsModel = model("position", PositionsSchema);
module.exports = { PositionsModel };