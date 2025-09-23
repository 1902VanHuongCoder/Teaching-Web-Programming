import React, { useEffect, useState } from "react";
import { capNhatKhuyenMai, nhanTatCaKhuyenMai, taoKhuyenMai, xoaKhuyenMai } from "../../lib/khuyenmai-apis";

function QuanLiKhuyenMai() {
  const [promos, setPromos] = useState([]); // Biến trạng thái để lưu danh sách mã khuyến mãi

  const [form, setForm] = useState({
    khuyenMaiID: "",
    moTa: "",
    giaTriGiam: 0,
    ngayHetHan: "",
    giaCoBan: 0,
    trangThai: true,
    soLuong: 0,
  });

  const [editId, setEditId] = useState(null);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add or update promo
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) { // Kiểm tra nếu đang ở chế độ chỉnh sửa
      // CẬP NHẬT

      // Cập nhật dữ liệu mới trong giao diện trước
      const danhSachMaKhuyenMaiDaCapNhat = promos.map((p) => {
        if (p.khuyenMaiID === editId) {
          return { ...form };
        } else {
          return p;
        }
      });
      setPromos(danhSachMaKhuyenMaiDaCapNhat);
      setEditId(null);


      // Gọi API để cập nhật trong 
      await capNhatKhuyenMai(editId, { ...form });  
    } else {
      // THÊM MỚI
      setPromos([...promos, { ...form }]); // Giúp hiển thị ngay mã khuyến mãi mới thêm vào giao diện
      await taoKhuyenMai({ ...form });
    }

    // Reset giá trị cho form
    setForm({
      id: null,
      khuyenMaiID: "",
      moTa: "",
      giaTriGiam: 0,
      type: "%",
      ngayHetHan: "",
    });
  };

  // Hàm để bắt đầu việc chỉnh sửa thông tin cho 1 mã khuyến mãi (promo)
  const handleEdit = (promo) => {
    const ngayHetHan = new Date(promo.ngayHetHan); // Thu Sep 25 2025 07:00:00 GMT+0700 (Indochina Time)

    console.log("Ngày hết hạn:", ngayHetHan);

    const formattedDate = ngayHetHan.toISOString().split("T")[0]; // Định dạng lại ngày thành "YYYY-MM-DD"
    setForm({ ...promo, ngayHetHan: formattedDate });

    setEditId(promo.khuyenMaiID);
  };

  // Delete promo
  const handleDelete = async (id) => {
    setPromos(promos.filter((p) => p.khuyenMaiID !== id)); // Cập nhật giao diện

    await xoaKhuyenMai(id);
  };

  useEffect(() => {
    const napTatCaMaKhuyenMai = async () => {
      const data = await nhanTatCaKhuyenMai();
      setPromos(data);
    };
    napTatCaMaKhuyenMai();
  }, []);

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
            name="khuyenMaiID"
            value={form.khuyenMaiID}
            onChange={handleChange}
            className={`w-full border rounded p-2 mb-3 ${editId ? "bg-gray-500" : ""}`}
            required
            disabled={editId !== null} // Không cho phép sửa mã khi đang ở chế độ chỉnh sửa
          />
          <label className="block font-semibold mb-1">Mô tả</label>
          <input
            type="text"
            name="moTa"
            value={form.moTa}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Giá trị giảm</label>
          <input
            type="number"
            name="giaTriGiam"
            value={form.giaTriGiam}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            min="0"
          />
          <label className="block font-semibold mb-1">Ngày hết hạn</label>
          <input
            type="date"
            name="ngayHetHan"
            value={form.ngayHetHan}
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
              name="giaCoBan"
              value={form.giaCoBan}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
              min="0"
            />
          </div>
          <div>
            {/* Hai trường input, một cho số lượng, 1 cho trạng thái  */}
            <div>
              <label className="block font-semibold mb-1">Số lượng</label>
              <input
                type="number"
                name="soLuong"
                value={form.soLuong}
                onChange={handleChange}
                className="w-full border rounded p-2 mb-3"
                min="0"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Trạng thái</label>
              {/* Sử dụng thẻ input */}
              <input
                type="checkbox"
                name="trangThai"
                checked={form.trangThai}
                onChange={(e) =>
                  setForm({ ...form, trangThai: e.target.checked })
                }
                className="mr-2"
              />
              {form.trangThai ? "Hoạt động" : "Không hoạt động"}
            </div>
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
                <th className="py-2 px-3">Giá cơ bản</th>
                <th className="py-2 px-3">Số lượng</th>
                <th className="py-2 px-3">Trạng thái</th>
                <th className="py-2 px-3">Hết hạn</th>
                <th className="py-2 px-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {promos &&
                promos.length > 0 &&
                promos.map((promo, idx) => (
                  <tr key={promo.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3 font-bold">{idx + 1}</td>
                    <td className="py-2 px-3">{promo.khuyenMaiID}</td>
                    <td className="py-2 px-3">{promo.moTa}</td>
                    <td className="py-2 px-3">
                      {promo.giaTriGiam}
                      {promo.type === "%"
                        ? "%"
                        : promo.type === "VNĐ"
                        ? " VNĐ"
                        : ""}
                    </td>
                    <td className="py-2 px-3">{promo.giaCoBan}</td>
                    <td className="py-2 px-3">{promo.soLuong}</td>
                    <td className="py-2 px-3">
                      {promo.trangThai ? "Hoạt động" : "Không hoạt động"}
                    </td>
                    <td className="py-2 px-3">{promo.ngayHetHan}</td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => handleEdit(promo)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(promo.khuyenMaiID)}
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
