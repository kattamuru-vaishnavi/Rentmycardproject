import mongoose from "mongoose";
import { usersDB } from "../config/db.js"; 

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = usersDB.model("User", UserSchema, "users");

export default User;