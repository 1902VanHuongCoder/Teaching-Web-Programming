import React, { useState } from "react";

// Demo/mock data for news
const initialNews = [
  {
    id: 1,
    title: "Ra mắt sách mới tháng 9!",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500",
    date: "2025-09-10",
    summary:
      "Chúng tôi vừa cập nhật nhiều đầu sách mới hấp dẫn cho tháng 9. Đừng bỏ lỡ!",
  },
  {
    id: 2,
    title: "Khuyến mãi mùa tựu trường",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500",
    date: "2025-09-01",
    summary:
      "Nhiều ưu đãi hấp dẫn cho học sinh, sinh viên khi mua sách tại cửa hàng.",
  },
];

function QuanLiTinTuc() {
  const [news, setNews] = useState(initialNews);
  const [form, setForm] = useState({
    title: "",
    image: "",
    date: "",
    summary: "",
  });

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add news
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setNews([...news, { ...form, id: Date.now() }]);
    setForm({ title: "", image: "", date: "", summary: "" });
  };

  // Delete news
  const handleDelete = (id) => {
    setNews(news.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#00809D]">
        Quản lý tin tức
      </h1>
      {/* News Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block font-semibold mb-1">Tiêu đề</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            required
          />
          <label className="block font-semibold mb-1">Hình ảnh (URL)</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Ngày đăng</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            required
          />
          <label className="block font-semibold mb-1">Tóm tắt</label>
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            rows={3}
            required
          />
          <button
            type="submit"
            className="bg-[#00809D] text-white px-6 py-2 rounded font-semibold mt-2"
          >
            Thêm mới
          </button>
        </div>
      </form>

      {/* News List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#00809D]">
          Danh sách tin tức
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Hình ảnh</th>
                <th className="py-2 px-3">Tiêu đề</th>
                <th className="py-2 px-3">Ngày đăng</th>
                <th className="py-2 px-3">Tóm tắt</th>
                <th className="py-2 px-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {news.map((n, idx) => (
                <tr key={n.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 font-bold">{idx + 1}</td>
                  <td className="py-2 px-3">
                    <img
                      src={n.image}
                      alt={n.title}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  </td>
                  <td className="py-2 px-3">{n.title}</td>
                  <td className="py-2 px-3">{n.date}</td>
                  <td className="py-2 px-3">{n.summary}</td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => handleDelete(n.id)}
                      className="text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuanLiTinTuc;
