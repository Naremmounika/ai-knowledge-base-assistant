import express from "express";
import protect from "../middleware/authMiddleware.js";
import { askQuestion, getChatHistory,searchChats } from "../controllers/chatController.js";

const router = express.Router();

router.post("/ask", protect, askQuestion);
router.get("/history/:documentId", protect, getChatHistory);
router.get("/search", protect, searchChats);

export default router;