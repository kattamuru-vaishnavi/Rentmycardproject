import Card from "../models/Card.js";

export const addCard = async (req, res) => {
  try {
    const { name, bankName, cardType, amount } = req.body; // ✅ Include userId from frontend
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" }); // ✅ Error handling
    }

    const card = await Card.create({ userId, name, bankName, cardType, amount });
    res.status(201).json(card);
  } catch (error) {
    console.error("Error adding card:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserCards = async (req, res) => {
  try {
    const { userId } = req.params; // ✅ Get user ID from request params

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cards = await Card.find({ userId });
    res.status(200).json(cards);
  } catch (error) {
    console.error("Error fetching user cards:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
