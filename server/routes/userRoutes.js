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

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/data", protect, getUserById);
router.get("/resumes", protect, getUserResumes);

// Contoh penggunaan di client
api.post("/users/register", { name, email, password })
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

// RESET PASSWORD TANPA TOKEN
router.post("/reset-password", resetPassword);


// ADMIN CRUD di Halaman User Management!!!
router.get("/all", protect, verifyAdmin, getAllUsers);
router.post("/", protect, verifyAdmin, createUser);
router.put("/:id", protect, verifyAdmin, updateUser);
router.delete("/:id", protect, verifyAdmin, deleteUser);

export default router;
