const Ticket = require("../models/ticketModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

//create a ticket
exports.createTicket = catchAsync(async (req, res) => {
  const ticket = await Ticket.create({
    match: req.body.match,
    stadium: req.body.stadium,
    date: req.body.date,
    price: req.body.price,
    category: req.body.category,
  });
  res.status(201).json({ ticket });
});

// Get all tickets
exports.getAllTickets = catchAsync(async (req, res) => {
  const tickets = await Ticket.find({ isAvailable: true });
  if (!tickets) return next(new AppError("No tickets found", 404));
  res.status(200).json({ tickets });
});

// Get a specific ticket
exports.getTicket = catchAsync(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return next(new AppError("No ticket found with that ID", 404));

  res.status(200).json({ ticket });
});
