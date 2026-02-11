const { model } = require("mongoose");
const { OrdersSchema } = require("../schemas/OrdersSchema");

// Compiled model for the 'orders' collection to store all trade history
const OrdersModel = model("order", OrdersSchema);

module.exports = { OrdersModel };