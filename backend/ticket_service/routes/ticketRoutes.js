const express = require("express");
const ticketController = require("../controllers/ticketController");

const router = express.Router();

// Public
router.get("/", ticketController.getAllTickets);
router.get("/:id", ticketController.getTicket);

router.post("/", ticketController.createTicket);

module.exports = router;
