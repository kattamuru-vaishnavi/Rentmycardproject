import express from "express";
import { addCard, getUserCards } from "../controllers/cardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Route to add a new card (protected)
router.post("/add", authMiddleware, addCard);

// ✅ Route to get cards for a specific user
router.get("/:userId", authMiddleware, getUserCards);

export default router;
