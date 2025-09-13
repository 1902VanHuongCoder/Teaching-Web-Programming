import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

// Demo/mock data for news
const initialNews = [
  {
    id: 1,
    title: "Ra mắt sách mới tháng 9!",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500",
    date: "2025-09-10",
    content:
      "Chúng tôi vừa cập nhật nhiều đầu sách mới hấp dẫn cho tháng 9. Đừng bỏ lỡ!",
  },
  {
    id: 2,
    title: "Khuyến mãi mùa tựu trường",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500",
    date: "2025-09-01",
    content:
      "Nhiều ưu đãi hấp dẫn cho học sinh, sinh viên khi mua sách tại cửa hàng.",
  },
];

function QuanLiTinTuc() {
  const [news, setNews] = useState(initialNews);
  const [form, setForm] = useState({
    title: "",
    image: "",
    date: "",
    content: "",
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      setForm({ ...form, content: editor.getHTML() });
    },
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
    setForm({ title: "", image: "", date: "", content: "" });
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
      <form onSubmit={handleSubmit} className="">
        <div className="flex gap-x-2">
          <div className="w-full">
            <label className="block font-semibold mb-1">Tiêu đề</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
              required
            />
          </div>
          <div className="w-full">
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
        </div>
        <div>
          <label className="block font-semibold mb-1">Nội dung</label>
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={
                  editor.isActive("bold") ? "font-bold text-blue-600" : ""
                }
              >
                B
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={
                  editor.isActive("italic") ? "italic text-blue-600" : ""
                }
              >
                I
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={
                  editor.isActive("underline") ? "underline text-blue-600" : ""
                }
              >
                U
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = window.prompt("Nhập URL:");
                  if (url) editor.chain().focus().setLink({ href: url }).run();
                }}
              >
                Link
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = window.prompt("Nhập URL hình ảnh:");
                  if (url) editor.chain().focus().setImage({ src: url }).run();
                }}
              >
                Ảnh
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "text-blue-600" : ""}
              >
                • Danh sách
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={
                  editor.isActive("orderedList") ? "text-blue-600" : ""
                }
              >
                1. Danh sách
              </button>
            </div>

            <EditorContent
              editor={editor}
              className="border rounded p-2 h-40 mb-3 overflow-y-auto"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#00809D] text-white px-6 py-2 rounded font-semibold mt-2"
        >
          Thêm mới
        </button>
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
                  <td className="py-2 px-3">{n.content}</td>
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
