// controllers/combinedResponseController.js

const statisticsController = require("./statisticsController");
const barChartController = require("./barChartController");
const pieChartController = require("./pieChartController");

const combineResponses = async (month) => {
  try {
    const statisticsData = await statisticsController.calculateStatistics(
      month
    );
    const barChartData = await barChartController.getBarChartData(month);
    const pieChartData = await pieChartController.getPieChartData(month);

    const combinedResponse = {
      statistics: statisticsData,
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
