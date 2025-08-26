import React from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { FaEye, FaArrowLeft } from "react-icons/fa";

// Dữ liệu tin tức mẫu
const newsList = [ // Mảng gồm nhiều tin tức 
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    title: "Khai trương cửa hàng mới tại Hà Nội",
    subtitle:
      "BookStore chính thức khai trương chi nhánh mới với nhiều ưu đãi hấp dẫn.",
    views: 1200,
    created: "2025-08-20",
    content: `Ngày 20/8/2025, BookStore chính thức khai trương chi nhánh mới tại Hà Nội với không gian hiện đại, hàng ngàn đầu sách mới và nhiều chương trình ưu đãi hấp dẫn dành cho khách hàng. Đến với sự kiện, bạn sẽ được tham gia các hoạt động giao lưu, nhận quà tặng và mua sách với giá ưu đãi đặc biệt. Hãy đến và trải nghiệm không gian đọc sách tuyệt vời cùng BookStore!`,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    title: "Top 10 sách bán chạy tháng 8",
    subtitle: "Cùng điểm qua những cuốn sách được yêu thích nhất tháng này.",
    views: 980,
    created: "2025-08-18",
    content: `Dưới đây là danh sách 10 cuốn sách bán chạy nhất tháng 8 tại BookStore. Những tựa sách này không chỉ hấp dẫn về nội dung mà còn mang lại nhiều giá trị cho độc giả. Hãy cùng khám phá và lựa chọn cho mình cuốn sách phù hợp nhé!`,
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
    content: `Nhân dịp mùa tựu trường, BookStore triển khai chương trình giảm giá đặc biệt lên đến 50% cho nhiều đầu sách giáo khoa, tham khảo và truyện tranh. Chương trình áp dụng từ ngày 10/8 đến hết 31/8/2025. Đừng bỏ lỡ cơ hội sở hữu những cuốn sách yêu thích với giá siêu ưu đãi!`,
  },
];

function ChiTietTinTuc() {
  const { id } = useParams();
  const news = newsList.find((n) => n.id === Number(id)) || newsList[0];


  // Trong thực tế chúng ta sẽ nạp từ backend dữ liệu tin tức 

  return (
    <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] min-h-screen w-full">
      <Navigation />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <Link
          to="/tintuc"
          className="flex items-center gap-2 text-blue-600 hover:underline mb-6 font-semibold"
        >
          <FaArrowLeft /> Quay lại danh sách tin tức
        </Link>
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex flex-col gap-6 mb-6 items-start">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-[300px] object-cover rounded-xl shadow"
            />
            <div className="flex-1 flex flex-col justify-between">
              <h1 className="text-3xl font-bold text-[#00809D] mb-2">
                {news.title}
              </h1>
              <p className="text-gray-700 mb-2 text-lg">{news.subtitle}</p>
              <div className="flex items-center gap-6 text-gray-500 text-sm">
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
            </div>
          </div>
          <div className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
            {news.content}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChiTietTinTuc;
