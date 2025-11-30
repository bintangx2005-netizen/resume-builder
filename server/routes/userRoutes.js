import express from "express";
import { 
  registerUser,
  loginUser,
  getUserById,
  getUserResumes,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  resetPassword
} from "../controllers/userControllers.js";
import { verifyToken as protect, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/data", protect, getUserById);
router.get("/resumes", protect, getUserResumes);

// RESET PASSWORD TANPA TOKEN
router.post("/reset-password", resetPassword);


// ADMIN CRUD di Halaman User Management!!!
router.get("/all", protect, verifyAdmin, getAllUsers);
router.post("/", protect, verifyAdmin, createUser);
router.put("/:id", protect, verifyAdmin, updateUser);
router.delete("/:id", protect, verifyAdmin, deleteUser);

export default router;
