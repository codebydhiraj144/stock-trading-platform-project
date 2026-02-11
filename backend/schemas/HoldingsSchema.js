const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
  user: { type: String, required: true }, // Required for dashboard filtering
});

module.exports = { HoldingsSchema };