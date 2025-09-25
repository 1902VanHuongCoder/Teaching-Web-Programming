import React, { useEffect, useState } from "react";

import Navigation from "./Navigation";
import Footer from "./Footer";

import { Link } from "react-router-dom";
import { uploadHinhAnh } from "../lib/hinh-anh-apis";
import { capNhatThongTinNguoiDung } from "../lib/nguoi-dung-apis";

function HoSoNguoiDung() {
  // State cho phép chỉnh sửa thông tin
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(null);
  
  // Tạo ra 1 biến trạng thái để lưu hình ảnh mã hóa để hiển thị trước cho người dùng xem 
  const [hinhAnhMaHoa, setHinhAnhMaHoa] = useState(null); 


  // Hàm kiểm tra một biến có phải là một file không 
  function isFile(variable) {
    return variable instanceof File;
  }

  // Hàm xử lý lưu thông tin
  const handleSave = async (e) => {
    e.preventDefault();
    setEdit(false);
    // 1. Nếu người dùng có thay đổi avatar thì mình phải upload lên Cloudinary
    let hinhAnhData = null; 
    
    if( isFile(user.avatar) ) {
      hinhAnhData = await uploadHinhAnh(user.avatar);
    }

    // 2. Lưu thông tin người dùng mới sửa vào trong cơ sở dữ liệu 
    const duLieuNguoiDungMoi = {
      tenNguoiDung: user.tenNguoiDung,
      email: user.email,
      soDienThoai: user.soDienThoai,
      diaChi: user.diaChi, 
      avatar: hinhAnhData ? JSON.stringify({public_id: hinhAnhData.public_id, url: hinhAnhData.url}) : JSON.stringify(user.avatar), // Nếu có hình ảnh mới thì lấy hình ảnh mới, không thì lấy hình ảnh cũ
    }

    const { status, message } = await capNhatThongTinNguoiDung(user.nguoiDungID, duLieuNguoiDungMoi);
    if(status){
        alert("Cập nhật thông tin thành công!");
    }else{
        alert("Cập nhật thông tin thất bại! " + message); 
    }

    // 3. Cập nhật lại thông tin trong localstorage để có dữ liệu mới nhất về người dùng (thực tế thì mình phải thay đổi giá trị biến trong context)
    const duLieuNguoiDungMoiDeLuuVaoLocalStorage = {
        ...user, // Lấy tất cả dữ liệu cũ 
        ...duLieuNguoiDungMoi, // Ghi đè các trường đã thay đổi
    } 
    localStorage.setItem("user", JSON.stringify(duLieuNguoiDungMoiDeLuuVaoLocalStorage)); 
  }

  // Nạp dữ liệu người dùng từ sever sử dung useEffect 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) { // Kiểm tra xem có dữ liệu user trong localStorage không 

      const duLieuNguoiDung = JSON.parse(storedUser);  // Chuyển dữ liệu người từ localStorage sang dạng Object để sử dụng 

      // Vì avatar vẫn đang là một chuỗi JSON nên mình phỉa chuyển nó thành dạng Object để sử dụng để hiển thị avatar của người dùng 
      const avatarDuocBienDoiThanhObject = duLieuNguoiDung.avatar ? JSON.parse(duLieuNguoiDung.avatar) : null; 

      setUser({ // Thay đổi biến trạng thái user để hiển thị dữ liệu người dùng ra form 
        ...duLieuNguoiDung, 
        avatar: avatarDuocBienDoiThanhObject, // Chuyển chuỗi JSON thành object
      });
    }
  }, []);


  return (
    <div className="bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] min-h-screen w-full">
      <Navigation />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-[#00809D] mb-8 text-center">
          Hồ Sơ Người Dùng
        </h1>
        <div className="bg-white rounded-xl shadow-xl p-8">
          {user && (
            <form onSubmit={handleSave} className="flex flex-col gap-6">
              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  <img
                    src={ hinhAnhMaHoa ? hinhAnhMaHoa : user.avatar?.url }
                    alt="avatar"
                    className="w-28 h-28 rounded-full object-cover border-4 border-[#00809D] shadow mb-2"
                  />
                  {edit && (
                    <label
                      className="absolute bottom-2 right-2 bg-[#00809D] text-white rounded-full p-1 cursor-pointer shadow hover:bg-[#006b85] transition"
                      title="Đổi ảnh đại diện"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setUser({ ...user, avatar: file }); // Cập nhật avatar trong user thành file mới
                            const reader = new FileReader();
                            reader.onload = (ev) =>
                              setHinhAnhMaHoa(ev.target.result); // Cập nhật hình ảnh mã hóa để hiển thị 
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 16v2h12v-2M12.5 7.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        <path d="M16.5 6.5l-2-2A2 2 0 0013 4H7a2 2 0 00-1.5.5l-2 2A2 2 0 003 8v7a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-.5-1.5z" />
                      </svg>
                    </label>
                  )}
                </div>
                <span className="font-semibold text-[#00809D] mt-2">
                  Ảnh đại diện
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Tên người dùng</label>
                <input
                  className="border rounded px-4 py-2"
                  value={user.tenNguoiDung}
                  disabled={!edit}
                  onChange={
                    (e) => setUser({ ...user, tenNguoiDung: e.target.value }) // spread operator
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Email</label>
                <input
                  className="border rounded px-4 py-2"
                  value={user.email}
                  disabled={true}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Số điện thoại</label>
                <input
                  className="border rounded px-4 py-2"
                  value={user.soDienThoai}
                  disabled={!edit}
                  onChange={(e) =>
                    setUser({ ...user, soDienThoai: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Địa chỉ</label>
                <input
                  className="border rounded px-4 py-2"
                  value={user.diaChi}
                  disabled={!edit}
                  onChange={(e) => setUser({ ...user, diaChi: e.target.value })}
                />
              </div>
              <div className="flex gap-4 mt-4">
                {edit ? (
                  <>
                    <button
                      type="submit"
                      className="bg-[#00809D] text-white px-6 py-2 rounded font-bold hover:bg-[#006b85] transition"
                    >
                      Lưu
                    </button>
                    <button
                      type="button"
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded font-bold hover:bg-gray-400 transition"
                      onClick={() => setEdit(false)}
                    >
                      Hủy
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="bg-[#00809D] text-white px-6 py-2 rounded font-bold hover:bg-[#006b85] transition"
                    onClick={() => setEdit(true)}
                  >
                    Chỉnh sửa
                  </button>
                )}
                <Link
                  to="/lichsumuahang"
                  className="ml-auto text-blue-600 underline font-semibold"
                >
                  Xem lịch sử mua hàng
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HoSoNguoiDung;

