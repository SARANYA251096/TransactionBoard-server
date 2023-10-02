

const express = require("express");
const router = express.Router();

// Import the controller with the listTransactions function
const transactionsController = require("../controllers/transactionsController");

// Define the GET route with the callback function
router.get("/", transactionsController.listTransactions);

module.exports = router;
