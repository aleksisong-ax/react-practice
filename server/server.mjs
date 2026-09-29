import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import studentRoutes from "./routes/students.mjs";

dotenv.config();
const app = express();
app.use(express.json({ limit: "10kb" }));
app.get("/", (req, res) => res.send("Welcome to Express!"));
app.use("/api/students", studentRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "API route not found." });
});
app.use((err, req, res, _next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON body." });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Request is too large." });
  }
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ error: "Invalid student data." });
  }
  res.status(500).json({ error: "Server error. Check the backend." });
});

async function startServer() {
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "class_demo", serverSelectionTimeoutMS: 10000,
  });
  app.listen(3001, "127.0.0.1", () => {
    console.log("MongoDB connected. API: http://127.0.0.1:3001");
  });
}
startServer().catch((err) => {
  console.error("Startup failed:", err.message);
  process.exit(1);
});
