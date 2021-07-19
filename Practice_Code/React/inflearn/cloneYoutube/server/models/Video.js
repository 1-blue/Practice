const mongoose = require("mongoose");

const { Schema } = mongoose;

const videoSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    videoName: {
      type: String,
    },
    privacy: {
      type: String,
    },
    category: {
      type: String,
    },
    duration: String,
    thumnail: String,
  },
  { timestamps: true },
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
