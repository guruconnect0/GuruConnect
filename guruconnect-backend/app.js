import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./server/config/db.js";
import testRoutes from "./server/routes/testRoutes.js";

dotenv.config();
connectDB();

console.log(
  "GENAI KEY:",
  process.env.GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌"
);

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// 🔥 ROUTES
app.use("/api/test", testRoutes);

// 🔥 GLOBAL ERROR HANDLER (VERY IMPORTANT)
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.message);
  res.status(500).json({ message: err.message });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

export default app;
