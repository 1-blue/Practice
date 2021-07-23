const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
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

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
