import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { usersDB, cardsDB } from "./config/db.js"; // Import centralized DB connections
import authRoutes from "./routes/authRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Store DB connections in Express for easy access
app.set("usersDB", usersDB);
app.set("cardsDB", cardsDB);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
