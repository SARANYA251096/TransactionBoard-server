// controllers/barChartController.js

const Transaction = require("../model/Transaction");

const getBarChartData = async (month) => {
  try {
    const selectedMonth = new Date(`${month}-01`);
    if (isNaN(selectedMonth.getTime())) {
      throw new Error("Invalid date format");
    }

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

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max:"above"},
    ];

    const priceRangesCount = {};

    priceRanges.forEach((range) => {
      priceRangesCount[`${range.min}-${range.max}`] = 0;
    });

    const transactions = await Transaction.find({
      dateOfSale: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    transactions.forEach((transaction) => {
      for (const range of priceRanges) {
        if (transaction.price >= range.min && transaction.price <= range.max) {
          priceRangesCount[`${range.min}-${range.max}`]++;
          break;
        }
      }
    });

    return priceRangesCount;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBarChartData,
};
