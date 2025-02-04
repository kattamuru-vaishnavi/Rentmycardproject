import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Middleware to initialize User model only once
let UserModel; // Store model globally to avoid multiple initializations

router.use(async (req, res, next) => {
  try {
    req.usersDB = req.app.get("usersDB");
    if (!req.usersDB) {
      console.error("❌ Database connection error");
      return res.status(500).json({ message: "Database connection error" });
    }

    if (!UserModel) {
      const { default: UserSchema } = await import("../models/User.js");
      UserModel = req.usersDB.models.User || req.usersDB.model("User", UserSchema(req.usersDB).schema);
    }

    req.User = UserModel;
    next();
  } catch (error) {
    console.error("🔥 Error initializing User model:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    console.log("📝 Signup Request Body:", req.body);
    const { name, email, password } = req.body;

    if (!req.User) {
      console.error("❌ Database connection error on signup");
      return res.status(500).json({ message: "Database connection error" });
    }

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await req.User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await req.User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Signup Successful:", newUser.email);
    res.json({ token, user: { id: newUser._id, name, email } });
  } catch (error) {
    console.error("🔥 Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    console.log("🔑 Login Request Body:", req.body);
    const { email, password } = req.body;

    if (!req.User) {
      console.error("❌ Database connection error on login");
      return res.status(500).json({ message: "Database connection error" });
    }

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await req.User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Login Successful:", user.email);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Token Verification Middleware
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Protected Route Example
router.get("/profile", verifyToken, async (req, res) => {
  try {
    if (!req.User) return res.status(500).json({ message: "Database connection error" });

    const user = await req.User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("🔥 Profile Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
