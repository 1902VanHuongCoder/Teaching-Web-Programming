import express from 'express';
import { capNhatTinTucTheoID, nhanTatCaTinTuc, nhanTinTucTheoID, taoTinTucMoi, xoaTinTucTheoID } from '../controllers/tinTucController.js';
const router = express.Router();

// Nhận tất cả tin tức 
router.get('/', nhanTatCaTinTuc);

// Nhận tin tức theo tinTucID 
router.get('/:tinTucID', nhanTinTucTheoID);

// Tạo tin tức mới
router.post('/', taoTinTucMoi);

// Cập nhật tin tức theo tinTucID 
router.put('/:tinTucID', capNhatTinTucTheoID);

// Xóa tin tức theo tinTucID
router.delete('/:tinTucID', xoaTinTucTheoID); 

export default router;

