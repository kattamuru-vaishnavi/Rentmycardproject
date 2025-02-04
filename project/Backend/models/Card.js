import mongoose from "mongoose";
import { cardsDB } from "../config/db.js";

const CardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  bankName: { type: String, required: true },
  cardType: { type: String, required: true },
  amount: { type: Number, required: true },
});
const Card = cardsDB.model("Card", CardSchema,"cards");
export default Card;
