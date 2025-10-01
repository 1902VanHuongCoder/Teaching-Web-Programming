import express from 'express';
import { capNhatMaKhuyenMai, nhanMaKhuyenMaiTheoID, nhanTatCaMaKhuyenMai, taoMaKhuyenMai, xoaMaKhuyenMai } from '../controllers/khuyenMaiController.js';

const router = express.Router();

// Nhận tất cả khuyến mãi
router.get("/", nhanTatCaMaKhuyenMai);

// Lấy khuyến mãi theo ID
router.get("/:khuyenMaiID", nhanMaKhuyenMaiTheoID);

// Tạo khuyến mãi mới
router.post("/", taoMaKhuyenMai);

// Cập nhật khuyến mãi
router.put("/:khuyenMaiID", capNhatMaKhuyenMai);

// Xóa khuyến mãi 
router.delete("/:khuyenMaiID", xoaMaKhuyenMai);

export default router;