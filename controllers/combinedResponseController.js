// controllers/combinedResponseController.js

const statisticsController = require("./statisticsController");
const barChartController = require("./barChartController");
const pieChartController = require("./pieChartController");

const combineResponses = async (month) => {
  try {
    // Fetch data from the three controllers
    const statisticsData = await statisticsController.calculateStatistics(
      month
    );
    const barChartData = await barChartController.getBarChartData(month);
    const pieChartData = await pieChartController.getPieChartData(month);

    // Create the combined response with the desired structure
    const combinedResponse = {
      statistics: {
        totalSaleAmount: statisticsData.totalSaleAmount,
        totalSoldItems: statisticsData.totalSoldItems,
        totalNotSoldItems: statisticsData.totalNotSoldItems,
      },
      barChart: barChartData,
      pieChart: pieChartData,
    };

    return combinedResponse;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  combineResponses,
};
