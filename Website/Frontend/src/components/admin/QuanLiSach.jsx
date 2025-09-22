import React, { useEffect, useState } from "react";
import { capNhatSach, nhanTatCaCacQuyenSach, themSach, xoaSach } from "../../lib/sach-apis";
import { uploadHinhAnh, xoaHinhAnhCloudinary } from "../../lib/hinh-anh-apis";

const LOAI_SACH = [
  "Truyện tranh",
  "Ngôn tình",
  "Phiêu lưu",
  "Kinh dị",
  "Sách giáo khoa",
  "Sách kỹ năng",
];

const DINH_DANG = ["Bìa mềm", "Bìa cứng", "PDF", "Epub"]; // Định dạng sách
const NGON_NGU = ["Tiếng Việt", "Tiếng Anh"]; // Ngôn ngữ sách

function QuanLiSach() {
  const [books, setBooks] = useState([]); // Mảng chứa tất cả các quyển sách 
  const [form, setForm] = useState({ // Dữ liệu form để thêm hoặc cập nhật sách
    sachID: null,
    images: [], // Mảng chứa các URL hình ảnh, [{public_id, url}, ...], [file, file] 
    tenSach: "",
    tacGia: "",
    nhaXuatBan: "",
    ngayXuatBan: "",
    ngonNgu: "Tiếng Việt",
    loaiSach: "Truyện tranh",
    soTrang: 0,
    dinhDang: "Bìa mềm",
    soLuongConLai: 0,
    giaNhap: 0,
    giaBan: 0, 
    giaGiam: 0,
    ISBN13: "",
  });
  const [editId, setEditId] = useState(null);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, images: Array.from(files) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add or update book
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu form xem đã đáp ứng đầy đủ chưa 
    console.log("Dữ liệu form: ", form);

    if (editId) {
      setBooks(
        books.map((b) => (b.id === editId ? { ...form, id: editId } : b)) // Tìm và cập nhật quyển sách có id trùng với editId (id của quyển sách đang được chỉnh sửa
      );
      // Nếu form.images có chứa các file (nghĩa là người dùng đã chọn hình ảnh mới để cập nhật) thì chúng ta sẽ upload hình ảnh mới lên Cloudinary
      if(form.images.length > 0) {
        const publicIDvaUrl = []; // [{ public_id, url }, ... ]
        for(const img of form.images) { // Lặp qua từng hình (file) trong mảng images
          const result = await uploadHinhAnh(img);
          publicIDvaUrl.push(result);
        }
        form.images = publicIDvaUrl; // Cập nhật lại hình ảnh của sách
      }
      // Nếu form.images là mảng rỗng (nghĩa là người dùng không chọn hình ảnh mới để cập nhật) thì chúng ta sẽ giữ nguyên hình ảnh cũ
      if (form.images.length === 0) {
        const bookToEdit = books.find((b) => b.sachID === editId); // Tìm quyển sách đang được chỉnh sửa trong mảng books 
        form.images = bookToEdit.images; // Giữ nguyên hình ảnh cũ
      }

      await capNhatSach(editId, form); 
      alert("Cập nhật sách thành công!");

      setEditId(null);
    } else {
      setBooks([...books, { ...form, id: Date.now(), images: form.images }]);
      // Gọi API để upload hình ảnh lên server và lấy về URL của hình ảnh đó
      
      const publicIDvaUrl = []; // [{ public_id, url }, ... ] 
      if(form.images.length > 0) { 
        for(const img of form.images) { // Lặp qua từng hình (file) trong mảng images 
          const result = await uploadHinhAnh(img); // Gọi API upload hình ảnh để upload hình ảnh lên Cloudinary 
          console.log("Đang upload hình ảnh lên Cloud");
          publicIDvaUrl.push(result); // Lưu thông tin hình ảnh (public_id và url) vào mảng
        }
      }
      // Thay đổi giá trị images của form.images
      form.images = publicIDvaUrl; // Chuyển mảng thành chuỗi JSON để lưu vào database

      // Gọi API để thêm sách vào database
      await themSach(form);

      // Sau khi thêm sách thành công, chúng ta có thể làm gì đó, ví dụ như hiển thị thông báo
      alert("Thêm sách thành công!");
    }
    setForm({
      id: null,
      images: [],
      tenSach: "",
      tacGia: "",
      nhaXuatBan: "",
      ngayXuatBan: "",
      ngonNgu: "Tiếng Việt",
      loaiSach: "Truyện tranh",
      soTrang: 0,
      dinhDang: "Bìa mềm",
      soLuongConLai: 0,
      giaGoc: 0,
      giaGiam: 0,
      ISBN13: "",
    });
  };

  // Edit book
  const handleEdit = (book) => {
    // Đổi giá trị ngayXuatBan của quyển sách về định dạng YYYY-MM-DD để hiển thị đúng trên input type="date"
    const ngayXuatBan = new Date(book.ngayXuatBan);

    console.log("Ngày xuất bản:", ngayXuatBan);

    const formattedDate = ngayXuatBan.toISOString().split("T")[0];

    setForm({ ...book, ngayXuatBan: formattedDate, images: [] });
    setEditId(book.sachID);
  };

  // Delete book
  const handleDelete = async (sachID) => {
    setBooks(books.filter((b) => b.sachID !== sachID)); // Lọc bỏ quyển sách có id trùng với id được truyền vào hàm

    // Xóa hình ảnh của quyển sách khỏi Cloudinary
    const bookToDelete = books.find((b) => b.sachID === sachID);

    console.log("Quyển sách cần xóa:", bookToDelete); 

    if (bookToDelete) { // Nếu tìm thấy quyển sách cần xóa 
      bookToDelete.images.forEach(async (img) => {
        console.log("Đang xóa hình ảnh khỏi Cloudinary:", img); 
        await xoaHinhAnhCloudinary(img.public_id);
      });
    }
    // Xóa dữ liệu quyển sách khỏi database 
    await xoaSach(sachID); // Gọi API xóa quyển sách khỏi database
    alert("Xóa sách thành công!");
  };

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

  // Kiểm tra 1 biến có phải là 1 file hay không 
  const isFile = (obj) => {
    return obj instanceof File;
  }

  return (
    <div className="w-full mx-auto ">
      <h1 className="text-2xl font-bold mb-6 text-[#00809D]">Quản lý sách</h1>
      {/* Form để chúng ta thêm sách */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block font-semibold mb-1">Hình ảnh</label>
          <div
            className="mb-3 border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer hover:border-[#00809D] bg-gray-50"
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            
            onDrop={(e) => {
              e.preventDefault(); // Ngăn trình duyệt thực hiện hành động mặc định (ví dụ: mở ảnh trong tab mới khi thả file vào trình duyệt)
              e.stopPropagation(); // Ngăn sự kiện nổi bọt lên các phần tử cha

              // Lấy tất cả file được thả vào, lọc chỉ lấy file có kiểu là ảnh (image/*)
              const files = Array.from(e.dataTransfer.files).filter((f) =>
                f.type.startsWith("image/")
              );

              // Nếu có ít nhất 1 file ảnh được thả vào
              if (files.length > 0) {
                setForm({ ...form, images: files }); // Cập nhật state form, trường images sẽ chứa các file ảnh vừa thả vào
              }
            }}
            onClick={() => document.getElementById("fileInputImages").click()}
          >
            <input
              id="fileInputImages"
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            <span className="text-gray-500">
              Kéo và thả ảnh vào đây hoặc{" "}
              <span className="text-[#00809D] underline">chọn ảnh</span>
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {form.images &&
              Array.from(form.images).map((img, idx) => (
                <div>
                  <img
                  key={idx}
                  src={ isFile(img) ? URL.createObjectURL(img) : img.url }
                  alt="preview"
                  className="w-16 h-16 object-cover rounded border"
                />
                </div>
              ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Tên sách</label>
          <input
            type="text"
            name="tenSach"
            value={form.tenSach}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            required
          />
          <label className="block font-semibold mb-1">Tác giả</label>
          <input
            type="text"
            name="tacGia"
            value={form.tacGia}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            required
          />
          <label className="block font-semibold mb-1">Nhà xuất bản</label>
          <input
            type="text"
            name="nhaXuatBan"
            value={form.nhaXuatBan}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            required
          />
          <label className="block font-semibold mb-1">Ngày xuất bản</label>
          <input
            type="date"
            name="ngayXuatBan"
            value={form.ngayXuatBan}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            required
          />
          <label className="block font-semibold mb-1">Ngôn ngữ</label>
          <select
            name="ngonNgu"
            value={form.ngonNgu}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
          >
            {NGON_NGU.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <label className="block font-semibold mb-1">Loại sách</label>
          <select
            name="loaiSach"
            value={form.loaiSach}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
          >
            {LOAI_SACH.map((loai) => (
              <option key={loai} value={loai}>
                {loai}
              </option>
            ))}
          </select>
          <label className="block font-semibold mb-1">Số trang</label>
          <input
            type="number"
            name="soTrang"
            value={form.soTrang}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            min="1"
          />
          <label className="block font-semibold mb-1">Định dạng</label>
          <select
            name="dinhDang"
            value={form.dinhDang}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
          >
            {DINH_DANG.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <label className="block font-semibold mb-1">Số lượng</label>
          <input
            type="number"
            name="soLuongConLai"
            value={form.soLuongConLai}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            min="0"
          />
          <label className="block font-semibold mb-1">Giá nhập</label>
          <input
            type="number"
            name="giaNhap"
            value={form.giaNhap}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            min="0"
          />

          <label className="block font-semibold mb-1">Giá bán</label>
          <input
            type="number"
            name="giaBan"
            value={form.giaBan}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            min="0"
            required
          />


          <label className="block font-semibold mb-1">Giá giảm</label>
          <input
            type="number"
            name="giaGiam"
            value={form.giaGiam}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            min="0"
          />
          <label className="block font-semibold mb-1">ISBN13</label>
          <input
            type="text"
            name="ISBN13"
            value={form.ISBN13}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-3"
            required
          />
          <button
            type="submit"
            className="bg-[#00809D] text-white px-6 py-2 rounded font-semibold mt-2"
          >
            {editId ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>
      {/* Danh sách tất cả các quyển sách mà chúng ta đã thêm */}
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
              {books && books.length > 0 && books.map((book, idx) => (
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
                      onClick={() => handleEdit(book)} // Hàm sửa sản phẩm
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(book.sachID)} // Hàm xóa sản phẩm
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

export default QuanLiSach;
