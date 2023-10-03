// routes/statistics.js
const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statisticsController");

router.get("/", async (req, res) => {
  try {
    const { month } = req.query;
    const statistics = await statisticsController.calculateStatistics(month);
    res.json(statistics);
  } catch (error) {
    console.error("Error while fetching statistics:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

module.exports = router;
