const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  numberOfQuestions: Number,
  subject: String,
  difficulty: String,
  hours: Number,
  minutes: Number,
  topics: [String],
  generatedQuiz: mongoose.Schema.Types.Mixed, // Use Mixed type for flexibility
  score: { type: Number, default: 0 }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
