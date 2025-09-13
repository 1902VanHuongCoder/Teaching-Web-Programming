import React, { useState } from "react";

// Demo/mock data for promo codes
const initialPromos = [
  {
    id: 1,
    code: "SALE20",
    description: "Giảm 20% cho đơn hàng trên 200k",
    discount: 20,
    type: "%",
    expiry: "2025-12-31",
  },
  {
    id: 2,
    code: "FREESHIP",
    description: "Miễn phí vận chuyển cho đơn từ 100k",
    discount: 0,
    type: "Freeship",
    expiry: "2025-10-01",
  },
];

const DISCOUNT_TYPES = ["%", "VNĐ", "Freeship"];

function QuanLiKhuyenMai() {
  const [promos, setPromos] = useState(initialPromos);
  const [form, setForm] = useState({
    id: null,
    code: "",
    description: "",
    discount: 0,
    expiry: "",
    giaCoBanDeGiam: 0,
  });
  const [editId, setEditId] = useState(null);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); 
  };


  // Add or update promo
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (editId) { 
        const danhSachMaKhuyenMaiDaCapNhat = promos.map((p) => {
            if(p.id === editId) {
                return { ...form, id: editId };
            }else{
                return p;
            }
        });
        setPromos(danhSachMaKhuyenMaiDaCapNhat); 
        setEditId(null);
    } else {
      setPromos([...promos, { ...form, id: Date.now() }]); 
    }
    setForm({
      id: null,
      code: "",
      description: "",
      discount: 0,
      type: "%",
      expiry: "",
    });
  };

  // Edit promo
  const handleEdit = (promo) => {
    setForm({ ...promo });
    setEditId(promo.id);
  };

  // Delete promo
  const handleDelete = (id) => {
    setPromos(promos.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#00809D]">
        Quản lý mã khuyến mãi
      </h1>
      {/* Biểu mẫu khuyến mãi */}
      <form
        onSubmit={handleSubmit} 
        className="bg-white rounded-lg shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block font-semibold mb-1">Mã khuyến mãi</label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            required
          />
          <label className="block font-semibold mb-1">Mô tả</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Giá trị giảm</label>
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            min="0"
          />
          <label className="block font-semibold mb-1">Ngày hết hạn</label>
          <input
            type="date"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            required
          />
          <div>
            <label className="block font-semibold mb-1">
              Giá cơ bản để giảm
            </label>
            <input
              type="number"
              name="giaCoBanDeGiam"
              value={form.giaCoBanDeGiam}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
              min="0"
            />
          </div>
          <button
            type="submit"
            className="bg-[#00809D] text-white px-6 py-2 rounded font-semibold mt-2"
          >
            {editId ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>

      {/* Promo List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#00809D]">
          Danh sách mã khuyến mãi
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Mã</th>
                <th className="py-2 px-3">Mô tả</th>
                <th className="py-2 px-3">Giá trị</th>
                <th className="py-2 px-3">Loại</th>
                <th className="py-2 px-3">Hết hạn</th>
                <th className="py-2 px-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo, idx) => (
                <tr key={promo.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 font-bold">{idx + 1}</td>
                  <td className="py-2 px-3">{promo.code}</td>
                  <td className="py-2 px-3">{promo.description}</td>
                  <td className="py-2 px-3">
                    {promo.discount}
                    {promo.type === "%"
                      ? "%"
                      : promo.type === "VNĐ"
                      ? " VNĐ"
                      : ""}
                  </td>
                  <td className="py-2 px-3">{promo.type}</td>
                  <td className="py-2 px-3">{promo.expiry}</td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => handleEdit(promo)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(promo.id)}
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

export default QuanLiKhuyenMai;
