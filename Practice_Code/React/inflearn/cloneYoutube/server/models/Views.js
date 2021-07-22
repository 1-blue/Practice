const mongoose = require("mongoose");

const viewsSchema = mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Views = mongoose.model("Views", viewsSchema);

module.exports = Views;
