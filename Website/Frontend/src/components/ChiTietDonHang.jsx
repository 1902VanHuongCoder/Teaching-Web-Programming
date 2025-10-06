import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { capNhatTrangThaiDonHang, layDonHangTheoID } from "../lib/don-hang-apis";

function ChiTietDonHang() {
  const { id } = useParams();

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
                      <button>Bình luận</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
