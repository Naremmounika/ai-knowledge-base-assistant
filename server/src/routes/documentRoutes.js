import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import { uploadDocument,getDocuments,getDocumentById,deleteDocument,searchDocuments } from "../controllers/documentController.js";


const router = express.Router();

// Upload a single document
router.post(
  "/upload",
  protect,
  upload.single("document"),
  uploadDocument
);
router.get("/", protect, getDocuments);
router.get("/:id", protect, getDocumentById);
router.delete("/:id", protect, deleteDocument);
router.get("/search",protect,searchDocuments);

export default router;