import express from "express";
import {
  getUserById,
  getUserResumes,
  login,
  logout,
  register
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/data', protect, getUserById);
userRouter.get('/resumes', protect, getUserResumes);
userRouter.get('/logout', protect, logout);

export default userRouter;