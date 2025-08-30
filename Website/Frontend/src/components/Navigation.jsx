import logo from "../assets/Red Panda.png";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
function Navigation() {
  return (
    <nav className="px-6 py-4 flex justify-between items-center bg-[#00809D] text-white text-sm border-b-[1px] border-b-[rgba(255,255,255,.2)]">
      <div className="flex items-center space-x-12">
        <div>
          <img src={logo} alt="Logo" className="h-8" />
        </div>
        <ul className="flex space-x-4 justify-end items-center font-semibold">
          <li>
            <Link to="/">Trang Chủ</Link>
          </li>
          <li>
            <Link to="/gioithieu">Giới Thiệu</Link>
          </li>
          <li>
            <Link to="/lichsumuahang">Lịch Sử Mua Hàng</Link>
          </li>
          <li>
            <Link to="/lienhe">Liên Hệ</Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/giohang">
          <FaShoppingCart className="h-6 w-6" />
        </Link>
        <div className="space-x-0">
          <Link to="/dangnhap">
            <button className="bg-white text-black px-4 py-2 rounded-full font-semibold">
              Đăng nhập
            </button>
          </Link>
          <button className="hidden">Đăng xuất</button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
