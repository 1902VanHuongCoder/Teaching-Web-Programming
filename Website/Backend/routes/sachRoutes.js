import express from "express";
import { nhanTatCaCacQuyenSach } from "../controllers/sachController.js";

const router = express.Router(); 

router.get("/", nhanTatCaCacQuyenSach); // GET /

export default router; 
