import React, { useState } from "react";

// Dữ liệu mẫu cho sách (có thể thay bằng dữ liệu thật từ backend)
const initialBooks = [
  {
    id: 1,
    name: "Thần Đồng Đất Phương Nam",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500",
    importPrice: 80000,
    sellPrice: 120000,
    quantity: 50,
  },
  {
    id: 2,
    name: "Ngôn tình",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500",
    importPrice: 60000,
    sellPrice: 90000,
    quantity: 30,
  },
];

function NhapKhoSach() {
  // books: danh sách sách, setBooks: hàm cập nhật danh sách sách
  const [books, setBooks] = useState(initialBooks);
  // showDialog: hiển thị dialog nhập kho, setShowDialog: cập nhật trạng thái dialog
  const [showDialog, setShowDialog] = useState(false);
  // selectedBook: sách được chọn để nhập kho
  const [selectedBook, setSelectedBook] = useState(null);
  // importForm: lưu giá trị form nhập kho
  const [importForm, setImportForm] = useState({
    importPrice: "", // Giá nhập 
    sellPrice: "", // Giá bán 
    quantity: "", // Số lượng nhập 
  });

  // Hàm mở dialog nhập kho, truyền vào sách được chọn
  const handleOpenDialog = (book) => {
    setSelectedBook(book); // Lưu sách được chọn
    setImportForm({
      importPrice: book.importPrice,
      sellPrice: book.sellPrice,
      quantity: "",
    }); // Gán giá trị mặc định
    setShowDialog(true); // Hiện dialog
  };

  // Hàm đóng dialog nhập kho
  const handleCloseDialog = () => {
    setShowDialog(false); // Ẩn dialog
    setSelectedBook(null); // Xóa sách được chọn
    setImportForm({ importPrice: "", sellPrice: "", quantity: "" }); // Reset form
  };

  // Hàm xử lý thay đổi giá trị trong form nhập kho
  const handleImportChange = (e) => {
    const { name, value } = e.target;
    setImportForm({ ...importForm, [name]: value }); // Cập nhật giá trị form
  };

  // Hàm xử lý khi nhấn nút xác nhận nhập kho
  const handleImport = (e) => {
    e.preventDefault(); // Ngăn reload trang
    // Cập nhật lại danh sách sách với số lượng mới
    // Tạo danh sách sách mới với sách được cập nhật
    const updatedBooks = books.map((b) => {
      if (b.id === selectedBook.id) {
        // Nếu là sách được chọn, cập nhật giá và số lượng
        return {
          ...b,
          importPrice: Number(importForm.importPrice),
          sellPrice: Number(importForm.sellPrice),
          quantity: b.quantity + Number(importForm.quantity),
        };
      }
      // Nếu không phải sách được chọn, giữ nguyên
      return b;
    });

    // Cập nhật state books với danh sách mới
    setBooks(updatedBooks);
    handleCloseDialog(); // Đóng dialog
  };

  // Giao diện trang nhập kho sách
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Tiêu đề trang */}
      <h1 className="text-2xl font-bold mb-6 text-[#00809D]">Nhập kho sách</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Tiêu đề bảng */}
        <h2 className="text-xl font-semibold mb-4 text-[#00809D]">
          Danh sách sách
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Hình ảnh</th>
                <th className="py-2 px-3">Tên sách</th>
                <th className="py-2 px-3">Giá nhập</th>
                <th className="py-2 px-3">Giá bán</th>
                <th className="py-2 px-3">Số lượng còn</th>
                <th className="py-2 px-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {/* Duyệt qua từng sách để hiển thị */}
              {books.map((book, idx) => (
                <tr key={book.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 font-bold">{idx + 1}</td>
                  <td className="py-2 px-3">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-14 h-14 object-cover rounded border"
                    />
                  </td>
                  <td className="py-2 px-3">{book.name}</td>
                  <td className="py-2 px-3">
                    {book.importPrice.toLocaleString()} VNĐ
                  </td>
                  <td className="py-2 px-3">
                    {book.sellPrice.toLocaleString()} VNĐ
                  </td>
                  <td className="py-2 px-3">{book.quantity}</td>
                  <td className="py-2 px-3">
                    {/* Nút mở dialog nhập kho */}
                    <button
                      onClick={() => handleOpenDialog(book)}
                      className="bg-[#00809D] text-white px-4 py-2 rounded font-semibold hover:bg-[#006b85] transition"
                    >
                      Nhập kho
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog nhập kho */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            {/* Nút đóng dialog */}
            <button
              onClick={handleCloseDialog}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
              title="Đóng"
            >
              ×
            </button>
            {/* Tiêu đề dialog */}
            <h3 className="text-xl font-bold mb-4 text-[#00809D]">
              Nhập kho: {selectedBook.name}
            </h3>
            {/* Form nhập kho */}
            <form onSubmit={handleImport} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Giá nhập</label>
                <input
                  type="number"
                  name="importPrice"
                  value={importForm.importPrice}
                  onChange={handleImportChange}
                  className="w-full border rounded p-2"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Giá bán</label>
                <input
                  type="number"
                  name="sellPrice"
                  value={importForm.sellPrice}
                  onChange={handleImportChange}
                  className="w-full border rounded p-2"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Số lượng nhập
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={importForm.quantity}
                  onChange={handleImportChange}
                  className="w-full border rounded p-2"
                  min="1"
                  required
                />
              </div>
              {/* Nút xác nhận nhập kho */}
              <button
                type="submit"
                className="bg-[#00809D] text-white px-6 py-2 rounded font-semibold mt-2 w-full"
              >
                Xác nhận nhập kho
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default NhapKhoSach;
