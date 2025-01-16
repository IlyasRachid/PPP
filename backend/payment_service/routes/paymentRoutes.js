const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.post("/", paymentController.createPayment);
router.get("/:id", paymentController.getPayment);
router.get("/", paymentController.getAllPayments);

module.exports = router;
