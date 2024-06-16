import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import userRoutes from "./routes/user.route.ts";

mongoose.connect(process.env.MONGODB_URI || "")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  })

const app = express();
app.listen(3000, () => {
  console.log("Server listening on port 3000.");
});

app.use("/api/user", userRoutes);