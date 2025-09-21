import express from 'express';
import { xuLyTaiAnhLenCloud, xuLyXoaAnhKhoiCloud } from '../controllers/hinhAnhController.js';
import upload from '../config/multer.js';

const router = express.Router();

// Tải ảnh lên Cloudinary
router.post("/tai-anh-len", upload.single("image"), xuLyTaiAnhLenCloud);

// Xóa ảnh khỏi Cloudinary
router.post("/xoa-anh-khoi", xuLyXoaAnhKhoiCloud);

export default router; 