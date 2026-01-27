const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  experienceLevel: {
    type: String,
    required: true
  },
  questions: {
    type: [String],
    required: true
  },
  rounds: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true
  },
  result: {
    type: String,
    enum: ["Selected", "Rejected"],
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("InterviewExperience", interviewSchema);
