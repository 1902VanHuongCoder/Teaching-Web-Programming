import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { capNhatTrangThaiDonHang, layDonHangTheoID } from "../lib/don-hang-apis";
import { taoBinhLuanMoi } from "../lib/binh-luan-apis";

function FormBinhLuan({ sachID, dongFormBinhLuan }) {
  const [noiDung, setNoiDung] = useState("");
  const [danhGia, setDanhGia] = useState(5);
  const xuLyGuiBinhLuan = async (e) => {
    e.preventDefault();

    // Gọi API gửi bình luận lên server
    const duLieuBinhLuan = {
      sachID: sachID,
      nguoiDungID: JSON.parse(localStorage.getItem("user")).nguoiDungID,
      noiDung: noiDung,
      danhGia: danhGia,
    };
    const phanHoiTuSever = await taoBinhLuanMoi(duLieuBinhLuan);

    if (phanHoiTuSever && phanHoiTuSever.success) {
      alert("Gửi bình luận thành công!");
    } else {
      alert("Lỗi khi gửi bình luận:", phanHoiTuSever.message);
    }

    // Đóng form bình luận
    dongFormBinhLuan();
    setNoiDung("");
    setDanhGia(5);
  };
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in">
        <button
          onClick={dongFormBinhLuan}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h3 className="text-xl font-bold text-[#00809D] mb-4 text-center">
          Gửi bình luận của bạn
        </h3>
        <form onSubmit={xuLyGuiBinhLuan}>
          <textarea
            value={noiDung}
            onChange={(e) => setNoiDung(e.target.value)}
            placeholder="Viết bình luận của bạn..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none min-h-[100px] transition"
            required
          />
          <div className="flex items-center mb-4">
            <label className="mr-3 font-medium text-gray-700">Đánh giá:</label>
            <select
              value={danhGia}
              onChange={(e) => setDanhGia(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              required
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} {star === 1 ? "Sao" : "Sao"}
                </option>
              ))}
            </select>
            <div className="ml-3 flex">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <svg  
                  key={i}
                  className={`w-5 h-5 ${
                    i < danhGia ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#36d1c4] to-[#00809D] text-white font-semibold px-4 py-2 rounded-lg hover:from-[#00809D] hover:to-[#36d1c4] transition mb-2"
          >
            Gửi bình luận
          </button>
        </form>
      </div>
    </div>
  );
}


function ChiTietDonHang() {
  const { id } = useParams();

  // Biến trạng thái lưu ID sản phẩm đang được bình luận 
  const [sachIDDangBinhLuan, setSachIDDangBinhLuan] = useState(null);
  
  // Tạo biến trạng thái lưu dữ liệu chi tiết đơn hàng
  const [duLieuDonHang, setDuLieuDonHang] = useState(null);

  // Nạp dữ liệu đơn hàng từ server dựa vào id (sử dụng useEffect trong thực tế)
  useEffect(() => {
    const napDonHang = async () => {
      const duLieuDonHang = await layDonHangTheoID(id);
      if (duLieuDonHang && duLieuDonHang.success) {
        // Xử lý dữ liệu đơn hàng nhận được từ server
        console.log("Dữ liệu đơn hàng:", duLieuDonHang.data);
        setDuLieuDonHang(duLieuDonHang.data);
      }
    };
    napDonHang();
  }, [id]);

  // Helper function để định dạng lại ngày tháng
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Xử lý hủy đơn hàng
  const xuLyHuyDonHang = async (donHangID, trangThaiMoi) => {
    const phanHoiTuSever = await capNhatTrangThaiDonHang(donHangID, trangThaiMoi);
    if (phanHoiTuSever && phanHoiTuSever.success) {
      alert("Hủy đơn hàng thành công!");
      // Cập nhật lại trạng thái đơn hàng trong giao diện
      setDuLieuDonHang({ ...duLieuDonHang, trangThai: trangThaiMoi });
    } else {
      alert("Lỗi khi hủy đơn hàng:", phanHoiTuSever.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] min-h-screen w-full">
      <Navigation />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <Link
          to="/lichsumuahang"
          className="flex items-center gap-2 text-blue-600 hover:underline mb-6 font-semibold"
        >
          <FaArrowLeft /> Quay lại lịch sử đơn hàng
        </Link>
        <div className="relative bg-white rounded-xl shadow-xl p-8 mb-8">
          {duLieuDonHang && duLieuDonHang.trangThai === "Chờ xác nhận" && (
            <button onClick={() => xuLyHuyDonHang(duLieuDonHang.donHangID, "Đã hủy")} className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Hủy đơn hàng
            </button>
          )}
          <h1 className="text-2xl font-bold text-[#00809D] mb-4">
            Chi Tiết Đơn Hàng #{duLieuDonHang ? duLieuDonHang.donHangID : id}
          </h1>
          <div className="mb-2 text-gray-700">
            Ngày đặt:{" "}
            <span className="font-semibold">
              {duLieuDonHang ? formatDate(duLieuDonHang.createdAt) : ""}
            </span>
          </div>
          <div className="mb-2 text-gray-700">
            Địa chỉ nhận hàng:{" "}
            <span className="font-semibold">
              {duLieuDonHang?.diaChiGiaoHang}
            </span>
          </div>
          <div className="mb-2 text-gray-700">
            Trạng thái:{" "}
            <span
              className={
                duLieuDonHang?.trangThai === "Đã giao hàng"
                  ? "text-green-600 font-bold"
                  : "text-yellow-600 font-bold"
              }
            >
              {duLieuDonHang?.trangThai}
            </span>
          </div>
          <div className="mb-2 text-gray-700">
            Tổng tiền:{" "}
            <span className="font-bold text-[#00809D]">
              {duLieuDonHang?.tongTien.toLocaleString()}đ
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-[#00809D] mb-4">
            Sản phẩm trong đơn hàng
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Sản phẩm</th>
                <th className="py-2">Số lượng</th>
                <th className="py-2">Đơn giá</th>
                <th className="py-2">Tạm tính</th>
                <th className="py-2">Bình luận</th>
              </tr>
            </thead>
            <tbody>
              {duLieuDonHang &&
                duLieuDonHang.Saches.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-3 font-semibold text-[#00809D]">
                      {item.tenSach}
                    </td>
                    <td className="py-3">{item.DonHang_Sach.soLuong}</td>
                    <td className="py-3">
                      {item.DonHang_Sach.donGia.toLocaleString()}đ
                    </td>
                    <td className="py-3">
                      {(
                        item.DonHang_Sach.donGia * item.DonHang_Sach.soLuong
                      ).toLocaleString()}
                      đ
                    </td>
                    <td className="py-3">
                      <button onClick={() => setSachIDDangBinhLuan(item.sachID)}>Bình luận</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {sachIDDangBinhLuan && (
          <FormBinhLuan sachID={sachIDDangBinhLuan} dongFormBinhLuan={() => setSachIDDangBinhLuan(null)} />
        )}

        {duLieuDonHang?.trangThai === "Đã giao hàng" && (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 rounded p-4 mb-8">
            <FaCheckCircle className="text-2xl" />
            <span>
              Bạn có thể đánh giá sản phẩm đã mua. Cảm ơn bạn đã tin tưởng
              BookStore!
            </span>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ChiTietDonHang;
