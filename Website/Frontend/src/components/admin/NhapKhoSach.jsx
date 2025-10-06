import React, { useEffect, useState } from "react";
import { nhanTatCaCacQuyenSach } from "../../lib/sach-apis";
import { taoGiaoDichKho } from "../../lib/giao-dich-kho-apis";

function NhapKhoSach() {
  // books: danh sách sách, setBooks: hàm cập nhật danh sách sách
  // const [books, setBooks] = useState(initialBooks);
  
  // showDialog: hiển thị dialog nhập kho, setShowDialog: cập nhật trạng thái dialog
  const [showDialog, setShowDialog] = useState(false);
  // selectedBook: sách được chọn để nhập kho
  const [selectedBook, setSelectedBook] = useState(null);
  // importForm: lưu giá trị form nhập kho
  const [importForm, setImportForm] = useState({
    importPrice: "", // Giá nhập
    sellPrice: "", // Giá bán
    quantity: "", // Số lượng nhập


    notes: "", // Ghi chú (nếu có)
  });



  // Hàm mở dialog nhập kho, truyền vào sách được chọn
  const xuLyMoModal = (book) => {
    setSelectedBook(book); // Lưu sách được chọn
    setImportForm({
      importPrice: book.giaNhap, // Gán giá trị mặc định 
      sellPrice: book.giaBan, // Gán giá trị mặc định
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
  const handleImport = async (e) => {
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

    // Gọi API để lưu thông tin nhập kho vào backend (nếu có)
      //  loaiGiaoDich, ngayGiaoDich, tenSanPham, soLuong, nguoiThucHien, ghiChu;
      // Chuẩn bị dữ liệu để gửi lên backend
      const giaoDichNhapKho = {
        loaiGiaoDich: "Nhập kho",
        ngayGiaoDich: new Date(), // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
        tenSanPham: selectedBook.tenSach,
        soLuong: Number(importForm.quantity),
        nguoiThucHien: "Admin", // Tạm thời để "Admin", có thể thay bằng user hiện tại
        ghiChu: importForm.notes,
        sachID: selectedBook.sachID,
        giaNhap: Number(importForm.importPrice),
        giaBan: Number(importForm.sellPrice),
      };

      const phanHoiTuSever = await taoGiaoDichKho(giaoDichNhapKho);

      if(phanHoiTuSever && phanHoiTuSever.success){
        alert("Nhập kho thành công!");
      } else {
        alert("Nhập kho thất bại! " + (phanHoiTuSever.message || ""));
      }

  };


  // Tạo thêm 1 biến trạng thái để lưu dữ liệu danh mục sách
  const [books, setBooks] = useState([]);

   // useEffect để gọi API lấy tất cả các quyển sách từ database khi component được mount (kết nối, hiển thị) lần đầu tiên
   useEffect(() => {
     const napDuLieuSach = async () => {
       const booksData = await nhanTatCaCacQuyenSach();
 
       // Lặp qua mảng kết quản để chúng ta chuyển trường images từ chuỗi JSON thành mảng 
       booksData.forEach(book => {
         if(book.images) {
           book.images = JSON.parse(book.images); // Chuyển chuỗi JSON thành mảng  
         } else {
           book.images = []; // Nếu không có trường images thì gán mảng rỗng 
         }
       });
 
       console.log("Dữ liệu sách nhận từ API:", booksData);
 
       setBooks(booksData);
     };
     napDuLieuSach();
   }, []);
  // Giao diện trang nhập kho sách
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Tiêu đề trang */}
      <h1 className="text-2xl font-bold mb-6 text-[#00809D]">Nhập kho sách</h1>
      <div className="bg-white rounded-lg shadow p-6">
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
                <th className="py-2 px-3">Tác giả</th>
                <th className="py-2 px-3">Nhà xuất bản</th>
                <th className="py-2 px-3">Ngày xuất bản</th>
                <th className="py-2 px-3">Ngôn ngữ</th>
                <th className="py-2 px-3">Loại sách</th>
                <th className="py-2 px-3">Số trang</th>
                <th className="py-2 px-3">Định dạng</th>
                <th className="py-2 px-3">Số lượng</th>
                <th className="py-2 px-3">Giá nhập</th>
                <th className="py-2 px-3">Giá bán</th>
                <th className="py-2 px-3">Giá giảm</th>
                <th className="py-2 px-3">ISBN13</th>
                <th className="py-2 px-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {books &&
                books.length > 0 &&
                books.map((book, idx) => (
                  <tr key={book.sachID} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3 font-bold">{idx + 1}</td>
                    <td className="py-2 px-3">
                      <div className="flex gap-1 flex-wrap">
                        {book.images && book.images.length > 0 ? (
                          book.images.map((img, i) => (
                            <img
                              key={i}
                              src={img.url}
                              alt="book"
                              className="w-10 h-10 object-cover rounded border"
                            />
                          ))
                        ) : (
                          <span className="text-gray-400">Không có ảnh</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-3">{book.tenSach}</td>
                    <td className="py-2 px-3">{book.tacGia}</td>
                    <td className="py-2 px-3">{book.nhaXuatBan}</td>
                    <td className="py-2 px-3">{book.ngayXuatBan}</td>
                    <td className="py-2 px-3">{book.ngonNgu}</td>
                    <td className="py-2 px-3">{book.loaiSach}</td>
                    <td className="py-2 px-3">{book.soTrang}</td>
                    <td className="py-2 px-3">{book.dinhDang}</td>
                    <td className="py-2 px-3">{book.soLuongConLai}</td>
                    <td className="py-2 px-3">
                      {book.giaNhap.toLocaleString()} VNĐ
                    </td>
                    <td className="py-2 px-3">
                      {book.giaBan.toLocaleString()} VNĐ
                    </td>
                    <td className="py-2 px-3">
                      {book.giaGiam.toLocaleString()} VNĐ
                    </td>
                    <td className="py-2 px-3">{book.ISBN13}</td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => xuLyMoModal(book)} // Mở dialog/modal nhập kho khi nhấn nút 
                        className="bg-[#00809D] text-white px-4 py-1 rounded hover:bg-[#006f7f] transition"
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
              <div>
                <p className="text-gray-600">
                  Ghi chú (nếu có):
                </p>
                <textarea
                  onChange={handleImportChange}
                  name="notes"
                  className="w-full border rounded p-2"
                  rows="3"
                  placeholder="Nhập ghi chú..."
                ></textarea>
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
