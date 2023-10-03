const express = require("express");
const router = express.Router();
const combinedResponseController = require("../controllers/combinedResponseController");

// Define the combined response route
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

    // Call the combineResponses function with the selectedMonth
    const combinedResponse = await combinedResponseController.combineResponses(
      selectedMonth
    );

    // Return the combined response as JSON
    res.json(combinedResponse);
  } catch (error) {
    console.error("Error while fetching combined response:", error);
    res.status(500).json({ error: "Failed to fetch combined response" });
  }
});

module.exports = router;
