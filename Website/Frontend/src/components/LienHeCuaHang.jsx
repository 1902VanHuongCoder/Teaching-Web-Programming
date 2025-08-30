import React, { useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram } from "react-icons/fa";

function LienHeCuaHang() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) { // event 
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    // Gửi dữ liệu lên server ở đây nếu cần
  }

  return (
    <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] min-h-screen w-full">
      <Navigation />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <h1 className="text-3xl font-bold text-[#00809D] mb-6 text-center">Liên Hệ Với BookStore</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col gap-4 justify-center">
              <div className="flex items-center gap-3 text-lg text-gray-700">
                <FaMapMarkerAlt className="text-[#00809D]" />
                123 Đường ABC, Quận 1, TP.HCM
              </div>
              <div className="flex items-center gap-3 text-lg text-gray-700">
                <FaPhoneAlt className="text-[#00809D]" />
                <a href="tel:0123456789" className="underline">0123 456 789</a>
              </div>
              <div className="flex items-center gap-3 text-lg text-gray-700">
                <FaEnvelope className="text-[#00809D]" />
                <a href="mailto:support@bookstore.vn" className="underline">support@bookstore.vn</a>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <a href="#" className="text-[#00809D] text-2xl" title="Facebook"><FaFacebook /></a>
                <a href="#" className="text-[#00809D] text-2xl" title="Instagram"><FaInstagram /></a>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#00809D] mb-4">Gửi tin nhắn cho chúng tôi</h2>
              {sent ? (
                <div className="text-green-600 font-semibold text-center py-8">Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.</div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Họ và tên"
                    className="border rounded px-4 py-2"
                    value={form.name}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    className="border rounded px-4 py-2"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <textarea
                    name="message"
                    required
                    placeholder="Nội dung tin nhắn..."
                    className="border rounded px-4 py-2 min-h-[100px]"
                    value={form.message}
                    onChange={handleChange}
                  />
                  <button type="submit" className="bg-[#00809D] text-white px-6 py-2 rounded font-bold hover:bg-[#006b85] transition">Gửi liên hệ</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LienHeCuaHang;
