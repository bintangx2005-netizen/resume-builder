import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing required fields" });

    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role: role || "user",
    });

    const token = generateToken(newUser);
    newUser.password = undefined;

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: newUser,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user);
    user.password = undefined;

    return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      user,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// GET USER RESUMES
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId });
    return res.status(200).json({ resumes });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

/// ADMIN — CREATE USER
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role)
      return res.status(400).json({ message: "Missing required fields" });

    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    newUser.password = undefined;
    return res.status(201).json({ user: newUser });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/// ADMIN — GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    // tampilkan password hash juga
    const users = await User.find().select("-password");  
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/// ADMIN — UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    // HANYA HASH JIKA PASSWORD DIGANTI
    if (req.body.password && req.body.password.trim() !== "") {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      message: "User successfully updated",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};



/// ADMIN — DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const exist = await User.findById(id);
    if (!exist)
      return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;  // menerima email dan newPassword
    if (!email || !newPassword)
      return res.status(400).json({ message: "Email and new password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10); // hash password
    user.password = hashed;

    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
