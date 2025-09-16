import express from "express";
import { capNhatMatKhau, capNhatThongTinNguoiDung, dangKy, dangNhap, layThongTinNguoiDung, thayDoiTrangThaiTaiKhoan, xoaTaiKhoanNguoiDung } from "../controllers/nguoiDungController.js";

const router = express.Router();

// Tuyến để xử lý đăng ký 
router.post("/dang-ky", dangKy)

// Tuyến để xử lý đăng nhập 
router.post("/dang-nhap", dangNhap)

// Tuyến để thay đổi trạng thái tài khoản 
router.post("/thay-doi-trang-thai/:nguoiDungID", thayDoiTrangThaiTaiKhoan);

// Tuyến để lấy thông tin người dùng theo ID
router.get("/:id", layThongTinNguoiDung);

// Tuyến để cập nhật thông tin người dùng theo ID
router.put("/:id", capNhatThongTinNguoiDung);

// Tuyến để cập nhật mật khẩu người dùng theo ID
router.put("/cap-nhat-mat-khau/:id", capNhatMatKhau);

// Tuyến để xóa người dùng theo ID
router.delete("/:id", xoaTaiKhoanNguoiDung);

export default router;