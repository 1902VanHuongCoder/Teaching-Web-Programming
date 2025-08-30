import Navigation from "../Navigation";
import Banner from "../Banner";
import { products, topProducts } from "../../lib/data";
import { useState } from "react";
import Footer from "../Footer";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const CATEGORIES = [
  // Danh mục
  "Tất cả",
  "Truyện tranh",
  "ngôn tình",
  "phiêu lưu",
  "kinh dị",
];

const PRICE_RANGES = [
  // Vùng giá
  { label: "Tất cả", value: "all" },
  { label: "Dưới 50.000", value: "<50000" },
  { label: "50.000 - 100.000", value: "50000-100000" },
  { label: "Trên 100.000", value: ">100000" },
  { label: "Trên 200.000", value: ">200000" },
];

function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả"); // Danh mục được chọn
  const [selectedPrice, setSelectedPrice] = useState("all"); // Vùng giá được chọn

  const [chuDeTrangWeb, setChuDeTrangWeb] = useState("light");
  // Tạo 2 biến trạng thái khác để lưu trữ danh mục và vùng giá được chọn cho sản phẩm bán chạy

  // Lọc sản phẩm theo danh mục và giá
  const filteredProducts = products.filter((product) => {
    // Sử dụng ChatGPT để hiểu hơn về đoạn code này.
    let matchCategory =
      selectedCategory === "Tất cả" ||
      (product.category &&
        product.category.toLowerCase() === selectedCategory.toLowerCase());
    let matchPrice = true;
    if (selectedPrice === "<50000") {
      matchPrice = product.giaGiam < 50000;
    } else if (selectedPrice === "50000-100000") {
      matchPrice = product.giaGiam >= 50000 && product.giaGiam <= 100000;
    } else if (selectedPrice === ">100000") {
      matchPrice = product.giaGiam > 100000;
    }
    return matchCategory && matchPrice;
  });

  // const sanPhamBanChayDuocLoc =

  return (
    <div className="bg-[#00809D] min-h-screen h-fit">
      {/* Thanh điều hướng - Navigation */}
      <Navigation
        chuDeTrangWeb={chuDeTrangWeb}
        setChuDeTrangWeb={setChuDeTrangWeb}
      />

      {/* Banner - Banner */}
      <Banner />

      {/* Danh mục - Categories */}
      {/* <div className="px-10 py-10 bg-green-500 w-full ">
          <h3>Danh mục</h3>
          <ul className="flex space-x-4">
            <li>Truyện tranh</li>
            <li>Truyện phiêu lưu</li>
            <li>Truyện ngôn tình</li>
            <li>Sách sức khỏe</li>
          </ul>
        </div> */}

      {/* Sản phẩm mới */}
      <div className="mt-10 h-fit">
        <h3 className="py-6 px-4 text-xl text-white font-bold">Sản Phẩm Mới</h3>

        {/* Bộ lọc theo danh mục và giá */}
        <div className="flex justify-between items-center flex-wrap px-4 py-6 bg-[#00718a] rounded-lg mx-4 mb-6">
          <p className="text-white text-xl">Bộ Lọc Sản Phẩm Mới</p>
          <div className="flex gap-4">
            <div>
              <label className="text-white font-semibold mr-2">Danh mục:</label>
              <select
                className="py-2 bg-white rounded-full outline-none pl-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white font-semibold mr-2">Giá:</label>
              <select
                className=" bg-white rounded-full outline-none pl-2 py-2"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                {PRICE_RANGES.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-5 gap-4 px-4 gap-y-10">
          {filteredProducts.map((product) => (
            <li key={product.maSP} className="w-full h-fit rounded-md">
              <Link to="/chitietsanpham">
                <div className="w-full h-[350px] rounded-xl overflow-hidden">
                  <img
                    src={product.hinhAnh}
                    alt={product.tenSP}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              <div className="p-2 bg-transparent">
                <h4 className="font-semibold text-white uppercase py-2">
                  {product.tenSP}
                </h4>
                <p className=" text-[#00f821] font-bold">
                  {product.giaGiam.toLocaleString()} VNĐ
                </p>
                <p className="text-gray-300 line-through text-sm mt-2">
                  Giá gốc: {product.gia.toLocaleString()} VNĐ
                </p>
                <Link
                  to="/giohang"
                  className="flex justify-center items-center hover:scale-105 hover:cursor-pointer transition-all gap-x-2 mt-4 bg-white text-[#00809D] py-1 px-2 w-full rounded-full font-bold"
                >
                  <span>
                    <FaShoppingCart />
                  </span>
                  <span>Thêm Giỏ Hàng</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Sản phẩm bán chạy */}
      <div className="mt-10 h-fit">
        <h3 className="py-6 px-4 text-xl text-white font-bold">
          Sản Phẩm Bán Chạy
        </h3>

        {/* Bộ lọc theo danh mục và giá */}

        <ul className="grid grid-cols-4 gap-4 px-4">
          {topProducts.map((product) => (
            <li key={product.maSP} className="w-full h-fit rounded-md">
              <div className="w-full h-[350px] rounded-xl overflow-hidden">
                <img
                  src={product.hinhAnh}
                  alt={product.tenSP}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 bg-transparent">
                <h4 className="font-semibold text-white uppercase py-2">
                  {product.tenSP}
                </h4>
                <p className=" text-[#00f821] font-bold">
                  {product.giaGiam.toLocaleString()} VNĐ
                </p>
                <p className="text-gray-300 line-through text-sm mt-2">
                  Giá gốc: {product.gia.toLocaleString()} VNĐ
                </p>
                <button className="flex justify-center items-center hover:scale-105 hover:cursor-pointer transition-all gap-x-2 mt-4 bg-white text-[#00809D] py-1 px-2 w-full rounded-full font-bold">
                  <span>
                    <FaShoppingCart />
                  </span>
                  <span>Thêm Giỏ Hàng</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chân trang - Footer */}
      <Footer />
    </div>
  );
}

export default Homepage;
