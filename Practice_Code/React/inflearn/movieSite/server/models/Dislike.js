const mongoose = require("mongoose");

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    movieId: String,
    commentsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  },
  { timestamps: true },
);

const Dislike = mongoose.model("Dislike", dislikeSchema);

module.exports = Dislike;
