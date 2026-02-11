const { Schema, model } = require("mongoose");

const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  time: String, 
  date: String,
  status: { type: String, default: "COMPLETE" },
  user: { type: String, required: true } // Required for "Orders" tab
});

const OrdersModel = model("order", OrdersSchema);
module.exports = { OrdersModel };