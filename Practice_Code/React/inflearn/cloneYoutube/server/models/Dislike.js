const mongoose = require("mongoose");

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    commentsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  },
  { timestamps: true },
);

const Dislike = mongoose.model("Dislike", dislikeSchema);

module.exports = Dislike;
