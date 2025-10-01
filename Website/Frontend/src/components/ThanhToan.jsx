import React, { useState } from "react";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaLock,
  FaCcPaypal,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { products } from "../lib/data";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { capNhatSoLuongSanPham, layGioHangTheoNguoiDung, xoaSanPhamKhoiGioHang } from "../lib/gio-hang-apis";
import { useRef } from "react";

// Danh sách các sản phẩm trong giỏ hàng
const cartItems = [
  {
    id: 1, // ID sản phẩm 1
    image: products[0]?.hinhAnh, // Hình ảnh sản phẩm
    title: products[0]?.tenSP, // Tên sản phẩm
    author: products[0]?.tacGia || "Tác giả A", // Tác giả sản phẩm
    price: products[0]?.giaGiam, // Giá sản phẩm
    quantity: 2, // Số lượng sản phẩm
  },
  {
    id: 2,
    image: products[1]?.hinhAnh,
    title: products[1]?.tenSP,
    author: products[1]?.tacGia || "Tác giả B",
    price: products[1]?.giaGiam,
    quantity: 1,
  },
];

const SHIPPING_METHODS = [
  // Phương thức vận chuyển
  { label: "Giao hàng tiêu chuẩn (3–5 ngày)", value: "standard", fee: 20000 },
  { label: "Giao hàng nhanh (1–2 ngày)", value: "express", fee: 40000 },
  { label: "Nhận tại cửa hàng", value: "pickup", fee: 0 },
];

const PAYMENT_METHODS = [
  // Phương thức thanh toán
  {
    label: "PayPal",
    value: "paypal",
    icon: <FaCcPaypal className="inline mr-2 text-blue-500" />,
  },
  {
    label: "Thanh toán khi nhận hàng (COD)",
    value: "cod",
    icon: <FaCheckCircle className="inline mr-2 text-green-500" />,
  },
];

