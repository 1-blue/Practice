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
    description: String,
    videoName: String,
    privacy: String,
    category: String,
    duration: String,
    thumbnailName: String,
  },
  { timestamps: true },
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
