const express = require("express");
const router = express.Router();
const Card = require("../models/card");

// Create a new card
router.post("/add", async (req, res) => {
  try {
    const { userId, name, bankName, cardType, amount } = req.body;
    const newCard = new Card({ userId, name, bankName, cardType, amount });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all cards for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.params.userId });
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
