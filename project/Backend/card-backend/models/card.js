const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  bankName: { type: String, required: true },
  cardType: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("Card", CardSchema);
