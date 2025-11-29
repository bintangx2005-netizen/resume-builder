import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume } from "../controllers/aiController.js";

const aiRouter = express.Router();


aiRouter.post('/enhance-pro-sum', verifyToken, enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc', verifyToken, enhanceJobDescription)
aiRouter.post('/upload-resume', verifyToken, uploadResume)


export default aiRouter