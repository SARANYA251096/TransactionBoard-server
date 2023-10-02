require("dotenv").config();
const express = require("express");
const db = require("./db/connections");
const cors = require("cors");

// Create an Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
db();

// route files
const initializeRoute = require("./routes/initialize");
const transactionsRoute = require("./routes/transactions");
const listTransactionsRoute = require("./routes/listTransactions");
const statisticsRoute = require("./routes/statistics");
const barChartRoute = require("./routes/barChart");
const pieChartRouter = require("./routes/pieChart");
const combinedResponseRouter = require("./routes/combinedResponse");

app.use("/api/initialize", initializeRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/list-transactions", listTransactionsRoute);
app.use("/api/statistics", statisticsRoute);
app.use("/api/bar-chart", barChartRoute);
app.use("/api/pie-chart", pieChartRouter);
app.use("/api/combinedResponse", combinedResponseRouter);

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
