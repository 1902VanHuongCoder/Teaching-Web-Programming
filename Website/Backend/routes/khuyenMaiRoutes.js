import express from 'express';
import { capNhatMaKhuyenMai, nhanTatCaMaKhuyenMai, taoMaKhuyenMai, xoaMaKhuyenMai } from '../controllers/khuyenMaiController.js';

const router = express.Router();

// Nhận tất cả khuyến mãi
router.get("/", nhanTatCaMaKhuyenMai);

// Tạo khuyến mãi mới
router.post("/", taoMaKhuyenMai);

// Cập nhật khuyến mãi
router.put("/:khuyenMaiID", capNhatMaKhuyenMai);

// Xóa khuyến mãi 
router.delete("/:khuyenMaiID", xoaMaKhuyenMai);

export default router;