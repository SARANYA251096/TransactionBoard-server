// pieChartController.js
const Transaction = require("../model/Transaction");

async function getPieChartData(startDate, endDate) {
  try {
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

    return categoryCounts;
  } catch (error) {
    console.error("Error while fetching pie chart data:", error);
    throw new Error("Failed to fetch pie chart data");
  }
}

module.exports = {
  getPieChartData,
};
