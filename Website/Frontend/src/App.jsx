import DangKy from './components/DangKy';
import DangNhap from './components/DangNhap';
import Homepage from './components/homepage/homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuenMatKhau from './components/QuenMatKhau';
import NhapMaOTP from './components/NhapMaOTP';
import NhapMatKhauMoi from './components/NhapMatKhauMoi';
import ChiTietSanPham from './components/ChiTietSanPham';
import ThanhToan from './components/ThanhToan';
import XacNhanDonHang from './components/XacNhanDonHang';
import GioHang from './components/GioHang';
import LichSuMuaHang from './components/LichSuMuaHang';
import HoSoNguoiDung from './components/HoSoNguoiDung';
import ChiTietDonHang from './components/ChiTietDonHang';
import DanhSachTinTuc from './components/DanhSachTinTuc';
import ChiTietTinTuc from './components/ChiTietTinTuc';
import GioiThieuCuaHang from './components/GioiThieuCuaHang';
import LienHeCuaHang from './components/LienHeCuaHang';
import KetQuaTimKiemSach from './components/KetQuaTimKiem';
import AdminLayout from './components/admin/AdminLayout';
import QuanLiSach from './components/admin/QuanLiSach';
import QuanLiChung from './components/admin/QuanLiChung';
import DanhMucSach from './components/admin/DanhMucSach';
import QuanLiNguoiDung from './components/admin/QuanLiNguoiDung';
import QuanLiDonHang from './components/admin/QuanLiDonHang';
import QuanLiBinhLuan from './components/admin/QuanLiBinhLuan';
import QuanLiKhuyenMai from './components/admin/QuanLiKhuyenMai';
import QuanLiGiaoDichKho from './components/admin/GiaoDichKho';
import QuanLiTinTuc from './components/admin/QuanLiTinTuc';
import NhapKhoSach from './components/admin/NhapKhoSach';
function App() {
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dangnhap" element={<DangNhap />} />
        <Route path="/dangky" element={<DangKy />} />
        <Route path="/quenmatkhau" element={<QuenMatKhau />} />
        <Route path="/nhapmaotp" element={<NhapMaOTP />} />
        <Route path="/nhapmatkhaumoi" element={<NhapMatKhauMoi />} />
        <Route path="/chitietsanpham/:sachID" element={<ChiTietSanPham />} />
        <Route path="/thanhtoan" element={<ThanhToan />} />
        <Route path="/xacnhandonhang" element={<XacNhanDonHang />} />
        <Route path="/giohang" element={<GioHang />} />
        <Route path="/lichsumuahang" element={<LichSuMuaHang />} />
        <Route path="/hosonguoidung" element={<HoSoNguoiDung />} />
        <Route path="/don-hang/:id" element={<ChiTietDonHang />} />
        <Route path="/tintuc" element={<DanhSachTinTuc />} />
        <Route path="/tintuc/:id" element={<ChiTietTinTuc />} />
        <Route path="/gioithieu" element={<GioiThieuCuaHang />} />
        <Route path="/lienhe" element={<LienHeCuaHang />} />
        <Route path="/ketquatimkiem" element={<KetQuaTimKiemSach />} />

        {/* Admin */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<QuanLiChung />} />
          <Route path="sach" element={<QuanLiSach />} />
          <Route path="danhmucsach" element={<DanhMucSach />} />
          <Route path="donhang" element={<QuanLiDonHang />} />
          <Route path="nguoidung" element={<QuanLiNguoiDung />} />
          <Route path="binhluan" element={<QuanLiBinhLuan />} />
          <Route path="khuyenmai" element={<QuanLiKhuyenMai />} />
          <Route path="giaodichkho" element={<QuanLiGiaoDichKho />} />  
          <Route path="tintuc" element={<QuanLiTinTuc />} />
          <Route path="nhapkhosach" element={<NhapKhoSach />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App


// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Homepage from './components/homepage/homepage';
// // import other pages/components as needed

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         {/* Add more routes here, e.g.:
//         <Route path="/about" element={<About />} />
//         */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;