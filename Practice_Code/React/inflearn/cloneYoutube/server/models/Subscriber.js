const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema(
  {
    // 구독당하는사람
    userTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // 구독하는사람
    userFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;
