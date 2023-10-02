const Transaction = require("../model/Transaction");

const listTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "" } = req.query;
    console.log("Query Parameters:", req.query);

    // Calculate the skip value for pagination
    const skip = (parseInt(page) - 1) * parseInt(perPage);

    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: new RegExp(`^${search}`, "i") } },
          { description: { $regex: new RegExp(`^${search}`, "i") } },
          { price: { $eq: parseFloat(search) } },
        ],
      };
    }




    console.log("Constructed Query:", query);

    const totalDocs = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .skip(skip)
      .limit(parseInt(perPage));

    const totalPages = Math.ceil(totalDocs / parseInt(perPage));

    console.log("Query Result:", transactions);

    res.json({
      docs: transactions,
      totalDocs,
      limit: parseInt(perPage),
      totalPages,
      page: parseInt(page),
    });
  } catch (error) {
    console.error("Error while listing transactions:", error);
    res.status(500).json({ error: "Failed to list transactions" });
  }
};


module.exports = {
  listTransactions,
};
