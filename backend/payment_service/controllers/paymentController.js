const Payment = require("../models/paymentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Mock implementation of creating a payment
exports.createPayment = catchAsync(async (req, res) => {
  const { userId, ticketId, amount } = req.body;

  // Mock payment creation
  const payment = await Payment.create({ userId, ticketId, amount });
  if (!payment) return next(new AppError("Payment not created", 400));

  res.status(201).json({
    status: "success",
    data: {
      payment,
    },
  });
});

// Get a single payment
exports.getPayment = catchAsync(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) return next(new AppError("No payment found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      payment,
    },
  });
});

// Get all payments
exports.getAllPayments = catchAsync(async (req, res) => {
  const payments = await Payment.find();
  if (!payments) return next(new AppError("No payments found", 404));
  res.status(200).json({
    status: "success",
    data: {
      payments,
    },
  });
});
