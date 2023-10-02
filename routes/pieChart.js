const express = require("express");
const router = express.Router();
const Transaction = require("../model/Transaction");

router.get("/", async (req, res) => {
  try {
    const { month } = req.query;

    // Parse the selected month
    const selectedMonth = new Date(month);

    // Check if the selectedMonth is valid
    if (isNaN(selectedMonth)) {
      throw new Error("Invalid month format");
    }

    // Construct start and end dates
    const startDate = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth(),
      1
    );
    const endDate = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    // Query the database to find transactions for the selected month
    const validDateQuery = {
      dateOfSale: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    const transactions = await Transaction.find(validDateQuery);

    // Aggregate and count unique categories
    const categoryCounts = {};
    transactions.forEach((transaction) => {
      const category = transaction.category;
      if (!categoryCounts[category]) {
        categoryCounts[category] = 1;
      } else {
        categoryCounts[category]++;
      }
    });

    // Return the category counts as JSON
    res.json(categoryCounts);
  } catch (error) {
    console.error("Error while fetching pie chart data:", error);
    res.status(500).json({ error: "Failed to fetch pie chart data" });
  }
});

module.exports = router;
