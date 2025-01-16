const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  stadium: { type: String, required: true },
  matchDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming",
  },
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
