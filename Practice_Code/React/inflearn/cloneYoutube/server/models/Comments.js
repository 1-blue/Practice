const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    commentsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
    contents: String,
  },
  { timestamps: true },
);

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;
