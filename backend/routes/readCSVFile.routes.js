import { Router } from "express";
import readCSVFile from "../controllers/readCSVFile.controller.js";
const router = Router();
router.get('/csvFile',readCSVFile)
export default router;