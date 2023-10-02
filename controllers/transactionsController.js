const Transaction = require("../model/Transaction"); // Note the singular model name

// Controller function to list transactions with search and pagination
const listTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "" } = req.query;
    console.log("Query parameter:", req.query);
    const options = {
      page: parseInt(page),
      limit: parseInt(perPage),
    };

    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } }, // Case-insensitive search
          { description: { $regex: search, $options: "i" } },
          // Add other fields for search if needed
        ],
      };
    }

    console.log("Query object:", query);

    const transactions = await Transaction.paginate(query, options);

    console.log("Query result:", transactions);

    res.json(transactions);
  } catch (error) {
    console.error("Error while listing transactions:", error);
    res.status(500).json({ error: "Failed to list transactions" });
  }
};

module.exports = {
  listTransactions,
};
