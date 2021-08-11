const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    movieId: String,
    movieTitle: String,
    movieRuntime: String,
    movieUrl: String,
  },
  { timestamps: true },
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
