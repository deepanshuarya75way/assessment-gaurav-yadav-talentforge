const mongoose = require("mongoose");

const QuestionGen = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  question: String,
  type: string,
  diffculity:string,
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("QuestionGen", QuestionGen);
