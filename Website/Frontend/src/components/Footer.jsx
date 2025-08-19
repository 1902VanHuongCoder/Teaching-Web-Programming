import logo from "../assets/Red Panda.png";
const CATEGORIES = [
  // Danh mục
  "Tất cả",
  "Truyện tranh",
  "Ngôn tình",
  "Phiêu lưu",
  "Kinh dị",
];

function Footer() {
  return (
    <footer className="flex w-full justify-between bg-[#ff5722] px-6 py-8 mt-10">
      {/* Thông tin cửa hàng  */}
      <div className="basis-1/2 flex">
        <div className="w-[150px] flex justify-center items-center">
          <img src={logo} alt="Logo" />
        </div>
        <div className="space-y-4 text-[#0f0b0b]">
          <p className="font-bold text-4xl text-white">BANSACH STORE</p>
          <p>Địa chỉ: 123 Đường ABC, Quận 1, TP. HCM</p>
          <p>Điện thoại: 0123 456 789</p>
          <p>Email: info@mywebsite.com</p>
          <p>Giờ làm việc: Thứ 2 - Thứ 6: 8h00 - 17h00</p>
        </div>
      </div>
      {/* Danh sách danh mục sản phẩm*/}
      <div className="basis-1/2 text-[#0f0b0b] space-y-4">
        <h4 className="font-bold text-white">Danh Mục Sản Phẩm</h4>
        <ul className="space-y-3">
          {CATEGORIES.map((category) => (
            <li className="hover:cursor-pointer hover:underline" key={category}>
              {category}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