function ThanhToan() {
    // Ref để lưu timeout ID cho debouncing
    const timeoutRef = useRef(null); 

  // Biến trạng thái để lưu trữ dữ liệu giỏ hàng
  const [cart, setCart] = useState([]);

  // Thông tin khách hàng
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });

  // Thông tin vận chuyển
  const [shipping, setShipping] = useState({
    tinhThanhPho: "",
    quanHuyen: "",
    xaPhuong: "",
    diaChiCuThe: "",
    phuongThucGiaoHang: SHIPPING_METHODS[0].value, // standard
  });

  // Payment info
  const [payment, setPayment] = useState({
    method: PAYMENT_METHODS[0].value,
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  });

  // Giảm giá
  const [coupon, setCoupon] = useState(""); // Lưu cái mã giảm giá mà người dùng nhập vào
  const [discount, setDiscount] = useState(0); // Lưu giá trị giảm giá tính theo phần

  const router = useNavigate();
  // Điều khoản
  const [agreed, setAgreed] = useState(false);

  // Hàm tăng/giảm số lượng sản phẩm với debouncing
  function updateQuantity(index, delta) {
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
        console.log("Đã cập nhật số lượng trên server:", soLuong);
      } catch (error) {
        console.error("Lỗi khi cập nhật số lượng:", error);
        // Có thể hiển thị thông báo lỗi cho user
      }
    }, 500); // Đợi 500ms sau khi user ngừng thay đổi
  }

  // Xóa sản phẩm ra khỏi giỏ hàng
  // const removeItem = (idx) => {
  //   setCart((prev) => prev.filter((_, i) => i !== idx));
  // };

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
  }

  // Tính toán giá tiền tổng cộng
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingFee =
    SHIPPING_METHODS.find((m) => m.value === shipping.method)?.fee || 0; // Phí vận chuyển
  const tax = Math.round(subtotal * 0.05); // 5% VAT
  const total = subtotal - discount + shippingFee + tax;

  // Coupon handler (demo: code "SALE10" giảm 10%)
  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SALE10") {
      setDiscount(Math.round(subtotal * 0.1));
    } else {
      setDiscount(0);
      alert("Mã giảm giá không hợp lệ!");
    }
  };

  // Tính toán ngày giao hàng dự kiến
  const estimatedDate = () => {
    const now = new Date();
    let days = 5;
    if (shipping.method === "express") days = 2;
    if (shipping.method === "pickup") return "Nhận ngay tại cửa hàng";
    now.setDate(now.getDate() + days);
    return now.toLocaleDateString();
  };

  // Hàm để thực thi yêu cầu mua hàng
  const placeOrder = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("Bạn cần đồng ý với Điều khoản & Chính sách đổi trả!");
      return;
    }
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua sách tại BookStore.");
    router("/xacnhandonhang");
  };

  // Biến trạng thái để lưu giá trị tổng tiền
  const [tongTien, setTongTien] = useState(0);

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
      <form
        className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8"
        onSubmit={placeOrder}
      >
        {/* Trái: Thông tin khách, phương thức vận chuyển, thanh toán */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {/* Thôn tin khách hàng */}
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#e0eafc]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#00809D] drop-shadow">
              <FaUserIcon /> Thông tin khách hàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                required
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00809D] transition"
                placeholder="Họ và tên"
                value={customer.name}
                onChange={
                  (e) => setCustomer({ ...customer, name: e.target.value }) // spread operator
                }
              />
              <input
                required
                type="email"
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00809D] transition"
                placeholder="Email"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
              />
              <input
                required
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 md:col-span-2 focus:ring-2 focus:ring-[#00809D] transition"
                placeholder="Số điện thoại"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
              />
            </div>
          </section>

          {/* Thông tin vận chuyển */}
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#e0eafc]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#00809D] drop-shadow">
              <FaMapMarkerAlt /> Thông tin giao hàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                required
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00809D] transition"
                placeholder="Tỉnh / Thành Phố"
                value={shipping.tinhThanhPho}
                onChange={(e) =>
                  setShipping({ ...shipping, tinhThanhPho: e.target.value })
                }
              />
              <input
                required
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00809D] transition"
                placeholder="Quận / Huyện"
                value={shipping.quanHuyen}
                onChange={(e) =>
                  setShipping({ ...shipping, quanHuyen: e.target.value })
                }
              />
              <input
                required
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00809D] transition"
                placeholder="Xã / Phường"
                value={shipping.xaPhuong}
                onChange={(e) =>
                  setShipping({ ...shipping, xaPhuong: e.target.value })
                }
              />
              <input
                required
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00809D] transition"
                placeholder="Địa chỉ cụ thể"
                value={shipping.diaChiCuThe}
                onChange={(e) =>
                  setShipping({ ...shipping, diaChiCuThe: e.target.value })
                }
              />
            </div>
            <div className="mt-6">
              <label className="font-semibold mr-2">
                Phương thức giao hàng:
              </label>
              <select
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00809D] transition"
                value={shipping.phuongThucGiaoHang}
                onChange={(e) =>
                  setShipping({
                    ...shipping,
                    phuongThucGiaoHang: e.target.value,
                  })
                }
              >
                {SHIPPING_METHODS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}{" "}
                    {m.fee === 0
                      ? "(Miễn phí)"
                      : `(+${m.fee.toLocaleString()}đ)`}
                  </option>
                ))}
              </select>
              {shippingFee === 0 && (
                <span className="ml-2 text-green-600 font-semibold">
                  Miễn phí vận chuyển!
                </span>
              )}
            </div>
          </section>
          {/* Thông tin thanh toán*/}
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#e0eafc]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#00809D] drop-shadow">
              <FaLock /> Thông tin thanh toán
            </h2>
            <div className="flex flex-col gap-4">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.value}
                  className="flex items-center gap-3 cursor-pointer text-lg"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.value}
                    checked={payment.method === m.value}
                    onChange={() => setPayment({ ...payment, method: m.value })}
                    className="accent-[#00809D]"
                  />
                  {m.icon} {m.label}
                </label>
              ))}
            </div>
          </section>
          {/* Giảm giá và sử dụng mã giảm giá */}
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#e0eafc] flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-2 text-[#00809D]">
              Ưu đãi & Khuyến mãi
            </h2>
            <div className="flex gap-2">
              <input
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 flex-1 focus:ring-2 focus:ring-[#00809D] transition"
                placeholder="Nhập mã giảm giá"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                type="button"
                className="bg-gradient-to-r from-[#00809D] to-[#00b4d8] text-white px-6 py-3 rounded-lg font-bold shadow hover:from-[#006b85] hover:to-[#0096c7] transition"
                onClick={applyCoupon}
              >
                Áp dụng
              </button>
            </div>
            {discount > 0 && (
              <div className="text-green-600 font-semibold">
                Đã áp dụng giảm giá: -{discount.toLocaleString()}đ
              </div>
            )}
          </section>
        </div>
        {/* Phải: Tổng quan đơn hàng và chi tiết giá */}
        <div className="md:col-span-1 flex flex-col gap-8">
          {/* Thông tin tổng quan đơn hàng */}
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#e0eafc]">
            <h2 className="text-2xl font-bold mb-6 text-[#00809D]">
              🛒 Đơn hàng của bạn
            </h2>
            <ul className="divide-y">
              {cart &&
                cart.length > 0 &&
                cart.map((item, idx) => (
                  <li key={idx} className="flex gap-4 py-4 items-center group">
                    <img
                      src={
                        item.Sach?.images
                          ? JSON.parse(item.Sach.images)[0].url
                          : ""
                      }
                      alt={item.Sach?.tenSach}
                      className="w-16 h-24 object-cover rounded-lg shadow-md border border-[#cfdef3]"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-[#00809D] text-lg">
                        {item.Sach?.tenSach || "Tên sách không tồn tại"}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          className="p-1 bg-gray-100 rounded-full border border-[#cfdef3] hover:bg-[#e0eafc] transition"
                          onClick={() => updateQuantity(idx, -1)}
                        >
                          <FaMinus />
                        </button>
                        <span className="px-3 font-bold text-lg">
                          {item.soLuong || 0}
                        </span>
                        <button
                          type="button"
                          className="p-1 bg-gray-100 rounded-full border border-[#cfdef3] hover:bg-[#e0eafc] transition"
                          onClick={() => updateQuantity(idx, 1)}
                        >
                          <FaPlus />
                        </button>
                        <button
                          type="button"
                          className="ml-4 text-red-500 hover:text-red-700 transition"
                          onClick={() => removeItem(idx)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#00809D]">
                        {/* {item.price.toLocaleString()}đ */}
                        {item.giaLucThem.toLocaleString()}đ
                      </div>
                      <div className="text-gray-500 text-sm">
                        {/* Tạm tính: {(item.price * item.quantity).toLocaleString()}đ */}
                        Tạm tính:{" "}


                        {(item.tongGia).toLocaleString()}đ
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
            <Link
              to="/"
              className="text-blue-600 hover:underline mt-6 inline-block font-semibold"
            >
              &larr; Tiếp tục mua sắm
            </Link>
          </section>
          {/* Chi tiết giá  */}
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#e0eafc]">
            <h2 className="text-2xl font-bold mb-6 text-[#00809D]">
              📊 Chi tiết thanh toán
            </h2>
            <div className="flex justify-between py-2 text-lg">
              <span>Tạm tính:</span>
              <span>{tongTien.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between py-2 text-lg">
              <span>Giảm giá:</span>
              <span className="text-green-600">
                -{discount.toLocaleString()}đ
              </span>
            </div>
            <div className="flex justify-between py-2 text-lg">
              <span>Phí vận chuyển:</span>
              <span>
                {shippingFee === 0
                  ? "Miễn phí"
                  : `+${shippingFee.toLocaleString()}đ`}
              </span>
            </div>
            <div className="flex justify-between py-2 text-lg">
              <span>Thuế (5% VAT):</span>
              <span>+{tax.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between py-4 font-bold text-2xl border-t mt-4">
              <span>Tổng cộng:</span>
              <span className="text-[#00809D]">{total.toLocaleString()}đ</span>
            </div>
          </section>
          {/* Final Confirmation */}
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-[#e0eafc] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="accent-[#00809D] w-5 h-5"
              />
              <span className="text-base">
                Tôi đồng ý với{" "}
                <a href="#" className="text-blue-600 underline">
                  Điều khoản & Chính sách đổi trả
                </a>
              </span>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#00809D] to-[#00b4d8] text-white text-xl font-bold py-4 rounded-full shadow hover:from-[#006b85] hover:to-[#0096c7] transition-all disabled:opacity-60"
              disabled={!agreed}
            >
              Đặt hàng
            </button>
            <div className="text-gray-600 text-base mt-2">
              Dự kiến giao hàng:{" "}
              <span className="font-semibold text-[#00809D]">
                {estimatedDate()}
              </span>
            </div>
          </section>
        </div>
      </form>
      <Footer />
    </div>
  );
}

// Icon for user info
function FaUserIcon() {
  return (
    <svg
      className="inline mr-2"
      width="1.3em"
      height="1.3em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#00809D"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
    </svg>
  );
}

export default ThanhToan;
