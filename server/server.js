import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from './configs/db.js';
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import imageKit from "./configs/imageKit.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("🚀 AI Resume Builder Backend Running Successfully!");
});
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);
});
