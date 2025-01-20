const Ticket = require("../models/ticketModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const axios = require("axios");

async function validateUser(userId) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/v1/users/${userId}`
    );
    return response.data; // Returns user data if valid
  } catch (error) {
    throw new AppError("Invalid user ID or user not found", 400);
  }
}

// Create a ticket
exports.createTicket = catchAsync(async (req, res, next) => {
  const { match, stadium, date, price, category, userId } = req.body;

  // Validate user (optional, based on your architecture)
  await validateUser(userId);

  const ticket = await Ticket.create({
    match,
    stadium,
    date,
    price,
    category,
    owner: userId, // Associate the ticket with the user
  });

  res.status(201).json({ ticket });
});

// Get all available tickets
exports.getAllTickets = catchAsync(async (req, res) => {
  const tickets = await Ticket.find({ isAvailable: true });
  if (!tickets) return next(new AppError("No tickets found", 404));
  res.status(200).json({ tickets });
});

// Get a specific ticket
exports.getTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return next(new AppError("No ticket found with that ID", 404));

  res.status(200).json({ ticket });
});

// Get all tickets for a specific user (optional)
exports.getUserTickets = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  // Optionally validate user
  await validateUser(userId);

  const tickets = await Ticket.find({ owner: userId });
  if (!tickets || tickets.length === 0)
    return next(new AppError("No tickets found for this user", 404));

  res.status(200).json({ tickets });
});
