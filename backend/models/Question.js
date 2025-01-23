const mongoose = require("../db/conn");
const { Schema } = mongoose;

// Define o esquema para a coleção "questions"
const Question = mongoose.model(
  "Question",
  new Schema(
    {
      category: {
        type: String,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
      difficulty: {
        type: String,
        required: true,
      },
      options: {
        type: Array,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Question;
