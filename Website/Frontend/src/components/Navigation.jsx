import logo from "../assets/Red Panda.png";
import { FaShoppingCart } from "react-icons/fa";

function Navigation() {
  return (
    <nav className="px-6 py-4 flex justify-between items-center bg-[#00809D] text-white text-sm border-b-[1px] border-b-[rgba(255,255,255,.2)]">
      <div className="flex items-center space-x-12">
        <div>
          <img src={logo} alt="Logo" className="h-8" />
        </div>
        <ul className="flex space-x-4 justify-end items-center font-semibold">
          <li>Trang Chủ</li>
          <li>Giới Thiệu</li>
          <li>Dịch Vụ</li>
          <li>Liên Hệ</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <FaShoppingCart className="h-6 w-6" />
        <div className="space-x-0">
          <button className="bg-white text-black px-4 py-2 rounded-full font-semibold">
            Đăng nhập
          </button>
          <button className="hidden">Đăng xuất</button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
