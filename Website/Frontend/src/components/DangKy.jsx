import { useState } from "react";
import { Link } from "react-router-dom";

function DangKy() {
    const [tenNguoiDung, setTenNguoiDung] = useState("");
    const [email, setEmail] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [xacNhanMatKhau, setXacNhanMatKhau] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");

    const xuLyDangKy = () => {
      console.log("Đăng ký với tên người dùng:", tenNguoiDung);
      // Để xử lý sau
    }

  return (
    // Tạo form đăng ký tài khoản người dùng gồm các trường như: tên người dùng(username), email, mật khẩu (password), xác nhận mật khẩu (confirm password), số điện thoại (phoneNumber)
    <div className="flex justify-center items-center h-screen w-screen bg-[#00718a]">
      <form className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Đăng Ký
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Tên người dùng
          </label>
          <input
            type="text"
            name="username"
            value={tenNguoiDung}
            onChange={(e) => setTenNguoiDung(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Nhập tên người dùng..."
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Nhập email..."
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Nhập mật khẩu..."
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={xacNhanMatKhau}
            onChange={(e) => setXacNhanMatKhau(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Nhập lại mật khẩu..."
          />
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Số điện thoại
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={soDienThoai}
            onChange={(e) => setSoDienThoai(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Nhập số điện thoại..."
          />
        </div>

        {/* Submit button */}
        <button
          type="button"
          onClick={xuLyDangKy}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Đăng ký
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Đã có tài khoản? </span>
          <Link to="/dangnhap" className="text-blue-600 hover:underline">
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
}

export default DangKy;
