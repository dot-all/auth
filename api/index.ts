import express, { Request, Response, Error, Next } from "express";
import mongoose from "mongoose";
import "dotenv/config";

import userRoutes from "./routes/user.route.ts";
import authRoutes from "./routes/auth.route.ts";

mongoose.connect(process.env.MONGODB_URI || "")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  })

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on port 3000.");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err: Error, req: Request, res: Response, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ 
    success: false,
    message,
    statusCode,
   });
});