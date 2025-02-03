import { Router } from "express";
import { upload, uploadFile } from "../controllers/uploadFile.controller.js";

const router = Router();

// Route to handle file upload and CSV processing
router.post("/upload", upload.single("file"), uploadFile);

export default router;
