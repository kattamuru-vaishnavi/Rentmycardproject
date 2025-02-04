import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongooseOptions = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

const usersDB = mongoose.createConnection(process.env.MONGO_USERS_URI, mongooseOptions);
const cardsDB = mongoose.createConnection(process.env.MONGO_CARDS_URI, mongooseOptions);

// Event Listeners
usersDB.on("connected", () => console.log("✅ Users Database Connected"));
usersDB.on("error", (err) => console.error("❌ Users Database Connection Error:", err));

cardsDB.on("connected", () => console.log("✅ CardManagement Database Connected"));
cardsDB.on("error", (err) => console.error("❌ CardManagement Database Connection Error:", err));

// Export connections for models
export { usersDB, cardsDB };
