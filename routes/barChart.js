// routes/barChart.js

const express = require("express");
const router = express.Router();
const barChartController = require("../controllers/barChartController");

// Define the bar chart route
router.get("/", async (req, res) => {
  try {
    // Get the selected month from the query parameters (e.g., ?month=2022-09)
    const { month } = req.query;

    // Check if the selectedMonth is a valid Date
    const selectedMonth = new Date(`${month}-01`); // Set day to 01
    if (isNaN(selectedMonth.getTime())) {
      // Handle the case where the date is invalid
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Call the getBarChartData function from the controller and pass the selectedMonth
    const barChartData = await barChartController.getBarChartData(
      selectedMonth
    );

    // Return the bar chart data as JSON response
    res.json(barChartData);
  } catch (error) {
    console.error("Error while fetching bar chart data:", error);
    res.status(500).json({ error: "Failed to fetch bar chart data" });
  }
});

module.exports = router;
