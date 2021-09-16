const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema(
  {
    b_amount: {
      type: Number,
      required: true,
    },
    b_desc: {
      type: String,
      required: true,
    },
    b_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "budget",
  }
);

module.exports = BudgetModel = mongoose.model("budget", BudgetSchema);
