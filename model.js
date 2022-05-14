const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  contactNo: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
    unique: true,
  },
  purchaseDate: {
    type: Date,
    default: Date(),
  },
});

const Customer = mongoose.model("customer", CustomerSchema);

module.exports = Customer;