// routes/listTransactions.js
const express = require("express");
const router = express.Router();
const { listTransactions } = require("../controllers/listingsController"); 
router.get("/", listTransactions);

module.exports = router;
