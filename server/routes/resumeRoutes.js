import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createResume, deleteResume, getPublicResumeById, getResumeId, updateResume } from '../controllers/ResumeControllers.js';
import upload from '../configs/multer.js';
import { getUserResumes } from '../controllers/userControllers.js';

const resumeRouter = express.Router();

resumeRouter.get('/user', verifyToken, getUserResumes);
resumeRouter.post('/create', verifyToken, createResume);
resumeRouter.put('/update', upload.single('image'), verifyToken, updateResume);
resumeRouter.delete('/delete/:resumeId', verifyToken, deleteResume);
resumeRouter.get('/get/:resumeId', verifyToken, getResumeId);
resumeRouter.get('/public/:resumeId', getPublicResumeById);

export default resumeRouter