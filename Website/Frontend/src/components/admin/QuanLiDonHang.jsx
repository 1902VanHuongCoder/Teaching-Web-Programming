import React, { useEffect } from "react";
import {
  capNhatTrangThaiDonHang,
  nhanDonHangCuaMotNguoiDung,
} from "../../lib/don-hang-apis";

const STATUS_OPTIONS = [
  "Chờ xác nhận",
  "Đã xác nhận",
  "Đang giao",
  "Hoàn thành",
  "Đã hủy",
];

function QuanLiDonHang() {
  
  // Biến trạng thái để lưu trữ danh sách đơn hàng của người dùng
  const [userOrders, setUserOrders] = React.useState([]);

  // Helper function để định dạng lại ngày tháng
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Xử lý thay đổi trạng thái đơn hàng
  const handleStatusChange = async (donHangID, newStatus) => {
    // Thay đổi trạng thái trên giao diện trước
    const danhSachDonHangDaCapNhat = userOrders.map((order) => {
      if (order.donHangID === donHangID) {
        return { ...order, trangThai: newStatus };
      } else {
        return order;
      }
    });
    setUserOrders(danhSachDonHangDaCapNhat);

    // Gọi API để cập nhật trạng thái đơn hàng trên server
    const phanHoiTuSever = await capNhatTrangThaiDonHang(donHangID, newStatus);

    if (phanHoiTuSever && phanHoiTuSever.success) {
      alert("Cập nhật trạng thái đơn hàng thành công!");
    } else {
      alert(
        "Lỗi khi cập nhật trạng thái đơn hàng trên server:",
        phanHoiTuSever.message
      );  
    }
  };

  useEffect(() => {
    // Gọi hàm có sẵn trong file don-hang-apis.js để lấy đơn hàng của người dùng từ server
    async function napDuLieuDonHangCuaNguoiDung() {
      // Lấy ID người dùng từ localStorage
      const user = localStorage.getItem("user");
      const nguoiDungID = JSON.parse(user).nguoiDungID;

      const donHang = await nhanDonHangCuaMotNguoiDung(nguoiDungID);
      console.log("Đơn hàng lấy từ server:", donHang);
      setUserOrders(donHang);
    }
    napDuLieuDonHangCuaNguoiDung();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#00809D]">
        Quản lý đơn hàng
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#00809D]">
          Danh sách đơn hàng
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Khách hàng</th>
                <th className="py-2 px-3">SĐT</th>
                <th className="py-2 px-3">Địa chỉ</th>
                <th className="py-2 px-3">Ngày đặt</th>
                <th className="py-2 px-3">Tổng tiền</th>
                <th className="py-2 px-3">Trạng thái</th>
                <th className="py-2 px-3">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {userOrders &&
                userOrders.length > 0 &&
                userOrders.map((order, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3 font-bold">{idx + 1}</td>
                    <td className="py-2 px-3">{order.tenKhachHang}</td>
                    <td className="py-2 px-3">{order.soDienThoaiKH}</td>
                    <td className="py-2 px-3">{order.diaChiGiaoHang}</td>
                    <td className="py-2 px-3">{formatDate(order.ngayDat)}</td>
                    <td className="py-2 px-3">
                      {order.tongTien.toLocaleString()} VNĐ
                    </td>
                    <td className="py-2 px-3">
                      <select
                        value={order.trangThai}
                        onChange={(e) =>
                          handleStatusChange(order.donHangID, e.target.value)
                        }
                        className="border rounded p-1"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-3">
                      <details>
                        <summary className="cursor-pointer text-blue-600 hover:underline">
                          Xem
                        </summary>
                        <div className="mt-2 bg-gray-50 p-2 rounded">
                          <strong>Sản phẩm:</strong>
                          <ul className="list-disc ml-5">
                            {order.Saches.map((item, i) => (
                              <li key={i}>
                                {item.tenSach} x {item.DonHang_Sach.soLuong} (
                                {order.tongTien.toLocaleString()} VNĐ)
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuanLiDonHang;
