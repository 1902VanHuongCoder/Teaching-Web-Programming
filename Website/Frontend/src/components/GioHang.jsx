import React, { useState, useRef, useContext } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import {
  capNhatSoLuongSanPham,
  layGioHangTheoNguoiDung,
  xoaSanPhamKhoiGioHang,
} from "../lib/gio-hang-apis";
import { useEffect } from "react";
import { GioHangContext } from "../contexts/gio-hang-context";

function GioHang() {
  // Sử dụng dữ liệu giỏ hàng context để hiển thị và thao tác  
  const { setGioHang } = useContext(GioHangContext);

  // State lưu danh sách sản phẩm trong giỏ hàng
  const [cart, setCart] = useState([]);

  // Biến trạng thái để lưu phần tổng tiền giỏ hàng
  const [tongTien, setTongTien] = useState(0);

  // Ref để lưu timeout ID cho debouncing
  const timeoutRef = useRef(null); 

  // Hàm tăng/giảm số lượng sản phẩm với debouncing
 async function updateQuantity(index, delta) {

    // Cập nhật số lượng trên UI trước (immediate update)
    const newCart = [...cart];
    newCart[index].soLuong = Math.max(1, newCart[index].soLuong + delta);
    setCart(newCart);

    // Cập nhật tổng tiền
    const newTotal = newCart.reduce(
      (total, item) => total + item.giaLucThem * item.soLuong,
      0
    );
    setTongTien(newTotal);

    // Clear timeout trước đó nếu có (debouncing)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Tạo timeout mới để gọi API sau 500ms khi người dùng ngừng thay đổi
    timeoutRef.current = setTimeout(async () => {
      const chiTietGioHangID = newCart[index].chiTietGioHangID;
      const soLuong = newCart[index].soLuong;
      
      try {
        await capNhatSoLuongSanPham(chiTietGioHangID, soLuong);

        // Nạp dữ liệu giỏ hàng mới cho biến gioHang trong context
        // Lấy lại tất cả các sản phẩm trong giỏ hàng để cập nhật lại số lượng sản phẩm trong giỏ hàng ở Navigation
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;
        const user = JSON.parse(storedUser);
        const nguoiDungID = user.nguoiDungID;

        const data = await layGioHangTheoNguoiDung(nguoiDungID);
        if (data) {
          console.log("Dữ liệu giỏ hàng sau khi thêm sản phẩm:", data);
          // Cập nhật số lượng sản phẩm trong giỏ hàng ở Navigation thông qua context
          setGioHang(data.gioHang.ChiTietGioHangs || []);
        }

        console.log("Đã cập nhật số lượng trên server:", soLuong);
      } catch (error) {
        console.error("Lỗi khi cập nhật số lượng:", error);
        // Có thể hiển thị thông báo lỗi cho user
      }
    }, 500); // Đợi 500ms sau khi user ngừng thay đổi




  }

  // Hàm xóa sản phẩm khỏi giỏ hàng
  async function removeItem(index) {
    // Cập nhật trên UI trước
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);

    // Cập nhật tổng tiền
    const newTotal = newCart.reduce(
      (total, item) => total + item.giaLucThem * item.soLuong,
      0
    );
    setTongTien(newTotal);

    // Gọi API để xóa sản phẩm khỏi giỏ hàng trên server
    const chiTietGioHangID = cart[index].chiTietGioHangID;
    await xoaSanPhamKhoiGioHang(chiTietGioHangID);

    // Nạp dữ liệu giỏ hàng mới cho biến gioHang trong context
    // Lấy lại tất cả các sản phẩm trong giỏ hàng để cập nhật lại số lượng sản phẩm trong giỏ hàng ở Navigation
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user = JSON.parse(storedUser);
    const nguoiDungID = user.nguoiDungID;

    const data = await layGioHangTheoNguoiDung(nguoiDungID);
    if (data) {
      console.log("Dữ liệu giỏ hàng sau khi thêm sản phẩm:", data);
      // Cập nhật số lượng sản phẩm trong giỏ hàng ở Navigation thông qua context
      setGioHang(data.gioHang.ChiTietGioHangs || []); 
    }
  }

  // Nạp dữ liệu giỏ hàng từ sever sử dụng useEffect
  useEffect(() => {
    const napDuLieuGioHang = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const data = await layGioHangTheoNguoiDung(user.nguoiDungID);
      if (data && data.success) {
        setCart(data.gioHang.ChiTietGioHangs || []);
        setTongTien(data.gioHang.tongTien || 0);
        console.log("Dữ liệu giỏ hàng từ server:", data);
      }
    };
    napDuLieuGioHang();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] min-h-screen w-full">
      <Navigation />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-[#00809D] mb-8 text-center">
          Giỏ Hàng
        </h1>

        {!cart && cart.length < 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-lg text-gray-700 mb-4">
              Giỏ hàng của bạn đang trống.
            </p>
            <Link
              to="/"
              className="text-blue-600 hover:underline font-semibold"
            >
              &larr; Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xl p-8">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Số thứ tự</th>
                  <th className="py-2">Hình ảnh</th>
                  <th className="py-2">Tên sản phẩm</th>
                  <th className="py-2">Số lượng </th>
                  <th className="py-2">Giá sản phẩm</th>
                  <th className="py-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4">{index + 1}</td>
                    <td className="py-4">
                      <img
                        src={
                          item.Sach?.images
                            ? JSON.parse(item.Sach.images)[0].url
                            : ""
                        }
                        alt={item.Sach?.tenSach}
                        className="w-16 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="py-4">
                      {item.Sach?.tenSach || "Tên sách không tồn tại"}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="p-2 bg-gray-200 rounded-l hover:bg-gray-300"
                        >
                          <FaMinus />
                        </button>
                        <span className="px-4">{item.soLuong}</span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="p-2 bg-gray-200 rounded-r hover:bg-gray-300"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td className="py-4">
                      {item.giaLucThem.toLocaleString()}đ
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-8">
              <Link
                to="/"
                className="text-blue-600 hover:underline font-semibold"
              >
                &larr; Tiếp tục mua sắm
              </Link>
              <div className="text-xl font-bold text-[#00809D]">
                Tổng cộng: {tongTien.toLocaleString()}đ
              </div>
              <Link
                to="/thanhtoan"
                className="bg-[#00809D] text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-[#006b85] transition"
              >
                Tiến hành thanh toán
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default GioHang;
