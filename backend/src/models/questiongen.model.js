const mongoose = require("mongoose");

const questiongenSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  title: String,
  question: String,
  type: string,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Question", questiongenSchema);
