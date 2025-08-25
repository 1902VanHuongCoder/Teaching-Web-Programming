import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";


// Dữ liệu tin tức mẫu 
const newsList = [ // danh sách tin tức 
  {
    id: 1, // ID của tin tức
    image: // Hình ảnh của tin tức
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    title: "Khai trương cửa hàng mới tại Hà Nội", // Tiêu đề của tin tức
    subtitle: // Phụ đề của tin tức
      "BookStore chính thức khai trương chi nhánh mới với nhiều ưu đãi hấp dẫn.",
    views: 1200, // Số lượt xem của tin tức
    created: "2025-08-20", // Ngày đăng tin tức
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    title: "Top 10 sách bán chạy tháng 8",
    subtitle: "Cùng điểm qua những cuốn sách được yêu thích nhất tháng này.",
    views: 980,
    created: "2025-08-18",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    title: "Chương trình giảm giá mùa tựu trường",
    subtitle:
      "Nhiều đầu sách giảm giá lên đến 50% dành cho học sinh, sinh viên.",
    views: 750,
    created: "2025-08-10",
  },
];

function DanhSachTinTuc() { 
  return (
    <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] min-h-screen w-full">
      <Navigation />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-[#00809D] mb-8 text-center">
          Tin Tức & Sự Kiện
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="bg-white border border-[#e0eafc] rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden group hover:shadow-2xl hover:border-[#00809D] transition-all duration-200"
            >
              <div className="relative w-full md:w-56 aspect-[4/3] md:aspect-auto flex-shrink-0 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-[#00809D] text-white text-xs px-3 py-1 rounded-full shadow">
                  Tin mới
                </span>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#00809D] mb-2 group-hover:underline">
                    {news.title}
                  </h2>
                  <p className="text-gray-700 mb-4 text-base">
                    {news.subtitle} 
                  </p>
                </div>
                <div className="flex items-center gap-6 text-gray-500 text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <FaEye /> {news.views} lượt xem
                  </span>
                  <span>
                    Ngày đăng:{" "}
                    <span className="font-semibold text-gray-700">
                      {news.created}
                    </span>
                  </span>
                </div>
                <Link
                  to={`/tintuc/${news.id}`}
                  className="text-center inline-block bg-gradient-to-r from-[#00809D] to-[#00b4d8] text-white px-6 py-2 rounded-full font-bold hover:from-[#006b85] hover:to-[#0096c7] transition"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DanhSachTinTuc;
