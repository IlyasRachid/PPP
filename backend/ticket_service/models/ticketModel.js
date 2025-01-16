const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  match: {
    type: String,
    required: true,
  },
  stadium: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String, // e.g., VIP, General, etc.
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
