import Navigation from "../Navigation";
import Banner from "../Banner";
import {products, topProducts} from "../../lib/data";
import { useState } from "react";

const CATEGORIES = [ // Danh mục 
  "Tất cả",
  "Truyện tranh",
  "ngôn tình",
  "phiêu lưu",
  "kinh dị",
];

const PRICE_RANGES = [ // Vùng giá 
  { label: "Tất cả", value: "all" },
  { label: "Dưới 50.000", value: "<50000" },
  { label: "50.000 - 100.000", value: "50000-100000" },
  { label: "Trên 100.000", value: ">100000" },
  { label: "Trên 200.000", value: ">200000" }
];


function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả"); // Danh mục được chọn
  const [selectedPrice, setSelectedPrice] = useState("all"); // Vùng giá được chọn

  // Tạo 2 biến trạng thái khác để lưu trữ danh mục và vùng giá được chọn cho sản phẩm bán chạy 


  // Lọc sản phẩm theo danh mục và giá
  const filteredProducts = products.filter((product) => { // Sử dụng ChatGPT để hiểu hơn về đoạn code này. 
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
      <Navigation />

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
        <div className="flex flex-wrap gap-4 px-4 py-6 bg-[#00718a] rounded-lg mt-6 mx-4">
          <div>
            <label className="text-white font-semibold mr-2">Danh mục:</label>
            <select
              className="rounded px-2 py-1"
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
              className="rounded px-2 py-1"
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

        <ul className="grid grid-cols-4 gap-4 px-4">
          {filteredProducts.map((product) => (
            <li key={product.maSP} className="w-full h-fit rounded-md">
              <div className="w-full h-[250px] rounded-xl overflow-hidden">
                <img
                  src={product.hinhAnh}
                  alt={product.tenSP}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 bg-transparent">
                <h4 className="font-semibold text-white">{product.tenSP}</h4>
                <p className=" text-white">
                  Giá giảm: {product.giaGiam.toLocaleString()} VNĐ
                </p>
                <p className="text-gray-400 line-through text-sm">
                  Giá gốc: {product.gia.toLocaleString()} VNĐ
                </p>
                <button className="mt-4 bg-white text-[#00809D] py-1 px-2 w-full rounded-full font-bold">
                  Thêm Giỏ Hàng
                </button>
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
              <div className="w-full h-[300px] rounded-xl overflow-hidden">
                <img
                  src={product.hinhAnh}
                  alt={product.tenSP}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 bg-transparent">
                <h4 className="font-semibold text-white">{product.tenSP}</h4>
                <p className=" text-white">
                  Giá giảm: {product.giaGiam.toLocaleString()} VNĐ
                </p>
                <p className="text-gray-400 line-through text-sm">
                  Giá gốc: {product.gia.toLocaleString()} VNĐ
                </p>
                <button className="mt-4 bg-white text-[#00809D] py-1 px-2 w-full rounded-full font-bold">
                  Thêm Giỏ Hàng
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chân trang - Footer */}
      {/* <div className="px-10 py-10 bg-gray-800 text-white text-center">
          <p>Bản quyền © 2023 Công ty TNHH ABC</p>
        </div> */}
    </div>
  );
}

export default Homepage;
