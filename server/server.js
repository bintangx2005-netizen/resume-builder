import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();

// ✅ CORS middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? "https://frontend-production-0a65.up.railway.app"
    : ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

const PORT = process.env.PORT || 8080;

  connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
