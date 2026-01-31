import express from "express";
import { createTest, submitTest } from "../controllers/testController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// ✅ FIXED ROUTES
router.post("/create", createTest);
router.post("/submit", auth, submitTest);

export default router;
