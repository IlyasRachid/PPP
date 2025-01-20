const express = require("express");
const ticketController = require("../controllers/ticketController");

const router = express.Router();

// Public
router.post("/", ticketController.createTicket);
router.get("/", ticketController.getAllTickets);
router.get("/:id", ticketController.getTicket);
router.get("/user/:userId", ticketController.getUserTickets);

module.exports = router;
