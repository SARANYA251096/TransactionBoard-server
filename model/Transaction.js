const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const transactionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    sold: {
      type: Boolean,
      required: true,
    },
    dateOfSale: {
      type: Date,
      default: null,
      required: true,
      validate: {
        validator: function (value) {
          // Use a custom validator function to check if the date is valid
          return !isNaN(value);
        },
        message: "Invalid date format for dateOfSale",
      },
    },
  },
  {
    collection: "transactions", // Specify the collection name here
  }
);

// Example validation middleware
transactionSchema.pre("save", function (next) {
  console.log("Validation middleware triggered.");
  if (this.dateOfSale !== null && isNaN(this.dateOfSale)) {
    console.log("Invalid date format found. Converting to null.");
    this.dateOfSale = null;
  }

  next();
});



// Apply the mongoose-paginate-v2 plugin to enable pagination
transactionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Transaction", transactionSchema);
