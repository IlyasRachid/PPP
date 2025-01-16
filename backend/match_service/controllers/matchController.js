const Match = require("../models/matchModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllMatches = catchAsync(async (req, res) => {
  const matches = await Match.find();
  if (!matches) {
    return next(new AppError("No matches found", 404));
  }
  res.status(200).json({
    status: "success",
    results: matches.length,
    data: { matches },
  });
});

exports.createMatch = catchAsync(async (req, res) => {
  const newMatch = await Match.create({
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    stadium: req.body.stadium,
    matchDate: req.body.matchDate,
  });
  if (!newMatch) {
    return next(new AppError("Match not created", 400));
  }
  res.status(201).json({
    status: "success",
    data: { match: newMatch },
  });
});

export const getMatch = catchAsync(async (req, res) => {
  const match = await Match.findById(req.params.id);
  if (!match) return next(new AppError("No match found with that ID", 404));
  res.status(200).json({
    status: "success",
    data: { match },
  });
});
