const mongoose = require('mongoose')

// for creating a table into the db
const billsSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: Number,
    required: true
  },
  customerAddress: {
    type: String,
    required: true
  },
  subTotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  cartItems: {
    type: Array,
    required: true
  },
  isPWD: {
    type: Boolean,
    required: true
  },
  isSeniorCitizen: {
    type: Boolean,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  
}, {
  // for timestamps
  timestamps: true
});

module.exports = mongoose.model("Bills", billsSchema);
