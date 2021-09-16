const mongoose = require("mongoose");

const ExpanseSchema = new mongoose.Schema(
  {
    e_amount: {
      type: Number,
      required: true,
    },
    e_desc: {
      type: String,
      required: true,
    },
    e_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "expanse",
  }
);

module.exports = ExpanseModel = mongoose.model("expanse", ExpanseSchema);
