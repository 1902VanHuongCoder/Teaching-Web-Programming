import express from "express";
import {
  nhanTatCaCacQuyenSach,
  taoSachMoi,
  capNhatSach,
    xoaSach,
    layChiTietSach
} from "../controllers/sachController.js";

const router = express.Router(); 

router.get("/", nhanTatCaCacQuyenSach); // GET /

router.post("/", taoSachMoi); 

router.put("/:id", capNhatSach); // PUT /api/sach/:id

router.delete("/:id", xoaSach); // DELETE /api/sach/:id



router.get("/:sachID", layChiTietSach); // GET /api/sach/:sachID 

export default router; 
