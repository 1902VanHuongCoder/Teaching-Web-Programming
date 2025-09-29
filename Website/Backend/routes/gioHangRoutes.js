import express from 'express';
import { capNhatSoLuongSanPham, layGioHangTheoNguoiDung, themSanPhamVaoGioHang, xoaSanPhamKhoiGioHang, xoaToanBoGioHang } from '../controllers/gioHangController';
const router = express.Router();

router.get("/:nguoiDungID", layGioHangTheoNguoiDung);

router.get("/dem-so-luong/:nguoiDungID", layGioHangTheoNguoiDung);

router.post("/", themSanPhamVaoGioHang);

router.put("/:chiTietGioHangID",capNhatSoLuongSanPham); 

router.delete("/:chiTietGioHangID", xoaSanPhamKhoiGioHang);

router.delete("/toan-bo/:nguoiDungID", xoaToanBoGioHang);

export default router;
