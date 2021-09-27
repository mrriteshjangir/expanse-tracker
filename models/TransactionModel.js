const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    type:{
      type:String,
      required:true,
    },
    addedBy:{
      type:String,
      required:true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "transaction",
  }
);

module.exports = TransactionModel = mongoose.model("transaction", TransactionSchema);
