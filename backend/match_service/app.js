const express = require("express");
const morgan = require("morgan");
const globalErrorController = require("./controllers/globalErrorController");
const matchRouter = require("./routes/matchRoutes");
const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// 2) ROUTES

app.use("/api/v1/matches", matchRouter);

// 3) Unhandled Routes

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

//Error Handling Middleware
app.use(globalErrorController);

module.exports = app;
