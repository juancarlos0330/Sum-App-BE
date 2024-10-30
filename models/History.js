const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const HistorySchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = History = mongoose.model("histories", HistorySchema);
