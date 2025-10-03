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
import {
  capNhatSoLuongSanPham,
  layGioHangTheoNguoiDung,
  xoaSanPhamKhoiGioHang,
} from "../lib/gio-hang-apis";
import { useRef } from "react";
import { nhanMaKhuyenMaiTheoID } from "../lib/khuyenmai-apis";
import { layTatCaPhuongThucGiaoHang } from "../lib/phuong-thuc-giao-hang-apis";
import { nhanDanhSachXaPhuong } from "../lib/dia-chi-apis";

import tinhTP from "../lib/duLieuTinhTP";
import { tinhPhiVanChuyen } from "../lib/tinh-phi-van-chuyen";
import DieuKhoanVaQuyDinh from "./DieuKhoanVaQuyDinh";
import { taoDonHangMoi } from "../lib/don-hang-apis";
import PayPalButton from "./PaypalButton";

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

  // Biến trạng thái để lưu trữ danh sách phương thức giao hàng từ server
  const [shippingMethods, setShippingMethods] = useState([]);

  // Biến trạng thái để lưu trữ danh sách xã phường theo tỉnh/thành phố
  const [wards, setWards] = useState([]);

  // Biến trạng thái để lưu trữ phí vận chuyển
  const [phiVanChuyen, setPhiVanChuyen] = useState(0);

  // Biến để lưu trạng thái ẩn hiện của modal chính sách và quy định của shop
  const [hienThiChinhSach, setHienThiChinhSach] = useState(false);

  // Biến trạng thái để lưu trữ dữ liệu giỏ hàng
  const [cart, setCart] = useState([]);

  // Thông tin khách hàng
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });

  // Thông tin vận chuyển
  const [shipping, setShipping] = useState({
    tinhThanhPho: 92,
    xaPhuong: "",
    diaChiCuThe: "",
    phuongThucGiaoHang: "", // standard
  });

  // Lưu xem người dùng chọn phương nào để thanh toán
  const [payment, setPayment] = useState({
    method: PAYMENT_METHODS[0].value,
  });

  // Giảm giá
  const [coupon, setCoupon] = useState(""); // Lưu cái mã giảm giá mà người dùng nhập vào
  const [discount, setDiscount] = useState(0); // Lưu giá trị giảm giá tính theo

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

  // Biến trạng thái để lưu giá trị tổng tiền
  const [tongTien, setTongTien] = useState(0);

  const tax = Math.round(tongTien * 0.05); // 5% VAT

  // Tính phí phương thức giao hàng 
  const phiPhuongThucGiaoHang = shippingMethods.find(
    (m) => m.phuongThucGiaoHangID === parseInt(shipping.phuongThucGiaoHang)
  )?.phiGiaoHang || 0;

  console.log("Phí phương thức giao hàng tính được:", phiPhuongThucGiaoHang);

  const total = tongTien - discount + phiPhuongThucGiaoHang + tax + phiVanChuyen; // Tổng cộng

  // Tính toán ngày giao hàng dự kiến
  const estimatedDate = () => {
    // const now = new Date();
    // let days = 5;
    // if (shipping.method === "express") days = 2;
    // if (shipping.method === "pickup") return "Nhận ngay tại cửa hàng";
    // now.setDate(now.getDate() + days);
    // return now.toLocaleDateString();

    // Dựa trên thời gian giao hàng tương ứng với mỗi phương thức giao hàng để tính toán ngày giao hàng dự kiến
    const now = new Date();

    // Tìm phương thức giao hàng đã chọn
    const method = shippingMethods.find(
      (m) => m.phuongThucGiaoHangID === parseInt(shipping.phuongThucGiaoHang)
    );

    // Tính toán ngày giao hàng dự kiến
    if (!method) return "Chưa chọn phương thức giao hàng";

    now.setDate(now.getDate() + method.thoiGianGiaoHang);

    return now.toLocaleDateString(); // 10/02/2025
  };

  const datHang = async (e) => {



    if(e) { e.preventDefault(); }// Ngăn chặn hành vi mặc định của form (tải lại trang)

    // Kiểm tra người dùng chọn phương thức giao hàng chưa
    if (!shipping.phuongThucGiaoHang) {
      alert("Vui lòng chọn phương thức giao hàng!");
      return;
    }
    // Kiểm tra giỏ hàng có trống không
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    // Lấy dữ liệu người dùng từ localStorage để chuẩn bị dữ liệu đẩy lên sever
    const khachHang = JSON.parse(localStorage.getItem("user"));

    // Chuẩn bị dữ liệu để tạo đơn hàng gửi lên sever
    const duLieuDonHang = {
      nguoiDungID: khachHang.nguoiDungID,
      tenKhachHang: khachHang.tenNguoiDung,
      soDienThoaiKH: customer.phone,
      ngayDat: new Date(),
      tongTien: total,
      trangThai: "Chờ xác nhận",
      diaChiGiaoHang: `${shipping.diaChiCuThe}, ${
        wards.find((w) => w.code === parseInt(shipping.xaPhuong))?.name || ""
      }, ${tinhTP.find((t) => t.code == shipping.tinhThanhPho)?.name || ""}`,
      ghiChu: `Phương thức giao hàng: ${
        shippingMethods.find(
          (m) =>
            m.phuongThucGiaoHangID === parseInt(shipping.phuongThucGiaoHang)
        )?.tenPhuongThuc || ""
      }`,
      items: cart.map((item) => ({
        sachID: item.sachID,
        soLuong: item.soLuong,
        donGia: item.giaLucThem,
      })),
    };

    console.log(duLieuDonHang);

        alert("Tesst"); 

    // Gọi API để tạo đơn hàng (sử dụng hàm có sẵn bên lib/don-hang-apis.js)
    const response = await taoDonHangMoi(duLieuDonHang);
    if (response && response.success) {
      alert("Đặt hàng thành công!");
      router("/xacnhandonhang");
    } else {
      alert("Đặt hàng thất bại!");
    }
  };

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

  // Khởi tạo giá trị ban đầu cho thông tin người dùng
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Kiểm tra xem có dữ liệu user trong localStorage không
      const duLieuNguoiDung = JSON.parse(storedUser); // Chuyển dữ liệu người từ localStorage sang dạng Object để sử dụng
      setCustomer({
        name: duLieuNguoiDung.tenNguoiDung || "",
        email: duLieuNguoiDung.email || "",
        phone: duLieuNguoiDung.soDienThoai || "",
      });
    }
  }, []);

  const hamKiemTraMaGiamGia = async () => {
    const response = await nhanMaKhuyenMaiTheoID(coupon); // response = { success: true/false, khuyenMai: { ... } }
    console.log("Phản hồi từ server về mã giảm giá:", response);
    if (response && response.success) {
      // Kiểm tra mã khuyến mãi còn hạn không
      if (!response.khuyenMai.trangThai) {
        alert("Mã giảm giá đã hết hạn sử dụng!");
        return;
      }
      // Kiểm tra xem với giá trị đơn hiện tại có thể sử dụng được không
      if (total < response.khuyenMai.giaCoBan) {
        alert("Đơn hàng của bạn chưa đủ điều kiện để sử dụng mã giảm giá này!");
        return;
      }

      // Kiểm tra xem số lượng còn lại của mã khuyến mãi có đủ sử dụng không
      if (response.khuyenMai.soLuong <= 0) {
        alert("Mã giảm giá đã hết số lượng sử dụng!");
        return;
      }
      // Nếu tất cả điều kiện đều thỏa mãn, áp dụng mã giảm giá
      const phanTramGiamGia = response.khuyenMai.giaTriGiam || 0;
      const soTienDuocGiam = Math.round(tongTien * (phanTramGiamGia / 100));
      setDiscount(soTienDuocGiam);
      alert("Áp dụng mã giảm giá thành công!");
    } else {
      alert("Mã giảm giá không hợp lệ!");
    }
  };

  // Nạp danh sách phương thức giao hàng từ server
  useEffect(() => {
    const napPhuongThucGiaoHang = async () => {
      // Giả sử gọi API để lấy danh sách phương thức giao hàng
      const response = await layTatCaPhuongThucGiaoHang();
      if (response && response.success) {
        console.log("Danh sách phương thức giao hàng:", response.data);

        setShippingMethods(response.data);
      }
    };
    napPhuongThucGiaoHang();
  }, []);

  // Cập nhật lại danh sách xã phường khi thay đổi tỉnh/thành phố
  useEffect(() => {
    const duLieuXaPhuong = nhanDanhSachXaPhuong(shipping.tinhThanhPho);
    setWards(duLieuXaPhuong);
    console.log("Hàm tính toán lại xã phường đã chạy lại");
  }, [shipping.tinhThanhPho]);

  // Tính toán lại phí vận chuyển khi thay đổi tỉnh/thành phố
  useEffect(() => {
    const phiVanChuyen = tinhPhiVanChuyen(shipping.tinhThanhPho);

    console.log("Phí vận chuyển tính được:", phiVanChuyen);

    setPhiVanChuyen(phiVanChuyen);
  }, [shipping.tinhThanhPho]);

  return (
    <div className="relative   bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] min-h-screen w-full">
      <Navigation />
      <form
        className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8"
        onSubmit={datHang}
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
                disabled // vô hiệu hóa trường input này
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
              {/* <input
                required
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00809D] transition"
                placeholder="Tỉnh / Thành Phố"
                value={shipping.tinhThanhPho}
                onChange={(e) =>
                  setShipping({ ...shipping, tinhThanhPho: e.target.value })
                }
              /> */}

              <select
                required
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00809D] transition"
                value={shipping.tinhThanhPho}
                onChange={(e) =>
                  setShipping({ ...shipping, tinhThanhPho: e.target.value })
                }
              >
                {tinhTP.map((tp) => (
                  <option key={tp.code} value={tp.code}>
                    {tp.name}
                  </option>
                ))}
              </select>

              {/* <input
                required
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00809D] transition"
                placeholder="Quận / Huyện"
                value={shipping.quanHuyen}
                onChange={(e) =>
                  setShipping({ ...shipping, quanHuyen: e.target.value })
                }
              /> */}

              {/* <input
                required
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00809D] transition"
                placeholder="Xã / Phường"
                value={shipping.xaPhuong}
                onChange={(e) =>
                  setShipping({ ...shipping, xaPhuong: e.target.value })
                }
              /> */}

              <select
                required
                className="border-2 border-[#cfdef3] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00809D] transition"
                value={shipping.xaPhuong}
                onChange={(e) =>
                  setShipping({ ...shipping, xaPhuong: e.target.value })
                }
              >
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>

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
                {shippingMethods.length > 0 &&
                  shippingMethods.map((m) => (
                    <option
                      key={m.phuongThucGiaoHangID}
                      value={m.phuongThucGiaoHangID}
                    >
                      {m.tenPhuongThuc}
                      {m.phiGiaoHang === 0
                        ? " (Miễn phí)"
                        : ` (+${m.phiGiaoHang.toLocaleString()}đ)`}
                    </option>
                  ))}
              </select>
              {phiVanChuyen === 0 && (
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
                    onChange={() => setPayment({ method: m.value })}
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
                onClick={hamKiemTraMaGiamGia}
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
                        Tạm tính: {item.tongGia.toLocaleString()}đ
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
                - {discount.toLocaleString()}đ
              </span>
            </div>
            <div className="flex justify-between py-2 text-lg">
              <span>Phí vận chuyển:</span>
              <span>
                {phiVanChuyen === 0
                  ? "Miễn phí"
                  : `+${phiVanChuyen.toLocaleString()}đ`}
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
                {/* <a href="#" className="text-blue-600 underline">
                  Điều khoản & Chính sách đổi trả
                </a> */}
                <button
                  type="button"
                  onClick={() => setHienThiChinhSach(true)}
                  className="text-blue-600 underline"
                >
                  Điều khoản & Chính sách đổi trả
                </button>
              </span>
            </div>
            {payment.method === "paypal" ? (
              
              <PayPalButton
                termIsAccepted={agreed}
                // Hàm để gọi khi thanh toán thành công và cung cấp đối tượng event cho hàm đó 
                submitForm={datHang}
                amount={total}
              />
            ) : (
              <button
                type="submit"
                className="bg-gradient-to-r from-[#00809D] to-[#00b4d8] text-white text-xl font-bold py-4 rounded-full shadow hover:from-[#006b85] hover:to-[#0096c7] transition-all disabled:opacity-60"
                disabled={!agreed}
              >
                Đặt hàng
              </button>
            )}

            <div className="text-gray-600 text-base mt-2">
              Dự kiến giao hàng:{" "}
              <span className="font-semibold text-[#00809D]">
                {estimatedDate()}
              </span>
            </div>
          </section>
        </div>
      </form>

      {/* Modal chính sách và quy định của shop */}

      {hienThiChinhSach && (
        <DieuKhoanVaQuyDinh
          dongChinhSach={() => {
            setHienThiChinhSach(false);
          }}
        />
      )}
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
