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
    type: String,
    enum: ["VIP", "Premium", "Standard"],
    default: "Standard",
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
