const mongoose = require("mongoose");

const questiongenSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  question: String,
  type: string,
  diffculity:string,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Question", questiongenSchema);
