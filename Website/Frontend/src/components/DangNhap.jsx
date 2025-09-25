import { Link, useNavigate } from "react-router-dom";
import {useState} from "react"; 
import { dangNhapTaiKhoan } from "../lib/nguoi-dung-apis";
function DangNhap() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const router = useNavigate(); 

  const xuLyDangNhap = async (e) => {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của form (tải lại trang)

      // Gọi API để đăng nhập 
      const {status, message, user} = await dangNhapTaiKhoan(email, password);// 

      if( status ) { // Đăng nhập thành công
          alert("Đăng nhập thành công!");
          
          localStorage.setItem("user", JSON.stringify(user)); // Lưu thông tin user vào localStorage 

          router("/"); // Chuyển hướng về trang chủ 
      }else{
          alert("Đăng nhập thất bại! " + message);
      }
  }

  return (
    // Tạo form đăng nhập gồm trường để nhập email, mật khẩu, quên mật khẩu và nút đăng nhập
    <div className="flex justify-center items-center h-screen w-screen bg-[#00718a]">
      <form onSubmit={xuLyDangNhap} className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Đăng Nhập
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Nhập mật khẩu..."
          />
        </div>

        {/* Forgot password */}
        <div className="flex justify-end mb-4">
          <Link to="/quenmatkhau" className="text-sm text-blue-600 hover:underline">
            Quên mật khẩu?
          </Link>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Đăng nhập
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <Link to="/dangky" className="text-blue-600 hover:underline">
            Đăng ký
          </Link>
        </div>
      </form>
    </div>
  );
}

export default DangNhap;
