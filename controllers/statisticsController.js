const Transaction = require("../model/Transaction");

// Fetch statistics for the selected month
const fetchStatistics = async (month) => {
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

    const soldItemsQuery = {
      dateOfSale: {
        $gte: startDate,
        $lte: endDate,
      },
      sold: true,
    };

    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: soldItemsQuery,
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
        },
      },
    ]);

    const totalSoldItems = await Transaction.countDocuments(soldItemsQuery);

    const totalUnsoldItems = await Transaction.countDocuments({
      dateOfSale: {
        $gte: startDate,
        $lte: endDate,
      },
      sold: false,
    });

    return {
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalUnsoldItems,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchStatistics,
};
