const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Ranking = mongoose.model(
  "Ranking",
  new Schema(
    {
      category: {
        type: String,
        required: true,
        enum: ["artes", "geografia", "historia", "ciencias", "esportes"],
      },
      mode: {
        type: String,
        required: true,
      },
      results: {
        type: [
          {
            userId: { type: Schema.Types.ObjectId, ref: "User" },
            score: { type: Number, required: true },
            name: { type: String, required: true },
          },
        ],
      },
    },
    { timestamps: true }
  )
);

module.exports = Ranking;
