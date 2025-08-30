import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

function GioiThieuCuaHang() {
  return (
    <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] min-h-screen w-full">
      <Navigation />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
            alt="BookStore"
            className="w-40 h-40 object-cover rounded-full shadow mb-6 border-4 border-[#00809D]"
          />
          <h1 className="text-3xl font-bold text-[#00809D] mb-4 text-center">Giới Thiệu Về BookStore</h1>
          <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
            <span className="font-semibold">BookStore</span> là hệ thống nhà sách hiện đại, thân thiện với sứ mệnh lan tỏa tri thức và niềm đam mê đọc sách đến cộng đồng. Chúng tôi cung cấp hàng ngàn đầu sách đa dạng thể loại: văn học, kỹ năng, thiếu nhi, ngoại ngữ, truyện tranh, sách giáo khoa... đáp ứng mọi nhu cầu của bạn đọc ở mọi lứa tuổi.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
            <div className="bg-[#e0eafc] rounded-xl p-6 flex flex-col items-center">
              <h2 className="text-xl font-bold text-[#00809D] mb-2">Tầm Nhìn</h2>
              <p className="text-gray-700 text-center">Trở thành điểm đến hàng đầu cho những người yêu sách, xây dựng cộng đồng đọc sách lớn mạnh và sáng tạo tại Việt Nam.</p>
            </div>
            <div className="bg-[#e0eafc] rounded-xl p-6 flex flex-col items-center">
              <h2 className="text-xl font-bold text-[#00809D] mb-2">Sứ Mệnh</h2>
              <p className="text-gray-700 text-center">Mang đến trải nghiệm mua sách tiện lợi, chất lượng, giá tốt và dịch vụ tận tâm cho mọi khách hàng.</p>
            </div>
          </div>
          <ul className="text-gray-700 text-base mb-8 list-disc pl-6 max-w-2xl">
            <li>Hệ thống cửa hàng rộng khắp các thành phố lớn.</li>
            <li>Giao hàng nhanh toàn quốc, nhiều ưu đãi hấp dẫn.</li>
            <li>Đội ngũ nhân viên thân thiện, tư vấn tận tình.</li>
            <li>Không gian đọc sách hiện đại, nhiều sự kiện giao lưu tác giả, workshop bổ ích.</li>
          </ul>
          <div className="bg-[#00809D] text-white rounded-xl px-8 py-6 text-center shadow-lg max-w-2xl">
            <h3 className="text-xl font-bold mb-2">Liên hệ với chúng tôi</h3>
            <p>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
            <p>Hotline: <a href="tel:0123456789" className="underline">0123 456 789</a></p>
            <p>Email: <a href="mailto:support@bookstore.vn" className="underline">support@bookstore.vn</a></p>
            <p className="mt-2">Theo dõi chúng tôi trên <a href="#" className="underline">Facebook</a> | <a href="#" className="underline">Instagram</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GioiThieuCuaHang;
