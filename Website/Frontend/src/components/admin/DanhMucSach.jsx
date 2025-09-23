import React, { useEffect, useState } from "react";
import { capNhatDanhMucSach, nhanTatCaDanhMucSach, taoDanhMucSachMoi, xoaDanhMucSach } from "../../lib/danh-muc-sach-apis";

function DanhMucSach() {
  const [categories, setCategories] = useState([]);

  const [input, setInput] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Thêm danh mục
  const handleAdd = async (e) => {
    // event
    e.preventDefault(); // Ngăn hành động mặc định khi mình submit form đến sever (reload trang)
    alert("Thêm danh mục: " + input); 
    
    const danhMucDaDuocThem = categories.includes(input.trim()); // kiểm tra danh mục đã tồn tại chưa

    if (input.trim() && !danhMucDaDuocThem) {
      // trim() để loại bỏ khoảng trắng thừa
      // setCategories([...categories, input.trim()]);
      setCategories([...categories, {tenDanhMuc: input.trim()}]);
      setInput("");

      // Gọi API để thêm danh mục vào database
      await taoDanhMucSachMoi(input.trim()); 
    }
  };

  // Xóa danh mục
  const handleDelete = async (idx) => {
    setCategories(categories.filter((_, i) => i !== idx)); // Cập nhật UI ngay lập tức 
    // Gọi API để xóa danh mục khỏi database

    await xoaDanhMucSach(categories[idx].danhMucSachID);

  };

  // Bắt đầu sửa
  const handleEdit = (idx) => {
    console.log("Sửa danh mục tại chỉ số: ", idx);
    console.log("Danh mục hiện tại có tên là: ", categories[idx]);

    setEditIndex(idx);
    setEditValue(categories[idx].tenDanhMuc); //  
  };

  // Lưu sửa
  const handleUpdate = async (e) => {
    e.preventDefault(); // Ngăn hành động mặc định khi mình submit form đến sever (reload trang)
    
    if (editValue.trim() && !categories.includes(editValue.trim())) {
      // trim() để loại bỏ khoảng trắng thừa và kiểm tra danh mục đã tồn tại chưa

      const danhMucDaDuocSua = []; 
      for (let i = 0; i < categories.length ; i++) {   
        // if (i === editIndex) {
        //   danhMucDaDuocSua.push(editValue.trim()); 
        // } else {
        //   danhMucDaDuocSua.push(categories[i]);
        // }
        if(i === editIndex){ // Nếu là danh mục đang sửa 
          danhMucDaDuocSua.push({...categories[i], tenDanhMuc: editValue.trim()});
        } else {
          danhMucDaDuocSua.push(categories[i]);
        }
      }
      setCategories(danhMucDaDuocSua);
      await capNhatDanhMucSach(categories[editIndex].danhMucSachID, {tenDanhMuc: editValue.trim()});
      setEditIndex(null);
      setEditValue("");
    }
  };

  // Hủy sửa
  const handleCancel = () => {
    setEditIndex(null);
    setEditValue("");
  };

  useEffect(() => {
    const napTatCaDanhMucSach = async () => {
        const data = await nhanTatCaDanhMucSach();
        
        console.log("Danh mục sách từ API:", data);

        if(data){ // Kiểm tra data khác null hoặc undefined 
            setCategories(data); 
        }
    } 
    napTatCaDanhMucSach();
  }, []); 

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#00809D]">
        Quản lý danh mục sách
      </h1>
      {/* Thêm danh mục */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tên danh mục mới"
          className="flex-1 border rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-[#00809D] text-white px-4 py-2 rounded font-semibold"
        >
          Thêm
        </button>
      </form>

      {/* Danh sách danh mục */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#00809D]">
          Danh sách danh mục
        </h2>
        <ul>
          {categories && categories.length > 0 && categories.map((cat, idx) => (
            <li
              key={idx} 
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              {editIndex === idx ? (
                <form onSubmit={handleUpdate} className="flex flex-1 gap-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 border rounded p-2"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-3 py-1 rounded font-semibold"
                  >
                    Lưu
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-3 py-1 rounded font-semibold"
                  >
                    Hủy
                  </button>
                </form>
              ) : (
                <>
                  <span className="flex-1">{cat.tenDanhMuc}</span>
                  <button
                    onClick={() => handleEdit(idx)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DanhMucSach;
