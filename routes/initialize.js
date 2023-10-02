const express = require("express");
const router = express.Router();
const { initializeDatabase } = require("../controllers/initializeController");

router.get("/", initializeDatabase);

module.exports = router;
