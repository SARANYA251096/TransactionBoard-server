const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    
    });

    console.log("Connected to db...");
  } catch (error) {
    console.error("Error: ", error);
  }
};

module.exports = db;
