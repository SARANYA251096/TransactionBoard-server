const axios = require("axios");
const Transaction = require("../model/Transaction");

const initializeDatabase = async (req, res) => {
  try {
    // Fetch data from the third-party API
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    // Seed data into the database
    await Transaction.insertMany(response.data);

    res.json({ message: "Database initialized successfully" });
  } catch (error) {
    console.error("Error during database initialization: ", error);
    res.status(500).json({ error: "Failed to initialize the database" });
  }
};

module.exports = {
  initializeDatabase,
};
